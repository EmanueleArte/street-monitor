import mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    username: String,
    favorite_spots: [{
        label: String,
        coordinates: [Number, Number]
    }],
    notifications: [
        // notification schema
    ]
});

const userModel = mongoose.model('User', userSchema)

module.exports = {userModel}
