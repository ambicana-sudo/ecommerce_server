const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    
}, {
    collection: 'login'
})

const Login = mongoose.model('LoginModel', LoginSchema)
module.exports = Login