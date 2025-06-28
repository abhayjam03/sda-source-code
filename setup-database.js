import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGODB_URI;

const connectionOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  retryWrites: true,
  w: 'majority'
};

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor', 'instructor', 'student'], default: 'student' },
  permissions: [{ type: String }],
  profile: {
    firstName: String,
    lastName: String,
    phone: String,
    address: String,
    dateOfBirth: Date,
    gender: { type: String, enum: ['male', 'female', 'other'] },
    profileImage: String
  },
  lastLogin: { type: Date },
  isActive: { type: Boolean, default: true }
}, { timestamps: true, collection: 'users' });

// Academy Schema
const academySchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: String,
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  facilities: [String],
  capacity: Number,
  establishedYear: Number,
  isActive: { type: Boolean, default: true },
  images: [String],
  rating: { type: Number, min: 0, max: 5, default: 0 }
}, { timestamps: true, collection: 'academies' });

// School Schema
const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Army', 'Navy', 'Air Force', 'Paramilitary', 'Police'], required: true },
  description: String,
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String
  },
  contact: {
    phone: String,
    email: String,
    website: String
  },
  establishedYear: Number,
  isActive: { type: Boolean, default: true },
  images: [String]
}, { timestamps: true, collection: 'schools' });

// Force Schema
const forceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Army', 'Navy', 'Air Force', 'Paramilitary', 'Police'], required: true },
  description: String,
  headquarters: String,
  establishedYear: Number,
  strength: Number,
  isActive: { type: Boolean, default: true },
  logo: String,
  images: [String],
  requirements: {
    age: { min: Number, max: Number },
    education: [String],
    physicalStandards: [String],
    medicalStandards: [String]
  }
}, { timestamps: true, collection: 'forces' });

// Course Schema
const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ['Army', 'Navy', 'Air Force', 'Paramilitary', 'Police', 'School'], required: true },
  category: { type: String, enum: ['Foundation', 'Intermediate', 'Advanced', 'Specialized'], required: true },
  description: { type: String, required: true },
  duration: {
    months: Number,
    hours: Number
  },
  fee: {
    amount: Number,
    currency: { type: String, default: 'INR' },
    installment: Boolean,
    discount: Number
  },
  examPattern: {
    mode: String,
    duration: Number,
    totalQuestions: Number,
    totalMarks: Number,
    subjects: [{ 
      name: String, 
      questions: Number, 
      marks: Number,
      topics: [String]
    }],
    markingScheme: { correct: Number, incorrect: Number },
    passingMarks: Number,
    negativeMarking: Boolean
  },
  eligibility: {
    education: String,
    age: { min: Number, max: Number },
    physicalRequirements: [String],
    medicalRequirements: [String],
    nationality: [String]
  },
  syllabus: [{
    subject: String,
    topics: [String],
    weightage: Number
  }],
  features: [String],
  highlights: [String],
  careerProspects: [String],
  successRate: Number,
  isActive: { type: Boolean, default: true },
  isPopular: { type: Boolean, default: false },
  isFeatured: { type: Boolean, default: false },
  images: [String],
  brochure: String,
  lastUpdated: { type: Date, default: Date.now },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true, collection: 'courses' });

// Create models
const User = mongoose.model('User', userSchema);
const Academy = mongoose.model('Academy', academySchema);
const School = mongoose.model('School', schoolSchema);
const Force = mongoose.model('Force', forceSchema);
const Course = mongoose.model('Course', courseSchema);

async function setupDatabase() {
  let connection;
  
  try {
    console.log('🔄 Connecting to MongoDB Atlas...');
    connection = await mongoose.connect(MONGODB_URI, connectionOptions);
    console.log('✅ Connected successfully to MongoDB Atlas!');
    console.log(`📊 Database: ${connection.connection.db.databaseName}`);
    console.log(`🌐 Host: ${connection.connection.host}`);

    await mongoose.connection.db.admin().ping();
    console.log('🏓 Database ping successful');

    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Academy.deleteMany({});
    await School.deleteMany({});
    await Force.deleteMany({});
    await Course.deleteMany({});
    console.log('✅ Existing data cleared');

    console.log('👤 Creating admin user...');
    const hashedPassword = await bcrypt.hash('Admin@123', 8);
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@suryadefenceacademy.com',
      password: hashedPassword,
      role: 'admin',
      permissions: ['read', 'write', 'delete', 'admin'],
      profile: {
        firstName: 'Admin',
        lastName: 'User',
        phone: '+91-9876543210',
        address: 'Surya Defence Academy, Delhi',
        dateOfBirth: new Date('1990-01-01'),
        gender: 'male'
      },
      lastLogin: new Date()
    });
    console.log('✅ Admin user created successfully');

    console.log('🛡️ Creating forces...');
    const forces = await Force.insertMany([
      {
        name: "Indian Army",
        type: "Army",
        description: "The land-based branch and the largest component of the Indian Armed Forces.",
        headquarters: "New Delhi",
        establishedYear: 1947,
        strength: 1200000,
        logo: "/images/forces/army-logo.png",
        images: ["/images/forces/army1.jpg", "/images/forces/army2.jpg"],
        requirements: {
          age: { min: 16, max: 25 },
          education: ["10+2", "Graduation"],
          physicalStandards: ["Height: 157cm minimum", "Weight: Proportionate to height"],
          medicalStandards: ["Medical Category A", "Good eyesight"]
        }
      },
      {
        name: "Indian Navy",
        type: "Navy",
        description: "The naval branch of the Indian Armed Forces.",
        headquarters: "New Delhi",
        establishedYear: 1947,
        strength: 67000,
        logo: "/images/forces/navy-logo.png",
        images: ["/images/forces/navy1.jpg", "/images/forces/navy2.jpg"],
        requirements: {
          age: { min: 16, max: 22 },
          education: ["10+2", "Graduation"],
          physicalStandards: ["Height: 157cm minimum", "Weight: Proportionate to height"],
          medicalStandards: ["Medical Category A", "Good eyesight"]
        }
      },
      {
        name: "Indian Air Force",
        type: "Air Force",
        description: "The air arm of the Indian Armed Forces.",
        headquarters: "New Delhi",
        establishedYear: 1932,
        strength: 140000,
        logo: "/images/forces/airforce-logo.png",
        images: ["/images/forces/airforce1.jpg", "/images/forces/airforce2.jpg"],
        requirements: {
          age: { min: 16, max: 23 },
          education: ["10+2", "Graduation"],
          physicalStandards: ["Height: 162cm minimum", "Weight: Proportionate to height"],
          medicalStandards: ["Medical Category A", "Perfect eyesight"]
        }
      },
      {
        name: "Central Reserve Police Force",
        type: "Paramilitary",
        description: "India's largest Central Armed Police Force.",
        headquarters: "New Delhi",
        establishedYear: 1939,
        strength: 300000,
        logo: "/images/forces/crpf-logo.png",
        images: ["/images/forces/crpf1.jpg", "/images/forces/crpf2.jpg"],
        requirements: {
          age: { min: 18, max: 25 },
          education: ["10+2", "Graduation"],
          physicalStandards: ["Height: 165cm minimum", "Weight: Proportionate to height"],
          medicalStandards: ["Medical Category A", "Good eyesight"]
        }
      },
      {
        name: "Delhi Police",
        type: "Police",
        description: "Law enforcement agency for the National Capital Territory of Delhi.",
        headquarters: "New Delhi",
        establishedYear: 1861,
        strength: 85000,
        logo: "/images/forces/delhi-police-logo.png",
        images: ["/images/forces/police1.jpg", "/images/forces/police2.jpg"],
        requirements: {
          age: { min: 18, max: 27 },
          education: ["10+2", "Graduation"],
          physicalStandards: ["Height: 170cm minimum", "Weight: Proportionate to height"],
          medicalStandards: ["Medical Category A", "Good eyesight"]
        }
      }
    ]);
    console.log('✅ Forces created successfully');

    console.log('🏛️ Creating academies...');
    const academies = await Academy.insertMany([
      {
        name: "Surya Defence Academy - Delhi",
        code: "SDA-DEL",
        description: "Premier defence coaching institute in Delhi offering comprehensive preparation for all defence examinations.",
        location: {
          address: "123, Defence Colony, New Delhi",
          city: "Delhi",
          state: "Delhi",
          pincode: "110024",
          coordinates: { latitude: 28.6139, longitude: 77.2090 }
        },
        contact: {
          phone: "+91-11-45678901",
          email: "delhi@suryadefenceacademy.com",
          website: "www.suryadefenceacademy.com"
        },
        facilities: ["Smart Classrooms", "Library", "Computer Lab", "Physical Training Ground", "Hostel", "Cafeteria"],
        capacity: 500,
        establishedYear: 2010,
        images: ["/images/academies/delhi1.jpg", "/images/academies/delhi2.jpg"],
        rating: 4.8
      },
      {
        name: "Surya Defence Academy - Mumbai",
        code: "SDA-MUM",
        description: "Leading defence coaching center in Mumbai with state-of-the-art facilities.",
        location: {
          address: "456, Marine Drive, Mumbai",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400002",
          coordinates: { latitude: 19.0760, longitude: 72.8777 }
        },
        contact: {
          phone: "+91-22-45678902",
          email: "mumbai@suryadefenceacademy.com",
          website: "www.suryadefenceacademy.com"
        },
        facilities: ["Smart Classrooms", "Library", "Computer Lab", "Physical Training Ground", "Hostel", "Cafeteria"],
        capacity: 400,
        establishedYear: 2012,
        images: ["/images/academies/mumbai1.jpg", "/images/academies/mumbai2.jpg"],
        rating: 4.7
      },
      {
        name: "Surya Defence Academy - Bangalore",
        code: "SDA-BLR",
        description: "Excellence in defence coaching with modern infrastructure in Bangalore.",
        location: {
          address: "789, MG Road, Bangalore",
          city: "Bangalore",
          state: "Karnataka",
          pincode: "560001",
          coordinates: { latitude: 12.9716, longitude: 77.5946 }
        },
        contact: {
          phone: "+91-80-45678903",
          email: "bangalore@suryadefenceacademy.com",
          website: "www.suryadefenceacademy.com"
        },
        facilities: ["Smart Classrooms", "Library", "Computer Lab", "Physical Training Ground", "Hostel", "Cafeteria"],
        capacity: 350,
        establishedYear: 2015,
        images: ["/images/academies/bangalore1.jpg", "/images/academies/bangalore2.jpg"],
        rating: 4.6
      }
    ]);
    console.log('✅ Academies created successfully');

    console.log('🎓 Creating schools...');
    const schools = await School.insertMany([
      {
        name: "National Defence Academy",
        type: "Army",
        description: "Joint services academy of the Indian Armed Forces.",
        location: {
          address: "NDA Road, Khadakwasla, Pune",
          city: "Pune",
          state: "Maharashtra",
          pincode: "411023"
        },
        contact: {
          phone: "+91-20-25694000",
          email: "nda@nic.in",
          website: "www.nda.nic.in"
        },
        establishedYear: 1954,
        images: ["/images/schools/nda1.jpg", "/images/schools/nda2.jpg"]
      },
      {
        name: "Indian Military Academy",
        type: "Army",
        description: "Officer training academy of the Indian Army.",
        location: {
          address: "IMA Road, Dehradun",
          city: "Dehradun",
          state: "Uttarakhand",
          pincode: "248007"
        },
        contact: {
          phone: "+91-135-2744444",
          email: "ima@nic.in",
          website: "www.ima.gov.in"
        },
        establishedYear: 1932,
        images: ["/images/schools/ima1.jpg", "/images/schools/ima2.jpg"]
      },
      {
        name: "Indian Naval Academy",
        type: "Navy",
        description: "Officer training academy of the Indian Navy.",
        location: {
          address: "Ezhimala, Kannur",
          city: "Kannur",
          state: "Kerala",
          pincode: "670310"
        },
        contact: {
          phone: "+91-497-2700000",
          email: "ina@nic.in",
          website: "www.ina.gov.in"
        },
        establishedYear: 2009,
        images: ["/images/schools/ina1.jpg", "/images/schools/ina2.jpg"]
      },
      {
        name: "Air Force Academy",
        type: "Air Force",
        description: "Officer training academy of the Indian Air Force.",
        location: {
          address: "Dundigal, Hyderabad",
          city: "Hyderabad",
          state: "Telangana",
          pincode: "500043"
        },
        contact: {
          phone: "+91-40-23400000",
          email: "afa@nic.in",
          website: "www.afa.gov.in"
        },
        establishedYear: 1971,
        images: ["/images/schools/afa1.jpg", "/images/schools/afa2.jpg"]
      }
    ]);
    console.log('✅ Schools created successfully');

    console.log('📚 Creating comprehensive courses...');
    const courses = await Course.insertMany([
      {
        name: "NDA Foundation Course",
        code: "NDA-FND",
        type: "Army",
        category: "Foundation",
        description: "Comprehensive foundation course for NDA entrance examination preparation.",
        duration: { months: 12, hours: 1200 },
        fee: { amount: 75000, currency: "INR", installment: true, discount: 10 },
        examPattern: {
          mode: "Online/Offline",
          duration: 150,
          totalQuestions: 150,
          totalMarks: 300,
          subjects: [
            { 
              name: "Mathematics", 
              questions: 100, 
              marks: 100,
              topics: ["Algebra", "Trigonometry", "Calculus", "Geometry", "Statistics"]
            },
            { 
              name: "General Ability", 
              questions: 50, 
              marks: 200,
              topics: ["English", "General Knowledge", "Current Affairs", "Science"]
            }
          ],
          markingScheme: { correct: 2, incorrect: 0.66 },
          passingMarks: 180,
          negativeMarking: true
        },
        eligibility: {
          education: "10+2 or equivalent",
          age: { min: 16, max: 19 },
          physicalRequirements: ["Height: 157cm minimum", "Weight: Proportionate to height"],
          medicalRequirements: ["Medical Category A", "Good eyesight"],
          nationality: ["Indian"]
        },
        syllabus: [
          { subject: "Mathematics", topics: ["Algebra", "Trigonometry", "Calculus", "Geometry", "Statistics"], weightage: 40 },
          { subject: "English", topics: ["Grammar", "Vocabulary", "Comprehension", "Essay Writing"], weightage: 20 },
          { subject: "General Knowledge", topics: ["History", "Geography", "Polity", "Economics"], weightage: 25 },
          { subject: "Science", topics: ["Physics", "Chemistry", "Biology"], weightage: 15 }
        ],
        features: ["Expert Faculty", "Mock Tests", "Study Material", "Doubt Sessions", "Physical Training"],
        highlights: ["100% Syllabus Coverage", "Regular Mock Tests", "Personal Mentoring", "Physical Fitness Training"],
        careerProspects: ["NDA Officer", "Army Officer", "Navy Officer", "Air Force Officer"],
        successRate: 85,
        isPopular: true,
        isFeatured: true,
        images: ["/images/courses/nda-foundation1.jpg", "/images/courses/nda-foundation2.jpg"],
        brochure: "/brochures/nda-foundation.pdf",
        lastUpdated: new Date(),
        updatedBy: adminUser._id
      },
      {
        name: "CDS/OTA Preparation",
        code: "CDS-OTA",
        type: "Army",
        category: "Intermediate",
        description: "Specialized coaching for Combined Defence Services and Officer Training Academy.",
        duration: { months: 8, hours: 800 },
        fee: { amount: 60000, currency: "INR", installment: true, discount: 5 },
        examPattern: {
          mode: "Online/Offline",
          duration: 180,
          totalQuestions: 120,
          totalMarks: 300,
          subjects: [
            { 
              name: "English", 
              questions: 120, 
              marks: 100,
              topics: ["Grammar", "Vocabulary", "Comprehension", "Essay Writing"]
            },
            { 
              name: "General Knowledge", 
              questions: 120, 
              marks: 100,
              topics: ["History", "Geography", "Polity", "Economics", "Current Affairs"]
            },
            { 
              name: "Elementary Mathematics", 
              questions: 100, 
              marks: 100,
              topics: ["Algebra", "Trigonometry", "Calculus", "Geometry"]
            }
          ],
          markingScheme: { correct: 2.5, incorrect: 0.83 },
          passingMarks: 150,
          negativeMarking: true
        },
        eligibility: {
          education: "Bachelor's degree",
          age: { min: 19, max: 25 },
          physicalRequirements: ["Height: 157cm minimum", "Weight: Proportionate to height"],
          medicalRequirements: ["Medical Category A", "Good eyesight"],
          nationality: ["Indian"]
        },
        syllabus: [
          { subject: "English", topics: ["Grammar", "Vocabulary", "Comprehension", "Essay Writing"], weightage: 33 },
          { subject: "General Knowledge", topics: ["History", "Geography", "Polity", "Economics", "Current Affairs"], weightage: 33 },
          { subject: "Mathematics", topics: ["Algebra", "Trigonometry", "Calculus", "Geometry"], weightage: 34 }
        ],
        features: ["Expert Faculty", "Mock Tests", "Study Material", "Doubt Sessions", "Interview Preparation"],
        highlights: ["Comprehensive Coverage", "Regular Mock Tests", "Interview Guidance", "Physical Training"],
        careerProspects: ["Army Officer", "Navy Officer", "Air Force Officer"],
        successRate: 78,
        isPopular: true,
        images: ["/images/courses/cds-ota1.jpg", "/images/courses/cds-ota2.jpg"],
        brochure: "/brochures/cds-ota.pdf",
        lastUpdated: new Date(),
        updatedBy: adminUser._id
      },
      {
        name: "AFCAT Preparation",
        code: "AFCAT",
        type: "Air Force",
        category: "Intermediate",
        description: "Comprehensive preparation for Air Force Common Admission Test.",
        duration: { months: 6, hours: 600 },
        fee: { amount: 45000, currency: "INR", installment: true, discount: 8 },
        examPattern: {
          mode: "Online/Offline",
          duration: 120,
          totalQuestions: 100,
          totalMarks: 300,
          subjects: [
            { 
              name: "General Awareness", 
              questions: 100, 
              marks: 100,
              topics: ["History", "Geography", "Polity", "Economics", "Current Affairs"]
            },
            { 
              name: "Verbal Ability", 
              questions: 100, 
              marks: 100,
              topics: ["English Grammar", "Vocabulary", "Comprehension"]
            },
            { 
              name: "Numerical Ability", 
              questions: 100, 
              marks: 100,
              topics: ["Arithmetic", "Algebra", "Geometry", "Trigonometry"]
            }
          ],
          markingScheme: { correct: 3, incorrect: 1 },
          passingMarks: 120,
          negativeMarking: true
        },
        eligibility: {
          education: "Graduation with 60% marks",
          age: { min: 20, max: 24 },
          physicalRequirements: ["Height: 162cm minimum", "Weight: Proportionate to height"],
          medicalRequirements: ["Medical Category A", "Perfect eyesight"],
          nationality: ["Indian"]
        },
        syllabus: [
          { subject: "General Awareness", topics: ["History", "Geography", "Polity", "Economics", "Current Affairs"], weightage: 33 },
          { subject: "Verbal Ability", topics: ["English Grammar", "Vocabulary", "Comprehension"], weightage: 33 },
          { subject: "Numerical Ability", topics: ["Arithmetic", "Algebra", "Geometry", "Trigonometry"], weightage: 34 }
        ],
        features: ["Expert Faculty", "Mock Tests", "Study Material", "Doubt Sessions", "Physical Training"],
        highlights: ["Air Force Specific", "Regular Mock Tests", "Physical Fitness", "Technical Knowledge"],
        careerProspects: ["Air Force Officer", "Technical Officer", "Ground Duty Officer"],
        successRate: 72,
        isPopular: true,
        images: ["/images/courses/afcat1.jpg", "/images/courses/afcat2.jpg"],
        brochure: "/brochures/afcat.pdf",
        lastUpdated: new Date(),
        updatedBy: adminUser._id
      },
      {
        name: "CRPF Constable Preparation",
        code: "CRPF-CON",
        type: "Paramilitary",
        category: "Foundation",
        description: "Complete preparation for CRPF Constable recruitment examination.",
        duration: { months: 4, hours: 400 },
        fee: { amount: 25000, currency: "INR", installment: true, discount: 15 },
        examPattern: {
          mode: "Online/Offline",
          duration: 90,
          totalQuestions: 100,
          totalMarks: 100,
          subjects: [
            { 
              name: "General Knowledge", 
              questions: 100, 
              marks: 100,
              topics: ["Current Affairs", "History", "Geography", "Polity", "Economics"]
            }
          ],
          markingScheme: { correct: 1, incorrect: 0.25 },
          passingMarks: 35,
          negativeMarking: true
        },
        eligibility: {
          education: "10+2 or equivalent",
          age: { min: 18, max: 25 },
          physicalRequirements: ["Height: 165cm minimum", "Weight: Proportionate to height"],
          medicalRequirements: ["Medical Category A", "Good eyesight"],
          nationality: ["Indian"]
        },
        syllabus: [
          { subject: "General Knowledge", topics: ["Current Affairs", "History", "Geography", "Polity", "Economics"], weightage: 100 }
        ],
        features: ["Expert Faculty", "Mock Tests", "Study Material", "Physical Training", "Medical Guidance"],
        highlights: ["Complete Syllabus", "Physical Training", "Medical Preparation", "Mock Tests"],
        careerProspects: ["CRPF Constable", "Paramilitary Force", "Security Personnel"],
        successRate: 88,
        isPopular: false,
        images: ["/images/courses/crpf1.jpg", "/images/courses/crpf2.jpg"],
        brochure: "/brochures/crpf-constable.pdf",
        lastUpdated: new Date(),
        updatedBy: adminUser._id
      },
      {
        name: "Delhi Police Constable",
        code: "DP-CON",
        type: "Police",
        category: "Foundation",
        description: "Comprehensive preparation for Delhi Police Constable recruitment.",
        duration: { months: 3, hours: 300 },
        fee: { amount: 20000, currency: "INR", installment: true, discount: 20 },
        examPattern: {
          mode: "Online/Offline",
          duration: 90,
          totalQuestions: 100,
          totalMarks: 100,
          subjects: [
            { 
              name: "General Knowledge", 
              questions: 100, 
              marks: 100,
              topics: ["Current Affairs", "History", "Geography", "Polity", "Economics"]
            }
          ],
          markingScheme: { correct: 1, incorrect: 0.25 },
          passingMarks: 35,
          negativeMarking: true
        },
        eligibility: {
          education: "10+2 or equivalent",
          age: { min: 18, max: 27 },
          physicalRequirements: ["Height: 170cm minimum", "Weight: Proportionate to height"],
          medicalRequirements: ["Medical Category A", "Good eyesight"],
          nationality: ["Indian"]
        },
        syllabus: [
          { subject: "General Knowledge", topics: ["Current Affairs", "History", "Geography", "Polity", "Economics"], weightage: 100 }
        ],
        features: ["Expert Faculty", "Mock Tests", "Study Material", "Physical Training", "Medical Guidance"],
        highlights: ["Delhi Specific", "Physical Training", "Medical Preparation", "Mock Tests"],
        careerProspects: ["Delhi Police Constable", "Law Enforcement", "Security Personnel"],
        successRate: 82,
        isPopular: false,
        images: ["/images/courses/delhi-police1.jpg", "/images/courses/delhi-police2.jpg"],
        brochure: "/brochures/delhi-police.pdf",
        lastUpdated: new Date(),
        updatedBy: adminUser._id
      },
      {
        name: "SSC GD Constable",
        code: "SSC-GD",
        type: "Paramilitary",
        category: "Foundation",
        description: "Preparation for Staff Selection Commission General Duty Constable examination.",
        duration: { months: 4, hours: 400 },
        fee: { amount: 30000, currency: "INR", installment: true, discount: 12 },
        examPattern: {
          mode: "Online/Offline",
          duration: 90,
          totalQuestions: 100,
          totalMarks: 100,
          subjects: [
            { 
              name: "General Knowledge", 
              questions: 100, 
              marks: 100,
              topics: ["Current Affairs", "History", "Geography", "Polity", "Economics"]
            }
          ],
          markingScheme: { correct: 1, incorrect: 0.25 },
          passingMarks: 35,
          negativeMarking: true
        },
        eligibility: {
          education: "10+2 or equivalent",
          age: { min: 18, max: 25 },
          physicalRequirements: ["Height: 165cm minimum", "Weight: Proportionate to height"],
          medicalRequirements: ["Medical Category A", "Good eyesight"],
          nationality: ["Indian"]
        },
        syllabus: [
          { subject: "General Knowledge", topics: ["Current Affairs", "History", "Geography", "Polity", "Economics"], weightage: 100 }
        ],
        features: ["Expert Faculty", "Mock Tests", "Study Material", "Physical Training", "Medical Guidance"],
        highlights: ["SSC Pattern", "Physical Training", "Medical Preparation", "Mock Tests"],
        careerProspects: ["SSC GD Constable", "Paramilitary Force", "Security Personnel"],
        successRate: 85,
        isPopular: true,
        images: ["/images/courses/ssc-gd1.jpg", "/images/courses/ssc-gd2.jpg"],
        brochure: "/brochures/ssc-gd.pdf",
        lastUpdated: new Date(),
        updatedBy: adminUser._id
      }
    ]);
    console.log('✅ Courses created successfully');

    console.log('🔍 Creating database indexes...');
    await User.collection.createIndex({ "email": 1 }, { unique: true });
    await User.collection.createIndex({ "username": 1 }, { unique: true });
    await Academy.collection.createIndex({ "code": 1 }, { unique: true });
    await Academy.collection.createIndex({ "location.city": 1 });
    await School.collection.createIndex({ "name": 1 });
    await School.collection.createIndex({ "type": 1 });
    await Force.collection.createIndex({ "name": 1 });
    await Force.collection.createIndex({ "type": 1 });
    await Course.collection.createIndex({ "code": 1 }, { unique: true });
    await Course.collection.createIndex({ "name": 1 });
    await Course.collection.createIndex({ "type": 1 });
    await Course.collection.createIndex({ "category": 1 });
    await Course.collection.createIndex({ "isPopular": 1 });
    await Course.collection.createIndex({ "isFeatured": 1 });
    console.log('✅ Indexes created successfully');

    console.log('\n🎉 === DATABASE SETUP COMPLETE ===');
    console.log(`👥 Users: ${await User.countDocuments()} documents`);
    console.log(`🏛️ Academies: ${await Academy.countDocuments()} documents`);
    console.log(`🎓 Schools: ${await School.countDocuments()} documents`);
    console.log(`🛡️ Forces: ${await Force.countDocuments()} documents`);
    console.log(`📖 Courses: ${await Course.countDocuments()} documents`);
    console.log('🔑 Admin Login: admin@suryadefenceacademy.com (password: Admin@123)');
    console.log('✅ Database setup completed successfully!');
    console.log('🌐 Your MongoDB Atlas database is now online and ready to use!');

  } catch (error) {
    console.error('❌ Error during database setup:', error.message);
    
    if (error.name === 'MongoNetworkError') {
      console.error('🔌 Network Error: Please check your internet connection and MongoDB Atlas cluster status');
    } else if (error.name === 'MongoServerSelectionError') {
      console.error('🌐 Server Selection Error: Unable to connect to MongoDB Atlas cluster');
    } else if (error.name === 'MongoParseError') {
      console.error('🔗 Connection String Error: Please check your MongoDB connection string');
    } else if (error.name === 'AuthenticationFailed') {
      console.error('🔐 Authentication Error: Please check your MongoDB Atlas username and password');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await mongoose.disconnect();
      console.log('🔌 Disconnected from MongoDB Atlas');
    }
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT, shutting down gracefully...');
  await mongoose.disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  await mongoose.disconnect();
  process.exit(0);
});

// Start
console.log('🚀 Starting MongoDB Atlas setup...');
setupDatabase();