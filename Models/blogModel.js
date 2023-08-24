
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    username : {type : String, required : true},
    title : {type : String, required : true},
    content : {type : String, required : true},
    category : {type : String, required : true},
    date :  {type : String, required : true},
    likes :  {type : Number, default : 0 },
    comments : [{username : {type : String}, content :  {type : String}}],
    userID : {type : String, required : true}
})


const Blogs = mongoose.model('blog',blogSchema)

module.exports = Blogs;


