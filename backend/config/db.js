import mongoose from 'mongoose'

const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/MOTOMOTION')
        .then(()=>{
            console.log('mongodb connected');
        })
    } catch (error) {
        console.log(`Error : ${error.message}`);
        process.exit(1)
    }
}

export default connectDB