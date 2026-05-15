const express = require("express");
const router = express.Router();

const {addtask ,gettask , gettaskbyid , updatetask, Delete ,getmytask , updatestatus , updateProjectStatus}= require('../controller/taskcontroller');

const auth = require('../middleware/authmiddleware');
const isAdmin = require('../middleware/adminmiddleware');

router.post('/addtask' , auth , isAdmin, addtask);
router.get('/gettask' , auth , isAdmin, gettask);
router.get('/gettaskbyid/:_id' , auth , isAdmin, gettaskbyid);
router.get('/mytask' , auth , getmytask);
router.patch('/updatetask/:_id' ,auth , isAdmin, updatetask);
router.patch('/updatestatus/:id' , auth, updatestatus);
router.patch('/updateProjectStatus/:id' , auth , updateProjectStatus)
router.delete('/Delete/:_id' , auth , isAdmin, Delete);


module.exports = router;