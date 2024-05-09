import express from 'express'
import {    addBike, bikeList, bikeOwnerLogin, bikeOwnerSignup, deleteBike, loadOwnerDetails, loadOwnerEditBike, logoutOwner, ownerEditBike } from '../Controller/BikeOwnerController.js'
import multer from 'multer'

const bikeowner_router = express.Router()

bikeowner_router.use(express.static('public'))

//multer......

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


bikeowner_router.post('/bikeowner-signup',bikeOwnerSignup)
bikeowner_router.post('/bikeowner-login',bikeOwnerLogin)
bikeowner_router.get('/loadowner-details',loadOwnerDetails)
bikeowner_router.post('/addbike',uploadprdt.array('image'),addBike)
bikeowner_router.get('/bike-list',bikeList)
bikeowner_router.get('/deletebike',deleteBike)
bikeowner_router.get('/bikeowner-loadbikeedit',loadOwnerEditBike)
bikeowner_router.post('/bikeowner-editbike',uploadprdt.array('image'),ownerEditBike)
bikeowner_router.get('/owner-logout',logoutOwner)



export default bikeowner_router  