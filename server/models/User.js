// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true }, // Optional, unique if provided
  password: { type: String, required: true },
  profileImage: { type: String, default: '' }, // URL or file path for profile image
  roles: [{ type: String, enum: ['User', 'Admin', 'SuperAdmin'], default: 'User' }], // Defined roles
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }] // Reference to groups
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps

module.exports = mongoose.model('User', userSchema);
