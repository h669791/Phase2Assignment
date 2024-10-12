// addUser.js
const mongoose = require('mongoose');
const User = require('./models/User');

// Connect to MongoDB (use your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/yourDatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Connection error:', error));

const newUser = new User({
  username: 'johndoe',
  email: 'johndoe@example.com',
  password: 'securepassword', // Replace with hashed password in production
  profileImage: '/images/profile/johndoe.jpg',
  roles: ['user', 'admin'],
  groups: ['60c72b2f9fd1f34130a2b456'], // Example Group ID
});

newUser.save()
  .then((user) => {
    console.log('User saved:', user);
    mongoose.connection.close(); // Close connection after save
  })
  .catch((error) => {
    console.error('Error saving user:', error);
    mongoose.connection.close();
  });
