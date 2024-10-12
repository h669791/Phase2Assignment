// server.js
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const { ExpressPeerServer } = require('peer');
const uploadRoutes = require('./routes/uploadRoutes');
const userRoutes = require('./routes/userRoutes');
const User = require('./models/User'); // Import the User model
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const peerServer = ExpressPeerServer(server, { debug: true });

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ChatApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Serve PeerJS on /peerjs route for video calling
app.use('/peerjs', peerServer);

// Test endpoint to verify MongoDB data access
app.get('/api/test-users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send('Database connection error');
  }
});

// Routes for user and file handling
app.use('/api/users', userRoutes);   // User routes for login, registration, etc.
app.use('/api', uploadRoutes);       // Upload routes for handling file uploads

// Socket.IO setup for real-time messaging
io.on('connection', (socket) => {
  console.log('New client connected');

  // Listener for saving user data from the client
  socket.on('saveUser', async (user) => {
    try {
      const newUser = new User(user);
      await newUser.save();
      console.log('User saved:', newUser);
    } catch (error) {
      console.error('Error saving user:', error);
    }
  });

  // Join channel event
  socket.on('joinChannel', (channelName) => {
    socket.join(channelName);
    io.to(channelName).emit('userJoined', `${socket.id} joined ${channelName}`);
    console.log(`Client joined channel: ${channelName}`);
  });

  // Send message event
  socket.on('sendMessage', (messageData) => {
    io.to(messageData.channelName).emit('message', messageData);
    console.log(`Message sent to channel ${messageData.channelName}`);
  });

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
