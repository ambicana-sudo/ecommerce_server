const express = require('express')
const Products = require('../models/product')
const app = express.Router()

// get Products route

app.get('/products', async(req,res)=>{
	try{
        const allProductsFromDb = await Products.find({})
 
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
    }catch(err){
        res.send({
			errmsg: "Unable To Get Products!"
		})
    }
	 
 })

// post product route
app.post('/products', async(req,res)=>{
	try{
		const product = await Products.create(req.body)
		if(product){	
			res.json({
				msg: "New Product has been added"
			})
		}
        
	}catch(err){
		res.send({
			errmsg: "Invalid"
		})
	}
    console.log(req.body)
})

function paginate (arr, size) {
    return arr.reduce((acc, val, i) => {
        let idx = Math.floor(i / size)
        let page = acc[idx] || (acc[idx] = [])
        page.push(val)

        return acc
    }, [])
}

// update product route
app.put('/products/:id', async(req,res)=>{
	try{
		// console.log(req.params.id)
		// console.log(req.body.isLiked)
		const productId = req.params.id
		const productData = await Products.findByIdAndUpdate(productId, { $set: { isLiked: req.body.isLiked }})

		// check if data is available
		if(!productData){	
			return res.status(500).json({
                success: false, 
                message: "product not found"
            })
		}else{
			res.send(productData)
		}
		// res.send("ok")
	}catch(err){
		res.send(err)
	}
})

module.exports = app