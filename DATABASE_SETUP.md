# MongoDB Atlas Database Setup Guide

This guide will help you set up and test your MongoDB Atlas database for the Surya Defence Academy application.

## Prerequisites

- Node.js installed (version 14 or higher)
- npm or yarn package manager
- MongoDB Atlas account with a cluster set up
- Internet connection

## Quick Start

### 1. Test Database Connection

First, test if your MongoDB Atlas connection is working:

```bash
npm run test-db
```

This will:
- Connect to your MongoDB Atlas cluster
- Test basic read/write operations
- Verify the connection is stable
- Show database information

### 2. Setup Database

If the connection test passes, set up your database with initial data:

```bash
npm run setup-db
```

This will:
- Create the database collections
- Set up admin user account
- Add sample courses
- Create necessary indexes
- Verify everything is working

## What Gets Created

### Admin User
- **Email**: admin@suryadefenceacademy.com
- **Password**: Admin@123
- **Role**: admin
- **Permissions**: read, write, delete, admin

### Sample Courses
1. **NDA Foundation** - Army preparation course
2. **CDS/OTA** - Combined Defence Services course

### Database Collections
- `users` - User accounts and authentication
- `courses` - Course information and details

## Troubleshooting

### Connection Issues

If you get connection errors:

1. **Check your internet connection**
2. **Verify MongoDB Atlas cluster is running**
3. **Check your connection string in `setup-database.js`**
4. **Ensure your IP is whitelisted in MongoDB Atlas**

### Common Error Messages

- `MongoNetworkError`: Network connectivity issue
- `MongoServerSelectionError`: Cannot reach MongoDB Atlas cluster
- `AuthenticationFailed`: Wrong username/password
- `MongoParseError`: Invalid connection string

### Manual Connection String Update

If you need to update the connection string, edit `setup-database.js`:

```javascript
const MONGODB_URI = 'mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/YOUR_DATABASE';
```

## Database Schema

### User Schema
```javascript
{
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  role: 'admin' | 'editor',
  permissions: [String],
  lastLogin: Date,
  timestamps: true
}
```

### Course Schema
```javascript
{
  name: String,
  type: 'Army' | 'Paramilitary' | 'Police' | 'School',
  description: String,
  examPattern: {
    mode: String,
    duration: Number,
    totalQuestions: Number,
    totalMarks: Number,
    subjects: [{ name: String, questions: Number, marks: Number }],
    markingScheme: { correct: Number, incorrect: Number },
    passingMarks: Number
  },
  eligibility: {
    education: String,
    age: { min: Number, max: Number },
    physicalRequirements: [String]
  },
  lastUpdated: Date,
  updatedBy: ObjectId (ref: User),
  timestamps: true
}
```

## Security Notes

- Change the default admin password after first login
- Use environment variables for production connection strings
- Regularly backup your database
- Monitor database access logs

## Next Steps

After successful setup:

1. Start your Next.js application: `npm run dev`
2. Navigate to the admin panel
3. Login with the admin credentials
4. Start managing your courses and users

## Support

If you encounter issues:

1. Check the console output for specific error messages
2. Verify your MongoDB Atlas cluster status
3. Test your connection string in MongoDB Compass
4. Check the MongoDB Atlas logs for any issues 