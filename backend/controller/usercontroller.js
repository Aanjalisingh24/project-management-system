const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const signup = async(req , res)=>{
    try{
    const {name , email , password , role} = req.body;

    const IsUserExists = await User.findOne({email});
    if(IsUserExists){
        return res.status(400).json({message:"user already exists"})
    }

    const hashpassword = await  bcrypt.hash(password , 10);
    
    const user = new User({
        name,
        email,
        password:hashpassword,
        role
    });
    await user.save();
    return res.status(201).json({message: "User registered successfully" , user});
    }
    catch(err){
        return res.status(400).json({message: err.message})
    }
}

const login = async(req,res)=>{
    try{
        const {email , password} = req.body;
        const IsUserExists = await User.findOne({email});
        
        if(!IsUserExists){
            res.status(404).json({message: "user not found"});
        }

        const ismatch = await bcrypt.compare(password , IsUserExists.password);
        if(!ismatch){
            res.status(400).json({message:"password does not match"})
        }

       const token = jwt.sign(
      { userid: IsUserExists._id, role: IsUserExists.role , name: IsUserExists.name},
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

        res.json({
   message:"login successfully",
   token,
   user:{
      name: IsUserExists.name,
      email: IsUserExists.email,
      role: IsUserExists.role
   }
});
    }
    catch(err){
        console.log({message: err.message});
    }
}


const getUser = async (req, res) => {
  const user = await User.find({role: "user"});

  res.json({ user });
};

module.exports = {signup , login , getUser};