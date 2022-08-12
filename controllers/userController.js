const asyncHandle = require('express-async-handler');
const User = require('../models/user');

//desc Register a new User
//Routes  POST api/user/register

const registerNewUser = asyncHandle(async(req, res) => {

    const newuser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })

    try {
        const user = await newuser.save()
        res.send('User registered Successfully!')
    } catch (error) {
        return res.status(400).json({error});
    }
});

//desc Login User
//Route POST api/user/login

const loginUser = asyncHandle(async(req, res) => {

    const{ email, password } = req.body

    try {
        const user = await User.findOne({ email: email, password: password })
        if(user){

            const temp = {
                name : user.name,
                email : user.email,
                isAdmin : user.isAdmin,
                _id : user._id

            }
            res.send(temp)
        }
        else {
            return res.status(400).json({message : 'Login Failde'});
        }
    } catch (error) {
        return res.status(400).json({ error });
    }
});

//DESC GET ALL USER 
//Route  GET: api/users/alluser

const getAllUser = asyncHandle (async(req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        return res.status(400).json({error})
    }
})

module.exports = {
    registerNewUser,
    loginUser,
    getAllUser
}

