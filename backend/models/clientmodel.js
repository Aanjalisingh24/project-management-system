const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        unique:true,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    companyname:{
        type:String,
        required:true
    },
    address:{
        type:String
    },
    notes:{
        type:String
    }
});

const Client = mongoose.model("Client" , clientSchema);

module.exports = Client;

