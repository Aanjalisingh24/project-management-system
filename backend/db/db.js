const mongoose = require('mongoose');

const dbconnect = async(req , res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("db connected");
    }
    catch(err){
        console.log({message:err.message})
    }
}

module.exports=dbconnect;