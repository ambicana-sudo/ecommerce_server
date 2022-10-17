// const express = require('express')
// const app = express.Router()

// app.get('/products', async(req,res)=>{
	
// 	const allProductsFromDb = await Products.find({})
 
// 	let page_size = req.query.size
// 	let pages = paginate(allProductsFromDb, page_size)
// 	 let pageLimit = Math.ceil(allProductsFromDb.length/page_size)
// 	 // console.log(req.query.size)
 
// 	 if(req.query.page){
// 		 // let page_size = req.query.size
// 		// let pages = paginate(allProductsFromDb, page_size)
 
// 		 pages[req.query.page]
 
// 		 res.json({productList: pages[req.query.page-1], maxPage:pageLimit})
 
// 	 }else{
// 		 res.json({productList: allProductsFromDb, maxPage:5})
// 	 } 
//  })


// // app.post('/products', async(req,res)=>{
// //     // console.log("hello")
// //      Products.create(req.body)
// //      res.json({msg: "added"})
// // })

// app.post('/products', async(req,res)=>{
// 	try{
// 		const product = await Products.create(req.body)
// 		if(product){	
// 			res.json({
// 				msg: "added"
// 			})
// 		}
// 	}catch(err){
// 		res.send({
// 			errmsg: "Invalid"
// 		})
// 	}
//     // console.log("hello")
// })

// function paginate (arr, size) {
//     return arr.reduce((acc, val, i) => {
//         let idx = Math.floor(i / size)
//         let page = acc[idx] || (acc[idx] = [])
//         page.push(val)

//         return acc
//     }, [])
// }

// app.put('/products/:id', async(req,res)=>{
// 	try{
// 		console.log(req.params.id)
// 		// const isLiked = false;
// 		// console.log(req.body.isLiked)
// 		const productId = req.params.id
// 		const productData = await Products.findByIdAndUpdate(productId, { $set: { isLiked: req.body.isLiked }})

// 		// check if data is available
// 		if(!productData){	
// 			return res.status(404).send()
// 		}else{
// 			res.send(productData)
// 		}


// 		// res.send("ok")
// 		// console.log(req.params.id) 
// 	}catch(error){
// 		res.send(error)
// 	}
// })

// // app.patch('/products/:id', async(req,res)=>{
// // 	try{
// // 		 const productId = req.params.id
// // 		 const updateData = await Products.findByIdAndUpdate(productId, req.body) //(productWithTheId, update)

// // 		 res.send(updateData)
// // 	}catch(error){
// // 		 return res.status(404).send()
// // 	}
// // })

// app.get('/register', async(req,res)=>{
// 	const registerUser = await Register.find({})
// 	res.json({userList: registerUser})
//  })

// app.post('/register', async(req,res)=>{
// 	try{
// 		// check to make sure the email provided not registered
// 		// Register.findOne({email: req.body.email}).then((email)=>{
// 		// 	if(email){
// 		// 		// throw a 404 error if the email Id is already exists
// 		// 		return res.status(400).json({email: "Email already exists, try new one"})
// 		// 	}
// 		// })
// 		const user = await Register.create(req.body)
// 		if(user){	
// 			res.json({
// 				msg: "added user"
// 			})
// 		}
// 		}catch(err){
// 			res.send({
// 				errmsg: "Invalid"
// 			})
// 		}
//     // console.log("hello")
// })
// module.exports = app