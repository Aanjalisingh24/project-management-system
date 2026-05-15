const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    projectName: {
        type:String,
        required:true
    },
    description:{
        type: String,
    },
    clientId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Client" , 
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    deadline:{
        type: Date
    }
} , {timestamps: true});

const project = mongoose.model("Project" , projectSchema);

module.exports = project;