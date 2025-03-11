import mongoose from 'mongoose';
let connected = false;

const connectDB = async () => {
  mongoose.set('strictQuery', true);
  //if the data base is already connected
  if (connected) {
    console.log('Database is already connected');
    return;
  }
  //Connect to MongoDB
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI!);
    connected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error('An unknown error occurred');
    }
    process.exit(1);
  }
};

export default connectDB;
