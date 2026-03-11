const User = require('../models/User');


// Register/Create User
exports.registerUser = async (req, res) => {
    try {
      const { firstName, lastName, username, email, password, role } = req.body;
      const user = new User({ 
          firstName: firstName, 
          lastName: lastName, 
          username: username.toLowerCase(), 
          email: email.toLowerCase(), 
          password: password, 
          role: role
      });
  
      // check if email already exists
      const existingUser = User.findOne({email: email}).lean();
      if (existingUser) {
          return res
          .status(400)
          .json({ success: false, message: 'Email already registered' });
      }
  
      // check if username already exists
      const duplicateUsername = User.findOne({username: username}).lean();
      if (duplicateUsername) {
          return res
          .status(400)
          .json({ success: false, message: `Username ${username} already exists`})
      }
  
      await user.save();
  
      res.status(201).json({ 
          success: true,
          message: 'User registered successfully' 
      });
    } catch (error) {
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};
  

// Get user profile