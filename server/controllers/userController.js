// controllers/userController.js
const User = require('../models/User');

// Controller function to create a new user
exports.createUser = async (req, res) => {
  try {
    // Instantiate new user with data from the request body
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, // Hash password in production
      profileImage: req.body.profileImage,
      roles: req.body.roles || ['user'],
      groups: req.body.groups || [],
    });

    // Save user to the database
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save user', details: error.message });
  }
};
