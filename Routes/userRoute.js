
const express = require('express');

const router = express.Router();

const Users = require('../Models/userModel');

const Blogs = require('../Models/blogModel');

const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt");


router.post('/register', async(req,res)=>{
try {

    const {email, password} = req.body;

    const userCheck = await Users.findOne({email});

    if(userCheck){
        return res.status(400).send('User Already Exist !')
    }

    const newPass = await bcrypt.hash(password, 10);

    const newUser  = await Users.create({...req.body, password : newPass});

    return res.status(200).send({msg : "New User Registered !" , newUser : newUser})

} catch (error) {
    return res.status(500).send(error)
}
})


router.post('/login', async(req,res)=>{
    try {
        const  {email, password} = req.body;

        const userCheck = await Users.findOne({email});

        if( !userCheck){
            return res.status(400).send('User Not Found ! Register First...')
        }

        const verify = await bcrypt.compare(password, userCheck.password);

        if( !verify){
            return res.status(400).send('Wrong Password...')
        }
        
        const token = jwt.sign({userID : userCheck._id, email : userCheck.email}, '123');

        return res.status(200).send({msg : "Login Successful !", token : token})
        
    } catch (error) {
        return res.status(500).send(error)
    }
})















module.exports = router;