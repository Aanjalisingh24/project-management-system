const express = require('express');
const router = express.Router();

const {createproject , getproject , getprojectbyid , updateproject, Deleteproject , getmyproject , getprojectbyclient} = require('../controller/projectcontroller')

const auth = require('../middleware/authmiddleware');
const isAdmin = require('../middleware/adminmiddleware');

router.post('/createproject' , auth , isAdmin, createproject);
router.get('/getproject' ,auth , isAdmin, getproject);
router.get('/getprojectbyid/:_id' ,auth , isAdmin, getprojectbyid);
router.get('/getprojectbyclient/:clientId' , auth , isAdmin , getprojectbyclient);
router.get('/myproject' , auth, getmyproject);
router.patch('/updateproject/:_id', auth , isAdmin, updateproject)
router.delete('/Deleteproject/:_id' ,auth , isAdmin, Deleteproject);




module.exports = router;