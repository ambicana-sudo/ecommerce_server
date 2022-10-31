const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require ("dotenv")
const Products = require('./models/product')
const User = require('./models/user')
const bcrypt = require('bcrypt');
const { find } = require('./models/product')
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const multer  = require('multer')
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'uploads/')
	},
	filename: function (req, file, cb) {
		// console.log(file)
		cb(null, file.originalname)
	}
})
const upload = multer({ storage: storage }).single('avatar')
// const productRouter = require('../src/route/route')

app.use(cors())
require('./db/mongoose')()
app.use(bodyParser.json())
// app.use('/', productRouter)
dotenv.config()


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
	// const allProductsFromDb = await Products.find({})

 	console.log(allProductsFromDb)

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
		console.log(req.file)
		req.body.filePath = "ambika"
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

app.post('/register', async(req,res)=>{
	try{
		bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
			req.body['password'] = hash
			const user = User.create(req.body)
			res.json({
				"msg": "registered"
			})
		});

	}catch(err){
		res.send({
			errmsg: "Invalid"
		})
	}	
})

app.post('/login', async(req,res)=>{
	const logUser = await User.findOne({name: req.body.name})

	// console.log(req.body.name)
	// console.log(logUser)

	try{
		// if(!req.body.name || !req.body.password){
		// 	return res.status(400).json('Please fill the data')
		// }

		if(logUser){
			bcrypt.compare(req.body.password, logUser.password, function(err, result) {
				if (result) {
					const name= {name: req.body.name}
					const userToken = jwt.sign(name, process.env.TOKEN_SECRET);
						User.findOneAndUpdate(name,  {
                            $set: {
                                token: userToken
                            }
                        }).then((data)=>{
							console.log(data)
							res.json({accessToken: data.token})
						})
				
			
				}
			});

		}else{
			res.json('User not available')
		}
	}catch(err){
		res.send({
			errmsg: "something broke"
		})
	}
})

// app.post('/profile', upload, function (req, res, next) {
// 	// console.log(req.body)
// 	console.log(req.file)
	// console.log(req)
// 	// req.body.filePath = req.file.path


// })
  
app.listen(process.env.PORT, () => {
    console.log(`Server runnning on port ${process.env.PORT}`);
});

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