const mongoose = require('mongoose');

const User = new mongoose.Schema({
    userName: {
        type: String,
        trim: true,
        unique: true,
        required:true
    },

    email:{
        type: String,
        unique: true,
        required: true,
        trim: true
    },

    password:{
        type: String,
        trim: true,
        minlength:6,
        required: true
    }
})

module.exports = mongoose.model('User',User);