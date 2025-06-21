# Surya Defence Academy - Authentication Setup

## Prerequisites

1. **MongoDB** - Make sure MongoDB is installed and running locally
2. **Node.js** - Version 18 or higher
3. **npm** - Package manager

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/surya-defence-academy

# JWT Secret (generate a strong secret for production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Initialize Master User

Run the following command to create the master admin user:

```bash
npm run init-user
```

This will create a master user with the following credentials:
- **Email**: admin@suryadefenceacademy.com
- **Password**: Admin@123
- **Role**: admin

### 4. Start Development Server

```bash
npm run dev
```

## Master User Details

The initialization script creates a master user with full admin privileges:

```javascript
{
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
}
```

## Features

### Authentication System
- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ User role management
- ✅ Token expiration (24 hours)
- ✅ Secure middleware protection
- ✅ Persistent login state

### User Management
- ✅ User registration (admin only)
- ✅ User authentication
- ✅ Role-based access control
- ✅ User permissions
- ✅ Last login tracking
- ✅ Account status management

### Security Features
- ✅ Password hashing
- ✅ JWT token verification
- ✅ Route protection
- ✅ Session management
- ✅ Automatic logout on token expiry

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Protected Routes
- `/admin/*` - Admin panel routes
- `/login` - Login page

## Database Schema

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['admin', 'editor', 'user']),
  isActive: Boolean (default: true),
  lastLogin: Date,
  permissions: [String],
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### MongoDB Connection Issues
1. Ensure MongoDB is running: `mongod`
2. Check connection string in `.env.local`
3. Verify database name and permissions

### Authentication Issues
1. Check JWT_SECRET in environment variables
2. Verify user exists in database
3. Check token expiration
4. Clear browser storage if needed

### Development Issues
1. Clear `.next` folder: `rm -rf .next`
2. Reinstall dependencies: `rm -rf node_modules && npm install`
3. Restart development server

## Production Deployment

1. Set strong JWT_SECRET
2. Use production MongoDB instance
3. Configure proper environment variables
4. Set up SSL/TLS
5. Implement rate limiting
6. Add monitoring and logging 