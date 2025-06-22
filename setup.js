#!/usr/bin/env node

import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting Surya Defence Academy Setup...\n');

try {
  // Step 1: Initialize master user
  console.log('👤 Step 1: Initializing master user...');
  execSync('npm run init-user', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  console.log('✅ Master user initialized successfully!\n');

  // Step 2: Populate database with data
  console.log('📊 Step 2: Populating database with content...');
  execSync('npm run populate-db', { 
    cwd: __dirname, 
    stdio: 'inherit' 
  });
  console.log('✅ Database populated successfully!\n');

  console.log('🎉 Setup completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Start the development server: npm run dev');
  console.log('2. Access the admin panel at: http://localhost:3000/admin');
  console.log('3. Login with: admin@suryadefenceacademy.com / Admin@123');
  console.log('4. Start managing your content!');
  
} catch (error) {
  console.error('❌ Setup failed:', error.message);
  console.log('\n💡 Troubleshooting:');
  console.log('1. Make sure MongoDB is running');
  console.log('2. Check your database connection settings');
  console.log('3. Ensure all dependencies are installed: npm install');
  process.exit(1);
} 