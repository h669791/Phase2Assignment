// userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const userController = require('../controllers/userController');
const bcrypt = require('bcrypt');

// Route to handle creating a new user
router.post('/addUser', userController.createUser);

// Route to fetch a specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Login route
router.post('/login', async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      if (!user) return res.status(400).send('User not found');
  
      const validPassword = await bcrypt.compare(req.body.password, user.password);
      if (!validPassword) return res.status(400).send('Invalid password');
  
      res.send({ message: 'Logged in successfully' });
    } catch (error) {
      res.status(500).send('Server error');
    }
  });
  

module.exports = router;
