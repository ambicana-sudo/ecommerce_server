const express = require('express')
const Products = require('../models/product')
const app = express.Router()

// Products route
app.get('/products', async(req,res,next)=>{
	// console.log(req.query.search)

	var regexp = new RegExp("^"+ req.query.search);

	let allProductsFromDb;

	if(req.query.search){
		allProductsFromDb = await Products.find({ name: regexp });
		// allProductsFromDb = await Products.find({ name: "^" + req.query.search });
	}else{
		allProductsFromDb = await Products.find({})
	}

 	// console.log(allProductsFromDb)

	let page_size = req.query.size
	let pages = paginate(allProductsFromDb, page_size)
	let pageLimit = Math.ceil(allProductsFromDb.length/page_size)
	 // console.log(req.query.size)
 
	 if(req.query.page){
		 // let page_size = req.query.size
		// let pages = paginate(allProductsFromDb, page_size)
 
		 pages[req.query.page]
 
		 res.json({productList: pages[req.query.page-1], maxPage:pageLimit})
 
	 }else{
		 res.json({productList: allProductsFromDb, maxPage:5})
	 } 
 })

app.post('/products', upload, async(req,res)=>{
	try{
		// console.log(req.file,"OOO")
		req.body.filePath = req.file.filename
		const product = await Products.create(req.body)
		if(product){	
			res.json({
				msg: "added"
			})
		}
	}catch(err){
		res.send({
			errmsg: "Invalid"
		})
	}
    // console.log("hello")
})

function paginate (arr, size) {
    return arr.reduce((acc, val, i) => {
        let idx = Math.floor(i / size)
        let page = acc[idx] || (acc[idx] = [])
        page.push(val)

        return acc
    }, [])
}

app.put('/products/:id', async(req,res)=>{
	try{
		// console.log(req.params.id)
		// console.log(req.body.isLiked)
		const productId = req.params.id
		const productData = await Products.findByIdAndUpdate(productId, { $set: { isLiked: req.body.isLiked }})

		// check if data is available
		if(!productData){	
			return res.status(404).send({message: 'Product not Found'})
		}else{
			res.send(productData)
		}
		// res.send("ok")
	}catch(error){
		res.send(error)
	}
})

app.put('/savecart', async(req,res)=>{
	try{
		console.log(req.body)
	}catch(error){
		console.log(error)
	}
})

// get product detail page
app.get('/products/:_id', async(req, res)=>{
	try{
		// console.log(req.params._id)

		const productKey = req.params._id

		const product = await Products.findById({_id : productKey})
		
		if(product){
			res.send(product)
		}else{
			res.send('product not available')
		}
	
	}catch(error){
		console.log(error)
	}
})

module.exports = app