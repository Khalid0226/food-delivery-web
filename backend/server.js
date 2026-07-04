import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './routes/CustomerRoute.js'

import menuRouter from  './routes/MenuRoute.js'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth',router)

app.use('/api/menu',menuRouter)

mongoose.connect('mongodb://localhost:27017/food-delivery')
.then(()=>{
    console.log("DB connected Successfully!!");
})
.catch((err)=>{
    console.log(err);
})

app.listen(2500,()=>{
    console.log("server running");
    
})