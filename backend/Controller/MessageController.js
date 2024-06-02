import Conversation from "../model/conversationModel.js"
import Message from "../model/messageModel.js"
import User from "../model/userModel.js"

const sendMessage = async(req,res) =>{
    try {
        const {message} = req.body
        const {id : receiverId} = req.params
        const senderId = req.user._id

        let conversation = await Conversation.findOne({
            participants : {$all : [senderId, receiverId]}
        })
        
        if(!conversation){
            conversation = await Conversation.create({
                participants : [senderId, receiverId]
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if(newMessage){
            conversation.messages.push(newMessage._id)
        }

        // await conversation.save()
        // await newMessage.save()

        await Promise.all([conversation.save(),newMessage.save()])

        res.status(201).json(newMessage)
    } catch (error) {
        console.log("error in sendMessage controller",error.message);
        res.status(500).json({error : 'Internal server error'})
    }
}

const getMessages = async (req,res) =>{
    try {
        const {id : userToChatId} = req.params;
        const senderId = req.user._id

        const conversation = await Conversation.findOne({
            participants : {$all : [senderId, userToChatId]}
        }).populate("messages")

        if(!conversation) return res.status(200).json([])

        const messages = conversation.messages

        res.status(200).json(messages)
    } catch (error) {
        console.log("error in sendMessage controller",error.message);
        res.status(500).json({error : 'Internal server error'})
    }
}

const messageSidebar = async (req,res) =>{
    try {
        const logedInUser = req.user._id
        const filteredUsers = await User.find({_id : {$ne : logedInUser}}).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log('error in messagesidebar', error.message);
        res.status(500).json({error : 'Internal server error'})
    }
}

export {
    sendMessage,
    getMessages,
    messageSidebar
}