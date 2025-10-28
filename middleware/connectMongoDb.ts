import mongoose from 'mongoose';

const ConnectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI||"");
        console.log('MongoDB connected');
    } catch (error) {
        console.log("uri is",process.env.MONGODB_URI);
        console.error('Database connection error:', error);
        throw error; // Propagate the error to handle it in the server startup
    }
};

export default ConnectDb;