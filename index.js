const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const port = 3001;


app.listen(3001, () => {
    console.log(`Server runnning on port ${port}`);
});

//  const uri = 'mongodb://localhost:27017/lotterydb'
const uri = 'mongodb://localhost:27017/ecommerce'

const ProductSchema = new mongoose.Schema({
    name: {type: String, required:  true},
    price: {type: Number, required: true},
    brand: {type: String, required: true},
    quantity: {type: Number, required: true},
    category: {type: String, required: true},
    id: {type: String},
    created: {type: String},
    
}, {
    collection: 'products'
})
const Products = mongoose.model('ProductModel', ProductSchema)


async function connect(){
    try{
        mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected to mongodb");
    }catch(error){
        console.error(error);
    }
}

connect()

app.post('/products', async(req,res)=>{
    try{
        const products = await Products.create(req.body)
        if(products){
            res.json({msg: "added"})
        }
    }catch(err){
        res.send({
            errMsg: "invalid details"
        })
    }

})

function paginate (arr, size) {
    return arr.reduce((acc, val, i) => {
        let idx = Math.floor(i / size)
        let page = acc[idx] || (acc[idx] = [])
        page.push(val)

        return acc
    }, [])
}

app.get('/products', async(req,res)=>{
   const allProductsFromDb = await Products.find({})

   let page_size = req.query.size
   let pages = paginate(allProductsFromDb, page_size)
	


	if(req.query.page){
		// let page_size = req.query.size
   	// let pages = paginate(allProductsFromDb, page_size)

		pages[req.query.page]
		res.json({productList: pages[req.query.page-1], maxPage:Math.ceil(allProductsFromDb.length/page_size)})

	}else{
		res.json({productList: allProductsFromDb, maxPage:5})
	}

   
})

  


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