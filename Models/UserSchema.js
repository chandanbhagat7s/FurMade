const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "user name to be provided"],
        trim: true,
        minLength: 1,
        maxLength: 1
    },
    email: {
        type: String,
        required: [true, "user email to be provided"],
        unique: true,

    },
    photo: String,
    password: {
        type: String,
        required: [true, "user password to be provided"],
    },

})

// now creating model out of it 
const user = mongoose.model('user', userSchema);

module.exports = user;



























