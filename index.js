const express = require('express');

const app = express();

const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');
const { default: mongoose } = require('mongoose');

app.use(cors())

app.use(express.json())

const UserRoute = require('./Routes/userRoute')
const BlogRoute = require('./Routes/blogRoute')

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to Homepage...')
})


app.use('/api', UserRoute)
app.use('/api/blogs', BlogRoute)



app.listen(process.env.PORT,()=>{
    connect();

    console.log('Listening to Port...');
})

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL);

        console.log('Connected to db...');
    } catch (error) {
        console.log(error)
    }
}


