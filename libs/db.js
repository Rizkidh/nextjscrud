import mongoose from "mongoose";

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        console.log("MongoDB connected");
        } catch (error) {
            console.log("Error connecting to MongoDB", error);
        }
    }

    

export default connectDB;  