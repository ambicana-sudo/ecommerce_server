const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require ("dotenv")
const Products = require('./models/product')
// const Register = require('./models/user')
// const Login = require('./models/user')
const User = require('./models/user')
const bcrypt = require('bcrypt');
const { find } = require('./models/product')
const saltRounds = 10;
const jwt = require('jsonwebtoken');
// const productRouter = require('../src/route/route')

app.use(cors())
require('./db/mongoose')()
app.use(bodyParser.json())
// app.use('/', productRouter)
dotenv.config()

// Products route
app.get('/products', async(req,res)=>{
	
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
 })

app.post('/products', async(req,res)=>{
	try{
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
			return res.status(404).send()
		}else{
			res.send(productData)
		}
		// res.send("ok")
	}catch(error){
		res.send(error)
	}
})

// REGISTER ROUTE
app.get('/register', async(req,res)=>{
	const registerUser = await User.find({})
	res.json({registeredList: registerUser})
 })

app.post('/register', async(req,res)=>{
	try{
		bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
			// console.log(req.body)

			req.body['password'] = hash
			const user = User.create(req.body)
		});

	}catch(err){
		res.send({
			errmsg: "Invalid"
		})
	}	
})

// LOGIN ROUTE
app.get('/login', async(req,res)=>{
	const LoginUser = await User.find({})
	res.json({loggedList: LoginUser})
 })

app.post('/login', async(req,res)=>{
	const logUser = await User.findOne({name: req.body.name})

	// console.log(req.body.name)
	// console.log(logUser)

	try{
		if(!req.body.name || !req.body.password){
			return res.status(400).json('Please fill the data')
		}

		if(logUser){
			const matchPassword =bcrypt.compare(req.body.password, logUser.password, function(err, result) {
				if (result) {
					const user = {name: req.body.name}
					const accessToken = jwt.sign(user, process.env.TOKEN_SECRET);
					// console.log(accessToken)
					res.json(accessToken)
					
				}
			});

			if(!matchPassword){
				res.json("Invalid Password")
			}else{
				res.json("User login successful")
			}
		}else{
			res.json('User not available')
		}
	}catch(err){
		res.send({
			errmsg: "something broke"
		})
	}
})

app.listen(process.env.PORT, () => {
    console.log(`Server runnning on port ${process.env.PORT}`);
});


// compare password
// find({req.body.name})
// bcrypt.compare(req.body.password, hash(databaswapass), function(err, result) {
// 	if (result) {
// 	   console.log(result)
//    }
// });

//Lotterydb
//======================

// const UserSchema = new mongoose.Schema({
//     name: {type: String, required:  true},
//     price: {type: Number, required: true},
//     brand: {type: String, required: true}
// }, {
//     collection: 'users'
// })
// const Users = mongoose.model('UserModel', UserSchema)

// app.post('/participants', async(req,res)=>{
//     // console.log("hello")
//     Users.create(req.body)
//     res.json({msg: "added"})
// })

// app.get('/participants', async(req,res)=>{
//    const allUsersFromDb = await Users.find({})
//    res.json({list: allUsersFromDb})
// })

// //mongoose indoneamdupdate
// app.put('/participants/', async(req,res)=>{
//     const allUsersFromDb = await Users.find({})
//     res.json({list: allUsersFromDb})
// })






// app.get('/users/:name/:lotteryno',(req,res)=>{
//     console.log(req.params.lotteryNo)
//     const participantArr = lotteryParticipants.filter((item,index)=>{
//         if(item.name === req.params.name){
//             return item
//         }
//        })
//    const winnerArr = lotteryParticipants.filter((item,index)=>{
//      if(item.name === req.params.name && item.isWinner=== true ){
//          return item
//      }
//     })
//     let winnerMsg = ''
//     if(participantArr.length>0 && winnerArr.length === 0){
//         winnerMsg = "Try next time"
//     }else if(winnerArr.length>0) {
//         winnerMsg = "COngrats you won"
//     } else{
//         winnerMsg = "You are not participant"
//     }
//     res.json({
//         name: req.params.name,
//         message: winnerMsg
//     })
// })