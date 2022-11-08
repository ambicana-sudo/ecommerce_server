const express = require('express')
const bcrypt = require('bcrypt')
const saltRounds = 10
const User = require('../models/user')
const app = express.Router()
const jwt = require('jsonwebtoken')


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


module.exports = app