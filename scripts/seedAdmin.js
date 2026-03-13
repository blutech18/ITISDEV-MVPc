const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {

    try {

        const existingAdmin = await User.findOne({ role: "Admin" });

        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit();
        }

        const admin = new User({
            username: "admin",
            email: "admin@system.com",
            password: "admin123",
            role: "Admin"
        });

        await admin.save();

        console.log("Admin user created successfully.");
        process.exit();

    } catch (error) {

        console.error(error);
        process.exit(1);

    }

};

createAdmin();