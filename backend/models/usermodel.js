const mongoose = require('mongoose');

const userSchema = new  mongoose.Schema({
    name:{
       type:String,
       required:true,
       minlength:3,
       trim:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:["admin" , "user"],
        default: "admin"
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;