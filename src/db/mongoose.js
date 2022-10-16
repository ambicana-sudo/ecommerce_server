const mongoose = require('mongoose');
const appConfig = require('../../config/app-config.json');

const connectionString = appConfig.mongodb_url;
const connectDb = async()=> {
    try{
        mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("connected to mongodb");
    }catch(error){
        console.error(error);
    }
}


module.exports = connectDb