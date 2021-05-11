import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'


import posts from './routes/posts.js'

const app = express()
dotenv.config();
app.get('/',(req,res)=>{
    res.send("hello mem api")
})



app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
app.use('/posts',posts)

const PORT= process.env.PORT||5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => app.listen(PORT,()=>console.log(`Server running on PORT: ${PORT}`)))
.catch((err)=>console.log(err.message))

mongoose.set('useFindAndModify',false);