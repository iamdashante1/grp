import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blood_donation_db';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000, // 5 second timeout
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log('✅ MongoDB Connected to:', MONGODB_URI.replace(/\/\/.*@/, '//<credentials>@'));
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB Connection Error:', error.message);
      console.error('\n📝 To fix this:');
      console.error('1. Make sure MongoDB is installed');
      console.error('2. Start MongoDB service:');
      console.error('   - Windows: Run "net start MongoDB" as Administrator');
      console.error('   - Or use MongoDB Atlas (cloud): See MONGODB_SETUP.md');
      console.error('3. Check your MONGODB_URI in .env.local\n');
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
