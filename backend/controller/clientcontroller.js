const mongoose  = require("mongoose");
const Client  = require("../models/clientmodel")

const addClient = async (req, res) => {
    try {
        const { name, email, phone, companyname, address, notes } = req.body;

        const IsClientExists =  await Client.findOne({ email });
        if (IsClientExists) {
            return res.status(400).json({ message: "client already exists" })
        }

        const client = await Client(
            { name, email, phone, companyname, address, notes }
        )

        await client.save();

        return res.status(201).json({ message: "client added sucessfully" });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getClient = async (req, res) => {
    try {
        const Clientdetails = await Client.find();
        if (Clientdetails.length === 0) {
            return res.status(404).json({ message: "No details of client found" });
        }
        return res.json({ Clientdetails })
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getClientbyId = async (req, res) => {
    try {
        const ClientdetailsbyId = await Client.findById(req.params.id);
        if (!ClientdetailsbyId) {
            return res.status(404).json({ message: "client's details not found" });
        }

        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid client id"
            });
        }
        res.json({ ClientdetailsbyId })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteClient = async (req, res) => {
    try {
        const Clientdetails = await Client.findByIdAndDelete(req.params.id);
        if (!Clientdetails) {
            return res.status(404).json({ message: "client not found" });
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid client id"
            });
        }
        res.json({ message: "client deleted successfully" });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const updateClient = async (req, res) => {
    try {
        const Clientdetails = await Client.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!Clientdetails) {
            return res.status(404).json({ message: "client not found" });
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({
                message: "Invalid client id"
            });
        }
        return res.json({ message: "client updated suucessfully", Clientdetails });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

const getrecentclient = async(req,res)=>{
    try{
        const recentclient = await Client.find().sort({createAt:-1}).limit(5);
        return res.json({recentclient});
    }
    catch(err){
        res.json({ message: err.message});
    }
}

module.exports = { addClient, getClient, getClientbyId, deleteClient, updateClient , getrecentclient };

