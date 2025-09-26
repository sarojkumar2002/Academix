import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import { Course } from '../models/course.model.js';
import { User } from '../models/user.model.js';
import { Lecture } from '../models/lecture.model.js';
import connectDB from '../database/db.js';
import dotenv from 'dotenv';

dotenv.config();

const seedCourses = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Connect to database
        await connectDB();

        // Clear existing data
        console.log('🧹 Clearing existing data...');
        await Course.deleteMany({});
        await Lecture.deleteMany({});

        // Create instructor user if doesn't exist
        let instructor = await User.findOne({ email: 'sarojkumarnainbigha@gmail.com' });
        console.log('🔍 Checking for existing instructor user...', instructor);
        if (!instructor) {
            console.log('👨‍🏫 Creating instructor user...');
            const hashedPassword = await bcryptjs.hash('saroj', 10);
            instructor = await User.create({
                name: 'Saroj Kumar',
                email: 'saroj@gmail.com',
                password: hashedPassword,
                role: 'instructor',
                photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
            });
        }

        console.log('📚 Creating courses with lectures...');

        // Course 1: Python Programming
        const pythonLectures = await Lecture.insertMany([
            { lectureTitle: 'Introduction to Python', isPreviewFree: true },
            { lectureTitle: 'Variables and Data Types', isPreviewFree: true },
            { lectureTitle: 'Control Structures', isPreviewFree: false },
            { lectureTitle: 'Functions and Modules', isPreviewFree: false },
            { lectureTitle: 'Object-Oriented Programming', isPreviewFree: false }
        ]);

        const pythonCourse = await Course.create({
            courseTitle: 'Complete Python Programming Course',
            subTitle: 'Master Python from basics to advanced concepts',
            description: 'Learn Python programming from scratch with hands-on projects. This comprehensive course covers variables, data types, control structures, functions, OOP, and more. Perfect for beginners and intermediate developers.',
            category: 'Programming',
            courseLevel: 'Beginner',
            coursePrice: 499.99,
            courseThumbnail: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop',
            lectures: pythonLectures.map(lecture => lecture._id),
            creator: instructor._id,
            isPublished: true
        });

        // Course 2: Java Programming
        const javaLectures = await Lecture.insertMany([
            { lectureTitle: 'Getting Started with Java', isPreviewFree: true },
            { lectureTitle: 'Java Syntax and Basics', isPreviewFree: true },
            { lectureTitle: 'Classes and Objects', isPreviewFree: false },
            { lectureTitle: 'Inheritance and Polymorphism', isPreviewFree: false },
            { lectureTitle: 'Exception Handling', isPreviewFree: false }
        ]);

        const javaCourse = await Course.create({
            courseTitle: 'Java Programming Masterclass',
            subTitle: 'Complete Java development from beginner to expert',
            description: 'Master Java programming with real-world projects. Learn OOP concepts, exception handling, collections, and build enterprise-level applications.',
            category: 'Programming',
            courseLevel: 'Medium',
            coursePrice: 599,
            courseThumbnail: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop',
            lectures: javaLectures.map(lecture => lecture._id),
            creator: instructor._id,
            isPublished: true
        });

        // Course 3: Data Structures and Algorithms
        const dsaLectures = await Lecture.insertMany([
            { lectureTitle: 'Introduction to DSA', isPreviewFree: true },
            { lectureTitle: 'Arrays and Strings', isPreviewFree: true },
            { lectureTitle: 'Linked Lists', isPreviewFree: false },
            { lectureTitle: 'Stacks and Queues', isPreviewFree: false },
            { lectureTitle: 'Trees and Graphs', isPreviewFree: false },
            { lectureTitle: 'Sorting Algorithms', isPreviewFree: false },
            { lectureTitle: 'Dynamic Programming', isPreviewFree: false }
        ]);

        const dsaCourse = await Course.create({
            courseTitle: 'Data Structures & Algorithms Complete Course',
            subTitle: 'Master problem-solving with DSA',
            description: 'Comprehensive course on data structures and algorithms. Learn arrays, linked lists, trees, graphs, sorting, searching, and dynamic programming with coding practice.',
            category: 'Computer Science',
            courseLevel: 'Medium',
            coursePrice: 799.99,
            courseThumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
            lectures: dsaLectures.map(lecture => lecture._id),
            creator: instructor._id,
            isPublished: true
        });

        // Course 4: English Communication
        const englishLectures = await Lecture.insertMany([
            { lectureTitle: 'Basic Grammar Rules', isPreviewFree: true },
            { lectureTitle: 'Vocabulary Building', isPreviewFree: true },
            { lectureTitle: 'Speaking Confidently', isPreviewFree: false },
            { lectureTitle: 'Writing Skills', isPreviewFree: false },
            { lectureTitle: 'Business English', isPreviewFree: false }
        ]);

        const englishCourse = await Course.create({
            courseTitle: 'English Communication Mastery',
            subTitle: 'Improve your English speaking and writing skills',
            description: 'Enhance your English communication skills for personal and professional growth. Learn grammar, vocabulary, speaking techniques, and business English.',
            category: 'Language',
            courseLevel: 'Beginner',
            coursePrice: 399.99,
            courseThumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
            lectures: englishLectures.map(lecture => lecture._id),
            creator: instructor._id,
            isPublished: true
        });

        // Course 5: JavaScript Development
        const jsLectures = await Lecture.insertMany([
            { lectureTitle: 'JavaScript Fundamentals', isPreviewFree: true },
            { lectureTitle: 'DOM Manipulation', isPreviewFree: true },
            { lectureTitle: 'ES6+ Features', isPreviewFree: false },
            { lectureTitle: 'Async JavaScript', isPreviewFree: false },
            { lectureTitle: 'Building Projects', isPreviewFree: false }
        ]);

        const jsCourse = await Course.create({
            courseTitle: 'Modern JavaScript Development',
            subTitle: 'Master JavaScript for web development',
            description: 'Learn modern JavaScript from basics to advanced concepts. Master ES6+, async programming, DOM manipulation, and build real-world projects.',
            category: 'Programming',
            courseLevel: 'Medium',
            coursePrice: 549.99,
            courseThumbnail: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=300&fit=crop',
            lectures: jsLectures.map(lecture => lecture._id),
            creator: instructor._id,
            isPublished: true
        });

        // Course 6: React.js Development
        const reactLectures = await Lecture.insertMany([
            { lectureTitle: 'React Fundamentals', isPreviewFree: true },
            { lectureTitle: 'Components and Props', isPreviewFree: true },
            { lectureTitle: 'State Management', isPreviewFree: false },
            { lectureTitle: 'React Hooks', isPreviewFree: false },
            { lectureTitle: 'Building Full Applications', isPreviewFree: false }
        ]);

        const reactCourse = await Course.create({
            courseTitle: 'React.js Complete Development Course',
            subTitle: 'Build modern web applications with React',
            description: 'Master React.js development from beginner to advanced. Learn components, hooks, state management, and build production-ready applications.',
            category: 'Web Development',
            courseLevel: 'Medium',
            coursePrice: 299.99,
            courseThumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
            lectures: reactLectures.map(lecture => lecture._id),
            creator: instructor._id,
            isPublished: true
        });

        // Course 7: Machine Learning Basics
        const mlLectures = await Lecture.insertMany([
            { lectureTitle: 'Introduction to ML', isPreviewFree: true },
            { lectureTitle: 'Supervised Learning', isPreviewFree: true },
            { lectureTitle: 'Unsupervised Learning', isPreviewFree: false },
            { lectureTitle: 'Neural Networks', isPreviewFree: false },
            { lectureTitle: 'Model Evaluation', isPreviewFree: false }
        ]);

        const mlCourse = await Course.create({
            courseTitle: 'Machine Learning Fundamentals',
            subTitle: 'Start your AI journey with ML basics',
            description: 'Introduction to machine learning concepts, algorithms, and practical applications. Learn supervised and unsupervised learning with hands-on projects.',
            category: 'Data Science',
            courseLevel: 'Medium',
            coursePrice: 899.99,
            courseThumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop',
            lectures: mlLectures.map(lecture => lecture._id),
            creator: instructor._id,
            isPublished: true
        });

        // Course 8: Digital Marketing
        const marketingLectures = await Lecture.insertMany([
            { lectureTitle: 'Digital Marketing Overview', isPreviewFree: true },
            { lectureTitle: 'SEO Fundamentals', isPreviewFree: true },
            { lectureTitle: 'Social Media Marketing', isPreviewFree: false },
            { lectureTitle: 'Content Marketing', isPreviewFree: false },
            { lectureTitle: 'Analytics and ROI', isPreviewFree: false }
        ]);

        const marketingCourse = await Course.create({
            courseTitle: 'Complete Digital Marketing Course',
            subTitle: 'Master online marketing strategies',
            description: 'Comprehensive digital marketing course covering SEO, social media, content marketing, PPC, and analytics. Perfect for business owners and marketers.',
            category: 'Marketing',
            courseLevel: 'Beginner',
            coursePrice: 449.99,
            courseThumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
            lectures: marketingLectures.map(lecture => lecture._id),
            creator: instructor._id,
            isPublished: true
        });

        // Course 9: Node.js Backend Development
        const nodeLectures = await Lecture.insertMany([
            { lectureTitle: 'Node.js Introduction', isPreviewFree: true },
            { lectureTitle: 'Express.js Framework', isPreviewFree: true },
            { lectureTitle: 'Database Integration', isPreviewFree: false },
            { lectureTitle: 'API Development', isPreviewFree: false },
            { lectureTitle: 'Authentication & Security', isPreviewFree: false }
        ]);

        const nodeCourse = await Course.create({
            courseTitle: 'Node.js Backend Development',
            subTitle: 'Build scalable server-side applications',
            description: 'Learn Node.js backend development with Express.js, MongoDB, authentication, and API development. Build production-ready server applications.',
            category: 'Backend Development',
            courseLevel: 'Medium',
            coursePrice: 649.99,
            courseThumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop',
            lectures: nodeLectures.map(lecture => lecture._id),
            creator: instructor._id,
            isPublished: true
        });

        // Course 10: CSS & Web Design
        const cssLectures = await Lecture.insertMany([
            { lectureTitle: 'CSS Fundamentals', isPreviewFree: true },
            { lectureTitle: 'Responsive Design', isPreviewFree: true },
            { lectureTitle: 'Flexbox & Grid', isPreviewFree: false },
            { lectureTitle: 'Animations & Transitions', isPreviewFree: false },
            { lectureTitle: 'Modern CSS Techniques', isPreviewFree: false }
        ]);

        const cssCourse = await Course.create({
            courseTitle: 'Advanced CSS & Web Design',
            subTitle: 'Create stunning responsive websites',
            description: 'Master CSS and web design principles. Learn responsive design, Flexbox, Grid, animations, and modern CSS techniques to create beautiful websites.',
            category: 'Web Design',
            courseLevel: 'Medium',
            coursePrice: 499.99,
            courseThumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
            lectures: cssLectures.map(lecture => lecture._id),
            creator: instructor._id,
            isPublished: true
        });

        // Course 11: Database Management
        const dbLectures = await Lecture.insertMany([
            { lectureTitle: 'Database Fundamentals', isPreviewFree: true },
            { lectureTitle: 'SQL Basics', isPreviewFree: true },
            { lectureTitle: 'Advanced SQL Queries', isPreviewFree: false },
            { lectureTitle: 'Database Design', isPreviewFree: false },
            { lectureTitle: 'NoSQL Databases', isPreviewFree: false }
        ]);

        const dbCourse = await Course.create({
            courseTitle: 'Database Management Systems',
            subTitle: 'Master SQL and database design',
            description: 'Comprehensive course on database management covering SQL, database design, optimization, and both relational and NoSQL databases.',
            category: 'Database',
            courseLevel: 'Medium',
            coursePrice: 599.99,
            courseThumbnail: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop',
            lectures: dbLectures.map(lecture => lecture._id),
            creator: instructor._id,
            isPublished: true
        });

        // Course 12: Cybersecurity Fundamentals
        const securityLectures = await Lecture.insertMany([
            { lectureTitle: 'Cybersecurity Introduction', isPreviewFree: true },
            { lectureTitle: 'Network Security', isPreviewFree: true },
            { lectureTitle: 'Encryption & Cryptography', isPreviewFree: false },
            { lectureTitle: 'Ethical Hacking Basics', isPreviewFree: false },
            { lectureTitle: 'Security Best Practices', isPreviewFree: false }
        ]);

        const securityCourse = await Course.create({
            courseTitle: 'Cybersecurity Fundamentals',
            subTitle: 'Learn to protect digital assets',
            description: 'Introduction to cybersecurity concepts, network security, encryption, ethical hacking, and security best practices for individuals and organizations.',
            category: 'Security',
            courseLevel: 'Beginner',
            coursePrice: 749.99,
            courseThumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop',
            lectures: securityLectures.map(lecture => lecture._id),
            creator: instructor._id,
            isPublished: true
        });

        console.log('✅ Successfully seeded database with 12 courses!');
        console.log(`📊 Created courses:`);
        console.log(`   - ${pythonCourse.courseTitle}`);
        console.log(`   - ${javaCourse.courseTitle}`);
        console.log(`   - ${dsaCourse.courseTitle}`);
        console.log(`   - ${englishCourse.courseTitle}`);
        console.log(`   - ${jsCourse.courseTitle}`);
        console.log(`   - ${reactCourse.courseTitle}`);
        console.log(`   - ${mlCourse.courseTitle}`);
        console.log(`   - ${marketingCourse.courseTitle}`);
        console.log(`   - ${nodeCourse.courseTitle}`);
        console.log(`   - ${cssCourse.courseTitle}`);
        console.log(`   - ${dbCourse.courseTitle}`);
        console.log(`   - ${securityCourse.courseTitle}`);
        console.log(`👨‍🏫 Instructor: ${instructor.name} (${instructor.email})`);
        console.log('🎯 All courses are published and ready to use!');

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        mongoose.connection.close();
        console.log('🔌 Database connection closed.');
        process.exit(0);
    }
};

// Run the seeder
seedCourses();