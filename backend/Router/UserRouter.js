
import express from 'express'
import {  addDocument, bikeDetails, editUser, loadBikes, loadEditUser, logoutUser, resendOTP, userProfile, verifyLogin, verifyOTP, verifyUser } from '../Controller/UserController.js'
import { is_blocked } from '../middleware/userAuth.js'
import multer from 'multer'


const user_router = express.Router()

user_router.use(express.static('public'))


//multer
const productStorage = multer.diskStorage({ 
    destination: (req,file,callback)=>{
        callback(null,'public/admin-assets/uploads/')
    },

    //extention
    filename: (req,file,callback)=>{
        callback(null,Date.now()+file.originalname)

    }
})

//upload parameters for multer
const uploadprdt = multer({
    storage : productStorage,
    // limits : {
    //     fileSize : 1024*1024*5
    // }
})


user_router.post('/verifyuser',verifyUser)
user_router.get('/resentOTP',resendOTP)
user_router.post('/verifyOTP',verifyOTP)
user_router.post('/login',verifyLogin)
user_router.get('/bikes',loadBikes)
user_router.get('/bike-details',bikeDetails) 
user_router.get('/userprofile',userProfile)
user_router.post('/add-document',uploadprdt.array('document'),addDocument)
user_router.get('/load-edituser',loadEditUser)
user_router.post('/edituser',editUser)
user_router.get('/user-logout',logoutUser) 
  

export default user_router  