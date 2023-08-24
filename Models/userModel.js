
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username : {type : String, required : true},
    avatar : {type : String, required : true},
    email : {type : String, required : true},
    password : {type : String, required : true},
    // blog : [{type : mongoose.Schema.Types.ObjectId, ref : "blog"}]
})


const Users = mongoose.model('user',userSchema)

module.exports = Users;
