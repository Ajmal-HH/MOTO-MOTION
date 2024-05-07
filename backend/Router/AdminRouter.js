import express from 'express'
import {  addNewUser, addbikeOwner, adminAuth, adminEditOwer, adminEdituser, bikeOwnerList, blockOwner, blockUser, loadAdminEditUser, loadAdminOwnerEdit, unblockOwner, unblockUser, userDetails, userList, verifyDocument } from '../Controller/AdminController.js'

const admin_router = express.Router()

admin_router.post('/admin-login',adminAuth)
admin_router.get('/users',userList)
admin_router.get('/owners',bikeOwnerList)
admin_router.get('/blockUser',blockUser)
admin_router.get('/unblockUser',unblockUser)
admin_router.get('/blockOwner',blockOwner)
admin_router.get('/unblockOwner',unblockOwner)
admin_router.post('/adduser',addNewUser)
admin_router.get('/admin-loadedituser',loadAdminEditUser)
admin_router.post('/admin-edituser',adminEdituser)
admin_router.post('/addowner',addbikeOwner)
admin_router.get('/admin-loadeditowner',loadAdminOwnerEdit)
admin_router.post('/admin-editowner', adminEditOwer)
admin_router.get('/userdetails',userDetails)
admin_router.get('/verify-document',verifyDocument)

export default admin_router          