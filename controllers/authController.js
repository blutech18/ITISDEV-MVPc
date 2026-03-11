const User = require("../models/User");

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findOne({ username: username.toLowerCase() }).lean();

        // check if user is in the database
        if (!user) {
            return res.status(401).json({
                message: "Invalid User"
            });
        }

        // password match check
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        // store user details in session
        req.session.user = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            role: user.role
        };

        res.json({
            message: "Login successful",
            user: req.session.user
        });
    } catch (error) {
        res.status(500).json({
            message: "Login failed",
            error: error.message
        });
    }
};


// logout a user
exports.logoutUser = async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({
            message: "Logout failed"
            });
        }
    
        // res.clearCookie("connect.sid");
    
        res.json({
            message: "Logged out successfully"
        });
    });
};