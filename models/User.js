const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
// Define the User Schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true // Trims whitespace
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email uniqueness
        trim: true,
        lowercase: true // Saves emails in lowercase
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum password length
    },
    genre: {
        type: String,
        required: true,
        trim: true // Trims whitespace
    }
});


// Hash password before saving (use regular function to access 'this')
userSchema.pre('save', async function (next) {
    // Check if the password is modified
    if (!this.isModified('password')) return next();
  
    // Hash the password
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });
  
  // Method to compare passwords
  userSchema.methods.comparePassword = async function (userPassword) {
    return await bcrypt.compare(userPassword, this.password);
  };
  
// Create the User model
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
