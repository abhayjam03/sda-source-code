#!/usr/bin/env node

// Load environment variables



import connectDB from '../lib/mongodb.js';
import User from '../models/User.js';

const masterUserData = {
  username: 'admin',
  email: 'admin@suryadefenceacademy.com',
  password: 'Admin@123',
  role: 'admin',
  isActive: true,
  permissions: [
    'manage_users',
    'manage_courses',
    'manage_academy',
    'manage_forces',
    'manage_schools',
    'view_analytics',
    'manage_content'
  ]
};

async function initMasterUser() {
  try {
    console.log('🚀 Initializing master user...');
    console.log('📡 Connecting to database...');
    
    await connectDB();
    
    // Check if master user already exists
    const existingUser = await User.findOne({ email: masterUserData.email });
    
    if (existingUser) {
      console.log('✅ Master user already exists!');
      console.log('📧 Email:', existingUser.email);
      console.log('👤 Role:', existingUser.role);
      console.log('📅 Created at:', existingUser.createdAt);
      return;
    }

    // Create master user
    console.log('👤 Creating master user...');
    const masterUser = new User(masterUserData);
    await masterUser.save();

    console.log('✅ Master user created successfully!');
    console.log('📧 Email:', masterUser.email);
    console.log('🔑 Password:', masterUserData.password);
    console.log('👤 Role:', masterUser.role);
    console.log('📅 Created at:', masterUser.createdAt);
    console.log('\n🎉 You can now login with these credentials!');
    
  } catch (error) {
    console.error('❌ Error creating master user:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.error('\n💡 MongoDB connection failed. Please make sure:');
      console.error('1. MongoDB is running locally on port 27017');
      console.error('2. You can start MongoDB with: mongod');
      console.error('3. Or install MongoDB if not already installed');
    }
  } finally {
    process.exit(0);
  }
}

initMasterUser(); 