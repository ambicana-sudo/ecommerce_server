const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {type: String, required:  true},
    price: {type: Number, required: true},
    brand: {type: String, required: true},
    quantity: {type: Number, required: true},
    category: {type: String, required: true},
    id: {type: String},
    created: {type: String},
	isLiked: {type: Boolean,}
    
}, {
    collection: 'products'
})

const RegisterSchema = new mongoose.Schema({
    name: {type: String, required:  true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    
}, {
    collection: 'register'
})

const Products = mongoose.model('ProductModel', ProductSchema)
const Register = mongoose.model('RegissterModel', RegisterSchema)
module.exports = Products
