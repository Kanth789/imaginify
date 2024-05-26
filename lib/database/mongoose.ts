import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = process.env.MONGODB_URL;

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = {
    conn: null, promise: null
  };
}

export const connectToDatabase = async () => {
  if (cached.conn) {
    console.log('Using cached connection');
    return cached.conn;
  }

  if (!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  try {
    cached.promise =
      cached.promise ||
      mongoose.connect(MONGODB_URL, {
        dbName: 'imaginify',
        bufferCommands: false,
      });

    cached.conn = await cached.promise;
    console.log('New connection established');
    return cached.conn;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
};
