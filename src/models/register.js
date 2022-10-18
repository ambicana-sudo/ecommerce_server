const mongoose = require('mongoose')

const RegisterSchema = new mongoose.Schema({
    name: {type: String, required:  true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    
}, {
    collection: 'register'
})

const Register = mongoose.model('RegisterModel', RegisterSchema)
module.exports = Register