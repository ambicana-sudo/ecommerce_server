const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const dotenv = require ("dotenv")
require('./db/mongoose')()
const { find } = require('./models/product')
const productRouter = require('./route/product-route')
const userRouter = require('./route/user-route')
// const Products = require('./models/product')
// const User = require('./models/user')
// const bcrypt = require('bcrypt');

// const saltRounds = 10;
// const jwt = require('jsonwebtoken');

app.use(cors())
app.use(bodyParser.json())
dotenv.config()
app.use('/', userRouter)
app.use('/products', productRouter)

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