
const express = require('express');

const router = express.Router();

const Users = require('../Models/userModel');

const Blogs = require('../Models/blogModel');

const jwt = require('jsonwebtoken');

const bcrypt = require("bcrypt");
const Auth = require('../Middlewares/Auth');

router.get('/',Auth, async(req,res)=>{
    try {
        // console.log(req.userInfo)

        const {title, category,  order } = req.query;

        let filter = {}

        if(title){
            filter.title = { $regex : title, $options : "i"}
        }

        if(category){
            filter.category = category
        }

        let sortOption = {};

        if(order == "desc"){
            sortOption.date = -1
        }
        else if( order == "asc"){
            sortOption.date = 1
        }

        const blogs = await Blogs.find(filter).sort(sortOption)

        return res.status(200).send({AllBlog : blogs})


    } catch (error) {
        return res.status(500).send(error)
    }
})




router.post('/',Auth, async(req,res)=>{
    try {
        // console.log(req.userInfo)

        const blog = await Blogs.create({...req.body, userID : req.userInfo.userID})

        return res.status(200).send({msg:"Blog Created !", newBlog : blog})


    } catch (error) {
        return res.status(500).send(error)
    }
})


router.patch('/:id',Auth, async(req,res)=>{
    try {
        const {id} = req.params;

        const {userID} = req.userInfo;

        await Blogs.find({_id : id}).then(async(result)=>{
            if(result[0].userID == userID){
                let val = await Blogs.findByIdAndUpdate(id, req.body)

                const data = await Blogs.findById(id)

                return res.status(200).send({msg:"Blog Updated !", newBlog : data})
        

            }else{
                return res.status(400).send({error : "Not Allowed"})
            }
        })

      
        
    } catch (error) {
        return res.status(500).send(error)  
    }
})


router.patch('/:id/like',Auth, async(req,res)=>{
    try {
        const {id} = req.params;

        await Blogs.findByIdAndUpdate(id, req.body)

        return res.status(200).send({msg:"Blog Updated !"})

       
    } catch (error) {
        return res.status(500).send(error)  
    }
})

router.patch('/:id/comment',Auth, async(req,res)=>{
    try {
        const {id} = req.params;

        await Blogs.findByIdAndUpdate(id, req.body)

        return res.status(200).send({msg:"Blog Updated !"})

       
    } catch (error) {
        return res.status(500).send(error)  
    }
})


router.delete('/:id',Auth, async(req,res)=>{
    try {
        const {id} = req.params;

        const {userID} = req.userInfo;

        await Blogs.find({_id : id}).then(async(result)=>{
            if(result[0].userID == userID){
                let val = await Blogs.findByIdAndDelete(id, req.body)

                return res.status(200).send({msg:"Blog Deleted !"})
        

            }else{
                return res.status(400).send({error : "Not Allowed"})
            }
        })
        
    } catch (error) {
        return res.status(500).send(error)  
    }
})











module.exports = router;