import asyncHandler from 'express-async-handler'
import User from '../model/userModel.js'
import Bikes from '../model/bikeModel.js'
import generateToken from '../utils/generateToken.js'
import { sendMail } from '../utils/nodemailer.js'
import bcrypt from 'bcrypt'


const securePassword = async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password,10)
        return passwordHash
    } catch (error) {
        console.log(error.message);    
    }   
}

const verifyUser = asyncHandler(async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body
        const errorMessages = {};
        if(name.trim() === ''){
            errorMessages.name = 'Empty name field';
        }else if(name.length<3){
            errorMessages.email = 'Name must be atleast 3 characters'
        }
        if (email.trim() === '') {
            errorMessages.email = 'Empty email field';
        } else if (!/^[a-zA-Z0-9._-]+@gmail\.com$/.test(email)) {
            errorMessages.email = 'Please enter a valid gmail address (e.g., example@gmail.com).';
        }
        if (password.trim() === '') {
            errorMessages.password = 'Empty password field';
        } else if (password.length < 6) {
            errorMessages.password = 'Password must be at least 6 characters long';
        }
        if(mobile.length ===0){
            errorMessages.mobile = 'Mobile number is required'
        }else if(mobile.length>=11){
            errorMessages.mobile  ='mobile number must be 10 digits'
        }

        if (Object.keys(errorMessages).length > 0) {
            return res.status(400).json({ messages: errorMessages });
        }

        const userExist = await User.findOne({ email })
        if (userExist) {
            console.log('user is already exist');
            res.status(400).json({message:'User is already exists..'})
        }else{
            req.session.userData = req.body
            sendMail(email,name,req)
            res.status(200)
            .json({status:true})      
    } 
    } catch (error) {   
        console.log(error.message);
    }
})

const resendOTP = async(req,res)=>{
    const userData = req.session.userData
    const {name,email} = userData
    sendMail(email,name,req)
    res.status(200)

}

const verifyOTP = asyncHandler(async(req,res)=>{
    const enteredOTP = req.body.otp
    const sessionOTP = req.session.otp
    const otp = parseInt(enteredOTP)
  
    if(otp===sessionOTP){
        const userData = req.session.userData
        const {name,email, password, mobile } = userData
            const spassword = await securePassword(password)
        const user = new User({
            name,
            email,
            password : spassword,
            mobile
        })
        const userDetails =  await user.save()
        if(userDetails){
            console.log('signUp success');
            res.status(200)
            .json({status : true})
        }else{
            res.status(400)
            json({message:'Registration failed'})
        }
    }else{
        res.status(400)
        .json({message : 'Invalid OTP'})
    }

 
})


const verifyLogin = asyncHandler(async(req,res)=>{
    try {
        const {email,password} = req.body
        const errorMessages = {};
        if (email.trim() === '') {
            errorMessages.email = 'Empty email field';
        } else if (!/^[a-zA-Z0-9._-]+@gmail\.com$/.test(email)) {
            errorMessages.email = 'Please enter a valid gmail address (e.g., example@gmail.com).';
        }

        if (password.trim() === '') {
            errorMessages.password = 'Empty password field';
        } 

        if (Object.keys(errorMessages).length > 0) {
            return res.status(400).json({ messages: errorMessages });
        }

        const userData = await User.findOne({email})
        req.session.userId = userData._id
        if(userData){
            const passwordMatch = await bcrypt.compare(password,userData.password)
            if(passwordMatch){
                if(!userData?.isBlocked ){
                    const token = generateToken(userData._id);
                    res.cookie('jwt',token,{
                        httpOnly : false,
                        secure : false,
                        sameSite : "strict",
                    })
                     return res.status(200)
                      .json({status : true})
                }else{
                    res.status(403)
                    .json({message : 'User is blocked by admin'})
                }
            }else{
                res.status(401)
                .json({message : 'Incorrect password'})
            }
        }else{
            res.status(401)
            .json({message : 'Unauthorized user please signUp'})
        }
    
    } catch (error) {
        console.log('>>>');
        console.log(error.message);
    }

    
})

const loadBikes = asyncHandler(async(req,res)=>{
    try {
        const bikes = await Bikes.find({is_deleted : false})
        res.json(bikes)
    } catch (error) {
        console.log(error.message);  
    }
})
 
const bikeDetails = asyncHandler(async(req,res)=>{
    const bikeId = req.query.bikeId
    const bikeDetails = await Bikes.findById({_id : bikeId})
    res.json(bikeDetails)   
})

const userProfile = async(req,res) =>{
    const userId = req.session.userId
    const user = await User.findOne({_id : userId})
    res.status(200).json(user)
}

const addDocument = async(req,res)=>{
    const userId = req.query.userId
    const documentPaths = req.files.map(file => file.filename);
    if(documentPaths){
        const user = await User.findByIdAndUpdate({_id : userId},{
            $set : {
                document : documentPaths,
                account_status : 'verifying document'
            }
        })
            res.status(200).json({status : true})
    }else{
        res.status(500)
        .json({message : 'Internal server error'})
    }
}

const loadEditUser = async (req,res) =>{
    const userId = req.query.userId
    console.log(userId,"111");
    const user = await User.findOne({_id : userId})
    res.json(user)
}

const editUser = async(req, res) =>{
    try {
        const {_id, name, mobile} = req.body
        const user = await User.findByIdAndUpdate(
            _id,
            { $set: { name, mobile } } 
        );
        
        if(user){
            res.status(200)
            .json({status : true})
        }else{
            res.status(400)
            .json({message : 'Failed to update the user data'})
        }
        
    } catch (error) {
        console.log(error.message);
    }
}

const logoutUser = asyncHandler(async (req, res) => {
    req.session = null
    res.cookie("jwt", "", {   
      httpOnly: false,
      expires: new Date(0),
    });    
    res.status(200).json({ message: "User logged out" });
  });   


export { 
    verifyUser,
    resendOTP,
    verifyOTP,
    verifyLogin,
    logoutUser ,
    loadBikes,
    bikeDetails,
    userProfile,
    addDocument,
    loadEditUser,
    editUser
    

}