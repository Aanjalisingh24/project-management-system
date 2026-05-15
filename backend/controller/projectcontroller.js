const Project  = require('../models/projectmodels');

async function  createproject (req,res){
    try{
        const{
        projectName,
        clientId,
        description,
        status,
        deadline
        } = req.body;

    const project = await Project({
        projectName,
        clientId,
        description,
        status,
        deadline
    })
    await project.save(); 

    return res.status(201).json({
        message: "Project created successfully" , project
    });

    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}

async function getproject(req,res){
    try{
        const project = await Project.find()
         .populate("clientId", "name")
        if(!project){
            return res.status(404).json({message:"project not found"})
        }

        res.status(200).json({project});
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
}


async function getprojectbyid(req,res){
    try{
        const project = await Project.findById(req.params._id);
        if(!project){
            return res.status(404).json({message: "project not found" })
        }
        return res.status(200).json(project);
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

async function updateproject(req,res){
    try{
        const project = await Project.findByIdAndUpdate(req.params._id , req.body,
            {new: true , runValidators: true}
        );
        if(!project){
            return res.status(404).json({message: "project not found"})
        }
        return res.status(200).json({message: "project updated sucessfully" , project})
    }
    catch(err){{
        res.status(500).json({message:err.message})
    }}
}

async function Deleteproject(req,res){
    try{
        const project = await Project.findByIdAndDelete(req.params._id);
        if(!project){
            return res.status(404).json({message: "project not found"})
        }
        return res.status(200).json({message: "project deleted sucessfully" , project})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }

}

async function getmyproject(req,res){
    try{
        const project = await Project.find({assignedTo: req.user.userid});
        if(!project){
            return res.status(404).json({message: "project not found"})
        }
        return res.status(200).json({project})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

async function getprojectbyclient(req,res){
    try{
        const project = await Project.find({
            clientId: req.params.clientId
        });
        if(!project){
            return res.status(404).json({message: "project not found"})
        }
        return res.status(200).json({project})
    }
    catch(err){
        res.status(500).json({message: err.message})
    }
}

module.exports = {createproject  , getproject , getprojectbyid , updateproject, Deleteproject , getmyproject , getprojectbyclient};