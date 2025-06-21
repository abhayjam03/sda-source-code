#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Surya Defence Academy - Setup Script');
console.log('=====================================\n');

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('📝 Creating .env.local file...');
  
  // Generate secure secrets
  const jwtSecret = crypto.randomBytes(32).toString('hex');
  const nextAuthSecret = crypto.randomBytes(32).toString('hex');
  
  const envContent = `# MongoDB Connection (Replace with your actual MongoDB Atlas connection string)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/surya-defence-academy?retryWrites=true&w=majority

# JWT Secret (Generated automatically - change in production)
JWT_SECRET=${jwtSecret}

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=${nextAuthSecret}

# Environment
NODE_ENV=development
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created successfully!');
  console.log('🔑 JWT_SECRET and NEXTAUTH_SECRET have been generated automatically.');
  console.log('⚠️  Please update MONGODB_URI with your actual MongoDB Atlas connection string.\n');
} else {
  console.log('✅ .env.local file already exists.\n');
}

// Check if MongoDB is running locally
console.log('🔍 Checking MongoDB connection...');

// Check if required packages are installed
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const requiredDeps = ['mongoose', 'bcryptjs'];
  const missingDeps = requiredDeps.filter(dep => !packageJson.dependencies[dep]);
  
  if (missingDeps.length > 0) {
    console.log(`❌ Missing dependencies: ${missingDeps.join(', ')}`);
    console.log('📦 Please run: npm install');
    process.exit(1);
  } else {
    console.log('✅ All required dependencies are installed.');
  }
}

console.log('\n📋 Next Steps:');
console.log('1. Update MONGODB_URI in .env.local with your MongoDB Atlas connection string');
console.log('2. Run: npm run init-user (to create the master admin user)');
console.log('3. Run: npm run dev (to start the development server)');
console.log('4. Login with: admin@suryadefenceacademy.com / Admin@123');
console.log('\n📚 For detailed setup instructions, see DEPLOYMENT.md');
console.log('🌐 For Vercel deployment, see the deployment guide in DEPLOYMENT.md\n');

console.log('🎉 Setup complete! Happy coding! 🚀'); 