const jwt = require('jsonwebtoken');


const auth = async(req , res , next)=>{
    const header = req.header('Authorization');

    if(!header){
        return res.status(401).json({message: "token not found"})
    }

    const token = header.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded){
        return res.status(400).json({message:"token does not found"})
    }

    req.user = decoded;
    next();
}

module.exports = auth;