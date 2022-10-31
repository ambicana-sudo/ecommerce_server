const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name: {type: String, required:  true},
    price: {type: Number, required: true},
    brand: {type: String, required: true},
    quantity: {type: Number, required: true},
    category: {type: String, required: true},
    id: {type: String},
    created: {type: Date},
	isLiked: {type: Boolean, default: false},
    filePath: {type: String, required: true},
    // rating: {type: Number, default: 0},
    // stock: {
    //     type: Number, 
    //     require: [true, "Please Enter Product Stock"],
    //     maxLength: [4, "Stock cannot exceed 4 characters"],
    //     default: 1
    // },
    // numOfReviews: {
    //     type: Number, 
    //     default: 0
    // },
    // reviews: [{
    //     name: {type: String, require: true},
    //     rating: {type: Number, required: true},
    //     comment: {type: String, required: true}
    // }]
}, {
    collection: 'products'
})


const Products = mongoose.model('ProductModel', ProductSchema)
module.exports = Products
