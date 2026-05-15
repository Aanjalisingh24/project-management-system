const express  = require('express');
const router = express.Router();

const {addClient , getClient ,getClientbyId , deleteClient , updateClient , getrecentclient} = require('../controller/clientcontroller');
const auth = require('../middleware/authmiddleware');
const isAdmin = require('../middleware/adminmiddleware');

router.post('/addclient' , auth, isAdmin, addClient);
router.get('/getClient' , auth , isAdmin, getClient);
router.get('/getClientbyId/:id', auth , isAdmin, getClientbyId);
router.get('/getrecentclient' , auth, isAdmin, getrecentclient);
router.patch('/updateClient/:id' ,auth , isAdmin, updateClient);
router.delete('/deleteClient/:id' , auth , isAdmin, deleteClient);


module.exports = router;