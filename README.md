# Surya Defence Academy Website

A comprehensive, modern website for Surya Defence Academy built with Next.js 15, TypeScript, and Tailwind CSS. The platform serves as both a public-facing website for students and a robust admin panel for academy management.

## 🚀 Features

### Public Features
- **Modern Responsive Design** - Mobile-first approach with beautiful UI/UX
- **Course Catalog** - Comprehensive listing of defence examination courses
- **Dynamic Content** - Server-side rendered pages with real-time data
- **SEO Optimized** - Meta tags, structured data, and performance optimization
- **Contact Integration** - Direct phone call integration and contact forms
- **Testimonials & Features** - Dynamic content showcasing academy benefits
- **Course Details** - Detailed course information with exam patterns and eligibility

### Admin Features
- **Secure Authentication** - JWT-based authentication with role-based access
- **Dashboard Analytics** - Real-time statistics and overview
- **Content Management** - CRUD operations for academies, courses, forces, and schools
- **User Management** - Admin and editor role management
- **Data Visualization** - Interactive charts and statistics
- **Responsive Admin Panel** - Material-UI based admin interface

### Technical Features
- **Full-Stack Architecture** - Next.js frontend with Express.js backend
- **Database Integration** - MongoDB with Mongoose ODM
- **State Management** - Zustand for client-side state
- **API Routes** - RESTful API endpoints for all operations
- **Authentication Middleware** - Protected routes and API endpoints
- **Image Optimization** - Next.js Image component with lazy loading
- **Animation** - Framer Motion for smooth animations
- **Type Safety** - TypeScript for better development experience

## 🏗️ Project Structure

```
sda-source-code/
├── src/                          # Next.js frontend application
│   ├── app/                      # App Router (Next.js 15)
│   │   ├── admin/                # Admin panel pages
│   │   │   ├── academy/          # Academy management
│   │   │   ├── courses/          # Course management
│   │   │   ├── forces/           # Forces management
│   │   │   ├── schools/          # School management
│   │   │   ├── layout.js         # Admin layout
│   │   │   └── page.js           # Admin dashboard
│   │   ├── api/                  # API routes
│   │   │   ├── auth/             # Authentication endpoints
│   │   │   ├── academy/          # Academy API
│   │   │   ├── courses/          # Courses API
│   │   │   ├── forces/           # Forces API
│   │   │   ├── schools/          # Schools API
│   │   │   └── users/            # Users API
│   │   ├── courses/              # Public course pages
│   │   ├── about/                # About page
│   │   ├── admission/            # Admission page
│   │   ├── contact/              # Contact page
│   │   ├── login/                # Admin login
│   │   ├── layout.tsx            # Root layout
│   │   └── page.tsx              # Homepage
│   ├── components/               # Reusable components
│   │   ├── admin/                # Admin-specific components
│   │   ├── common/               # Shared components
│   │   ├── courses/              # Course-related components
│   │   ├── layout/               # Layout components
│   │   └── ui/                   # UI components
│   ├── data/                     # Static data
│   │   └── courses.ts            # Course definitions
│   ├── lib/                      # Utility libraries
│   │   ├── api-utils.js          # API utilities
│   │   └── mongodb.js            # Database connection
│   ├── models/                   # Database models
│   ├── services/                 # API services
│   ├── store/                    # State management
│   │   └── authStore.js          # Authentication store
│   ├── types/                    # TypeScript definitions
│   └── utils/                    # Utility functions
├── server/                       # Express.js backend
│   ├── configs/                  # Configuration files
│   │   └── db.js                 # Database configuration
│   ├── middleware/               # Express middleware
│   │   └── auth.js               # Authentication middleware
│   ├── models/                   # Database models
│   │   ├── Academy.js            # Academy model
│   │   ├── Course.js             # Course model
│   │   ├── Force.js              # Force model
│   │   ├── School.js             # School model
│   │   └── User.js               # User model
│   ├── routes/                   # API routes
│   │   ├── academy.js            # Academy routes
│   │   ├── auth.js               # Authentication routes
│   │   ├── courses.js            # Course routes
│   │   ├── forces.js             # Force routes
│   │   ├── schools.js            # School routes
│   │   └── index.js              # Main routes
│   ├── index.js                  # Server entry point
│   └── package.json              # Backend dependencies
├── public/                       # Static assets
│   ├── images/                   # Image assets
│   └── blog/                     # Blog assets
├── package.json                  # Frontend dependencies
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── tsconfig.json                 # TypeScript configuration
└── setup.js                      # Initial setup script
```

## 📱 Pages & Functionality

### Public Pages

#### Homepage (`/`)
- Hero section with dynamic content
- Featured courses showcase
- All courses grid layout
- Features/benefits section
- Student testimonials
- Contact call-to-action

#### Courses (`/courses`)
- Complete course catalog
- Course cards with detailed information
- Exam patterns and eligibility
- Course categories (Army, Paramilitary, Police, School)

#### Individual Course Pages (`/courses/[slug]`)
- Detailed course information
- Exam pattern breakdown
- Subject-wise marks distribution
- Eligibility criteria
- Duration and mode information

#### About (`/about`)
- Academy information
- Mission and vision
- Faculty details
- Infrastructure overview

#### Admission (`/admission`)
- Admission process
- Requirements
- Application forms
- Contact information

#### Contact (`/contact`)
- Contact form
- Location details
- Phone integration
- Office hours

### Admin Pages

#### Login (`/login`)
- Secure authentication
- Role-based access control
- JWT token management
- Session persistence

#### Admin Dashboard (`/admin`)
- Overview statistics
- Quick action buttons
- Recent activity feed
- System health monitoring

#### Academy Management (`/admin/academy`)
- CRUD operations for academies
- Location management
- Contact information
- Status tracking

#### Course Management (`/admin/courses`)
- Course creation and editing
- Exam pattern configuration
- Subject management
- Eligibility criteria setup

#### Forces Management (`/admin/forces`)
- Defence forces configuration
- Force-specific settings
- Requirements management

#### Schools Management (`/admin/schools`)
- School information management
- Academic details
- Contact information

## 🗄️ Database Models

### User Model
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['admin', 'editor']),
  permissions: [String],
  lastLogin: Date,
  timestamps: true
}
```

### Course Model
```javascript
{
  name: String (required),
  type: String (enum: ['Army', 'Paramilitary', 'Police', 'School']),
  description: String (required),
  examPattern: {
    mode: String,
    duration: Number,
    totalQuestions: Number,
    totalMarks: Number,
    subjects: [{
      name: String,
      questions: Number,
      marks: Number
    }],
    markingScheme: {
      correct: Number,
      incorrect: Number
    },
    passingMarks: Number
  },
  eligibility: {
    education: String,
    age: { min: Number, max: Number },
    physicalRequirements: [String]
  },
  timestamps: true
}
```

### Academy Model
```javascript
{
  name: String (required),
  location: String,
  contact: {
    phone: String,
    email: String,
    address: String
  },
  status: String (enum: ['active', 'inactive']),
  timestamps: true
}
```

## 🔧 Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# Frontend Environment Variables
NEXT_PUBLIC_CONTACT_PHONE=7355666622
NEXT_PUBLIC_MONGODB_URI=mongodb://localhost:27017/surya-defence-academy
NEXT_PUBLIC_API_URL=http://localhost:3001/api

# Backend Environment Variables (server/.env)
PORT=3001
MONGODB_URI=mongodb://localhost:27017/surya-defence-academy
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000

# Optional: Production Database
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/surya-defence-academy

# Optional: Email Configuration
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or later
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/surya-defence-academy.git
cd surya-defence-academy
```

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Install backend dependencies:**
```bash
cd server
npm install
cd ..
```

4. **Set up environment variables:**
```bash
# Create .env.local in root directory
cp .env.example .env.local
# Edit .env.local with your configuration

# Create .env in server directory
cd server
cp .env.example .env
# Edit .env with your configuration
cd ..
```

5. **Set up the database:**
```bash
# Start MongoDB (if running locally)
mongod

# Run setup script
npm run setup
```

6. **Initialize master user:**
```bash
npm run init-user
```

7. **Populate database with sample data:**
```bash
npm run populate-db
```

8. **Start the development servers:**

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

9. **Access the application:**
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:3001](http://localhost:3001)
- Admin Panel: [http://localhost:3000/admin](http://localhost:3000/admin)

## 📜 Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Backend Scripts
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Setup Scripts
- `npm run setup` - Initial project setup
- `npm run init-user` - Initialize master admin user
- `npm run populate-db` - Populate database with sample data

## 🔐 Authentication & Authorization

### User Roles
- **Admin**: Full access to all features and data management
- **Editor**: Limited access to content management

### Authentication Flow
1. User submits login credentials
2. Server validates credentials against database
3. JWT token generated and returned
4. Token stored in localStorage via Zustand
5. Protected routes check token validity
6. Automatic token refresh and session management

### Protected Routes
- `/admin/*` - All admin pages require authentication
- `/api/admin/*` - Admin API endpoints require valid token

## 🎨 Styling & UI

### Design System
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI** - React component library for admin panel
- **Framer Motion** - Animation library
- **Heroicons** - Icon library
- **Custom Components** - Reusable UI components

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interfaces
- Optimized for all device sizes

## 📊 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Academies
- `GET /api/academy` - Get all academies
- `POST /api/academy` - Create academy
- `PUT /api/academy/:id` - Update academy
- `DELETE /api/academy/:id` - Delete academy

### Courses
- `GET /api/courses` - Get all courses
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Forces
- `GET /api/forces` - Get all forces
- `POST /api/forces` - Create force
- `PUT /api/forces/:id` - Update force
- `DELETE /api/forces/:id` - Delete force

### Schools
- `GET /api/schools` - Get all schools
- `POST /api/schools` - Create school
- `PUT /api/schools/:id` - Update school
- `DELETE /api/schools/:id` - Delete school

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend Deployment (Railway/Render)
1. Connect GitHub repository
2. Set environment variables
3. Configure build commands
4. Deploy and get production URL

### Database Deployment (MongoDB Atlas)
1. Create MongoDB Atlas cluster
2. Configure network access
3. Create database user
4. Update connection string in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For any queries, please contact:
- **Phone**: 7355666622
- **Email**: info@suryadefenceacademy.com
- **Website**: [https://suryadefenceacademy.com](https://suryadefenceacademy.com)

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in environment variables
   - Verify network access for cloud databases

2. **Authentication Issues**
   - Clear browser localStorage
   - Check JWT token expiration
   - Verify user credentials in database

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check TypeScript configuration
   - Verify all dependencies are installed

4. **API Errors**
   - Check server logs for detailed error messages
   - Verify API endpoints are accessible
   - Check CORS configuration

### Development Tips

- Use `npm run dev` for development with hot reload
- Check browser console for frontend errors
- Monitor server logs for backend issues
- Use MongoDB Compass for database management
- Test API endpoints with Postman or similar tools
