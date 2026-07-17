import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import customerRouter from './routes/CustomerRoute.js'

import menuRouter from './routes/MenuRoute.js'
import orderRouter from './routes/OrderRoute.js'

import adminRouter from './routes/AdminRoutes.js'

import 'dotenv/config';


const app = express()

app.use(express.json())
app.use(cors())

app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('uploads'));


app.use('/api/auth', customerRouter)

app.use('/api/menu', menuRouter)

app.use('/api', orderRouter)

app.use('/api',adminRouter)


try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connected Successfully!!");
}
catch (err){
    console.log(err);
}

app.listen(2500, () => {
    console.log("server running");

})