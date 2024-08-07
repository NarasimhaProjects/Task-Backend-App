// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

        username : {
            type: String,
            required: [true, 'Name is Required'],
         },
        email : {
           type: String,
           required: [true, 'Email is Required'],
           unique: true,
         },
        password: {
            type: String,
            required: [true, 'Password is Required']
         },
     },
     { timestamps: true }
  )
  

// Hash password before saving
UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
