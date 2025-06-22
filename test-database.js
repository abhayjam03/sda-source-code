import mongoose from 'mongoose';

const MONGODB_URI = '';

const connectionOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority'
};

async function testDatabaseConnection() {
  try {
    console.log('🧪 Testing MongoDB Atlas connection...');
    
    const connection = await mongoose.connect(MONGODB_URI, connectionOptions);
    
    console.log('✅ Connection successful!');
    console.log(`📊 Database: ${connection.connection.db.databaseName}`);
    console.log(`🌐 Host: ${connection.connection.host}`);
    console.log(`🔌 Port: ${connection.connection.port}`);
    
    // Test ping
    await mongoose.connection.db.admin().ping();
    console.log('🏓 Database ping successful');
    
    // List collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📚 Collections found:', collections.map(col => col.name));
    
    // Test basic operations
    const testCollection = mongoose.connection.db.collection('test');
    await testCollection.insertOne({ test: 'data', timestamp: new Date() });
    console.log('✍️ Write test successful');
    
    const result = await testCollection.findOne({ test: 'data' });
    console.log('📖 Read test successful');
    
    await testCollection.deleteOne({ test: 'data' });
    console.log('🗑️ Delete test successful');
    
    console.log('\n🎉 All database tests passed! Your MongoDB Atlas is working perfectly.');
    
  } catch (error) {
    console.error('❌ Database test failed:', error.message);
    
    if (error.name === 'MongoNetworkError') {
      console.error('🔌 Network Error: Check your internet connection');
    } else if (error.name === 'MongoServerSelectionError') {
      console.error('🌐 Server Error: Check your MongoDB Atlas cluster status');
    } else if (error.name === 'AuthenticationFailed') {
      console.error('🔐 Auth Error: Check your username/password');
    }
    
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');
  }
}

// Handle graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down...');
  await mongoose.disconnect();
  process.exit(0);
});

testDatabaseConnection(); 