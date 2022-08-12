const express = require('express');
const { 
    registerNewUser, 
    loginUser,
    getAllUser
} = require('../controllers/userController');

const router = express.Router();


router.route('/register').post(registerNewUser);
router.route('/login').post(loginUser);
router.route('/alluser').get(getAllUser)

module.exports = router