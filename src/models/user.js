const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {type: String, required:  true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    token: {type: String},
    wishList: {type: Array},
    cart: {type: Array}
}, {
    collection: 'users'
})

const User = mongoose.model('UserModel', UserSchema)
module.exports = User