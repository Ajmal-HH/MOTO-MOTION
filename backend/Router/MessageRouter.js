import express from 'express'
import protectedRoute from '../middleware/protectedRoute.js'
import { getMessages, messageSidebar, sendMessage } from '../Controller/MessageController.js'

const message_router = express.Router()


message_router.get('/messages/:id',protectedRoute,getMessages)
message_router.post('/send/:id',protectedRoute,sendMessage)
message_router.get('/messagesidebar',protectedRoute,messageSidebar)

export default message_router