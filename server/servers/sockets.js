// sockets.js
module.exports = (io) => {
    io.on('connection', (socket) => {
      console.log('New client connected');
  
      socket.on('joinChannel', (channelName) => {
        socket.join(channelName);
        io.to(channelName).emit('userJoined', `${socket.id} joined ${channelName}`);
      });
  
      socket.on('sendMessage', (messageData) => {
        io.to(messageData.channelName).emit('message', messageData);
      });
  
      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  };
  