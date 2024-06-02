import express from 'express';
import cors from 'cors';
import userRouter from './Router/UserRouter.js';
import bikeOwnerRouter from './Router/BikeOwnerRouter.js'
import AdminRouter from './Router/AdminRouter.js'
import MessageRouter from './Router/MessageRouter.js'
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import session, { MemoryStore } from 'express-session';
import sessionSecret from './config/config.js';
import cookieparser from 'cookie-parser'
import cookieSession from 'cookie-session';

dotenv.config();

const PORT = process.env.PORT || 5001;
connectDB();

const app = express();

app.use(cookieSession({
  name: 'session', 
  keys: ['key1', 'key2'], 
  maxAge: 24 * 60 * 60 * 1000
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieparser())
app.use(express.static('public'))



// Session Middleware
app.use(session({
  secret: sessionSecret,
  saveUninitialized: true,
  resave: false
}));

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
    credentials: true
}));

//User Routes  
app.use('/', userRouter);
//Bike Owner Routes  
app.use('/bikeowner',bikeOwnerRouter)
//Admin Routes
app.use('/admin',AdminRouter);
//Message Routes
app.use('/messages',MessageRouter)

app.use((err,req,res,next)=>{
  console.log("Error in middleware" , err)
})



app.listen(PORT, () => console.log('Server is running...'));
   