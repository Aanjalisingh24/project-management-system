const express = require('express');
const router = express.Router();

const {signup,login , getUser} = require('../controller/usercontroller');
const auth = require('../middleware/authmiddleware');

router.post('/signup' , signup);
router.post('/login' , login);
router.get("/getuser", getUser);

module.exports = router;