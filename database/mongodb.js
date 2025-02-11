import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
    throw new Error('Please define the DB_URI environment variable inside .env.<development/production>.local');
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);

        console.log(`MongoDB connected: ${NODE_ENV}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectToDatabase ;