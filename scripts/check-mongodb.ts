import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blood_donation_db';

async function checkConnection() {
  try {
    console.log('🔄 Checking MongoDB connection...');
    console.log(`📍 Connection URI: ${MONGODB_URI}`);
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });
    
    console.log('✅ Successfully connected to MongoDB!');
    
    if (mongoose.connection.db) {
      console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);
      
      // List collections
      const collections = await mongoose.connection.db.listCollections().toArray();
      console.log(`📚 Collections (${collections.length}):`);
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
      
      // Get some stats
      const stats = await mongoose.connection.db.stats();
      console.log(`\n📈 Database Stats:`);
      console.log(`   - Collections: ${stats.collections}`);
      console.log(`   - Data Size: ${(stats.dataSize / 1024).toFixed(2)} KB`);
      console.log(`   - Storage Size: ${(stats.storageSize / 1024).toFixed(2)} KB`);
    }
    
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB');
    console.error('Error:', error instanceof Error ? error.message : error);
    console.log('\n💡 Troubleshooting:');
    console.log('   1. Make sure MongoDB is installed');
    console.log('   2. Check if MongoDB service is running:');
    console.log('      Windows: net start MongoDB');
    console.log('   3. Verify connection string in .env.local');
    console.log('   4. See MONGODB_SETUP.md for detailed instructions');
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Disconnected from MongoDB');
    process.exit(0);
  }
}

checkConnection();
