import mongoose from "mongoose";

export const connectDb = async() =>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Manager')
        console.log('connect database success')
    } catch (error) {
        console.log('connect database fail', error);
    }
        
}
export default connectDb; 