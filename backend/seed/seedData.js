const Department = require('../models/Department');
const Faculty = require('../models/Faculty');
const FAQ = require('../models/FAQ');
const Event = require('../models/Event');
const Announcement = require('../models/Announcement');

const seedInitialData = async () => {
  try {
    // 0. Seed Users
    const User = require('../models/User');
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      // Create Super Admin
      await User.create({
        name: 'System Administrator',
        email: 'admin@skillforge.edu',
        password: 'password123',
        role: 'super_admin',
        department: 'Administration',
      });

      // Create Faculty
      await User.create({
        name: 'Dr. Rajesh Sharma',
        email: 'faculty@skillforge.edu',
        password: 'password123',
        role: 'faculty',
        department: 'Computer Science & Engineering',
        employeeId: 'FAC-001',
        qualification: 'Ph.D. (IIT Delhi)',
        experience: '22 Years',
      });

      // Create Student
      await User.create({
        name: 'Naveen Kumar',
        email: 'student@skillforge.edu',
        password: 'password123',
        role: 'student',
        department: 'Computer Science & Engineering',
        semester: 'Semester 3',
        rollNumber: 'ST-001',
        registrationNumber: 'REG-12001',
        phone: '9876543210',
        status: 'Active',
      });

      console.log('[Seed] Users (Super Admin, Faculty, Student) pre-populated successfully.');
    }

    // 1. Seed Departments
    const deptCount = await Department.countDocuments();
    if (deptCount === 0) {
      await Department.insertMany([
        {
          code: 'CSE',
          name: 'Computer Science & Engineering',
          category: 'Engineering',
          description: 'Pioneering artificial intelligence, cybersecurity, software engineering, and cloud computing research with state-of-the-art computational laboratories.',
          hod: 'Dr. Rajesh Sharma, Ph.D.',
          established: 1995,
          intake: 240,
          courses: ['B.Tech Computer Science', 'M.Tech Artificial Intelligence', 'Ph.D. Computer Science', 'B.Tech Data Science'],
          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
          iconName: 'Computer',
        },
        {
          code: 'ECE',
          name: 'Electronics & Communication Engineering',
          category: 'Engineering',
          description: 'Fostering innovation in microelectronics, VLSI design, embedded IoT systems, robotics, and next-generation 5G/6G wireless networks.',
          hod: 'Dr. Ananya Roy, Ph.D.',
          established: 1997,
          intake: 180,
          courses: ['B.Tech Electronics & Communication', 'M.Tech VLSI & Embedded Systems', 'Ph.D. Telecommunication'],
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          iconName: 'Memory',
        },
        {
          code: 'MECH',
          name: 'Mechanical & Automation Engineering',
          category: 'Engineering',
          description: 'Focusing on smart manufacturing, renewable energy systems, mechatronics, automotive engineering, and advanced materials science.',
          hod: 'Dr. Vikramaditya Singh, Ph.D.',
          established: 1992,
          intake: 120,
          courses: ['B.Tech Mechanical Engineering', 'M.Tech Robotics & Automation', 'Ph.D. Thermal & Energy Systems'],
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
          iconName: 'Engineering',
        },
        {
          code: 'MBA',
          name: 'School of Business & Management',
          category: 'Management',
          description: 'Equipping future global business leaders with strategic analytical thinking, financial tech insights, digital marketing, and entrepreneurial drive.',
          hod: 'Dr. Meera Iyer, Ph.D.',
          established: 2002,
          intake: 150,
          courses: ['MBA Finance & Business Analytics', 'MBA International Business', 'Executive MBA', 'Ph.D. Management'],
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
          iconName: 'BusinessCenter',
        },
        {
          code: 'PHYS',
          name: 'Department of Applied Sciences & Physics',
          category: 'Basic Sciences',
          description: 'Conducting advanced research in quantum mechanics, nanotechnology, photonics, and green energy materials.',
          hod: 'Dr. Suresh Nair, Ph.D.',
          established: 1990,
          intake: 60,
          courses: ['B.Sc Applied Physics', 'M.Sc Quantum Materials', 'Ph.D. Condensed Matter Physics'],
          image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80',
          iconName: 'Science',
        },
        {
          code: 'HUM',
          name: 'Department of Humanities & Social Sciences',
          category: 'Humanities',
          description: 'Enhancing technical education with critical thinking, organizational ethics, environmental studies, and global communication mastery.',
          hod: 'Dr. Kavita Deshmukh, Ph.D.',
          established: 1994,
          intake: 80,
          courses: ['B.A. Professional Communication', 'M.A. Digital Media & Ethics', 'Ph.D. Applied Psychology'],
          image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
          iconName: 'MenuBook',
        },
        {
          code: 'AIDS',
          name: 'Artificial Intelligence & Data Science',
          category: 'Engineering',
          description: 'Specializing in machine learning, deep learning, data analytics, computer vision, and intelligent system development.',
          hod: 'Dr. Priya Narayanan, Ph.D.',
          established: 2020,
          intake: 50,
          courses: ['B.Tech AI & Data Science', 'M.Tech Machine Learning', 'Ph.D. Artificial Intelligence'],
          image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=800&q=80',
          iconName: 'Computer',
        },
      ]);
      console.log('[Seed] Departments pre-populated successfully.');
    }

    // 2. Seed Faculty
    const facultyCount = await Faculty.countDocuments();
    if (facultyCount === 0) {
      await Faculty.insertMany([
        {
          name: 'Dr. Rajesh Sharma',
          title: 'Professor & Head of Department',
          department: 'Computer Science & Engineering',
          email: 'rajesh.sharma@edunova.edu',
          qualification: 'Ph.D. (IIT Delhi), M.Tech (IIT Bombay)',
          experience: '22 Years Tech Leadership & Research',
          specialization: 'Artificial Intelligence, Deep Learning & Distributed Systems',
          bio: 'Dr. Rajesh Sharma has published over 60 international journal papers and leads EduNova AI Research Lab.',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          publicationsCount: 64,
        },
        {
          name: 'Dr. Ananya Roy',
          title: 'Professor & HOD',
          department: 'Electronics & Communication Engineering',
          email: 'ananya.roy@edunova.edu',
          qualification: 'Ph.D. (IISc Bangalore), B.Tech (NIT Trichy)',
          experience: '18 Years Academic & Industrial R&D',
          specialization: 'VLSI Architecture, 5G Signal Processing & Smart Sensors',
          bio: 'Pioneer in low-power chip design, holding 4 international patents in micro-sensor technology.',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
          publicationsCount: 48,
        },
        {
          name: 'Dr. Vikramaditya Singh',
          title: 'Professor & HOD',
          department: 'Mechanical & Automation Engineering',
          email: 'vikram.singh@edunova.edu',
          qualification: 'Ph.D. (Imperial College London), M.S. (Purdue)',
          experience: '20 Years Mechanical R&D',
          specialization: 'Autonomous Robotics, Thermal Dynamics & Smart Materials',
          bio: 'He leads industrial consultancy projects for automotive giants and renewable energy consortiums.',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
          publicationsCount: 52,
        },
        {
          name: 'Dr. Meera Iyer',
          title: 'Professor & Dean of Management',
          department: 'School of Business & Management',
          email: 'meera.iyer@edunova.edu',
          qualification: 'Ph.D. (IIM Ahmedabad), MBA (London Business School)',
          experience: '16 Years Corporate & Academic Leadership',
          specialization: 'Corporate Strategy, Fintech Innovation & Organizational Behavior',
          bio: 'Dr. Meera Iyer serves as an independent board advisor and champion of women in leadership.',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
          publicationsCount: 39,
        },
        {
          name: 'Prof. Rahul Verma',
          title: 'Associate Professor',
          department: 'Computer Science & Engineering',
          email: 'rahul.verma@edunova.edu',
          qualification: 'Ph.D. (IIT Kharagpur)',
          experience: '12 Years Teaching & Cloud Engineering',
          specialization: 'Cybersecurity, Blockchain Technologies & Cloud Infrastructure',
          bio: 'Certified Cloud Architect and mentor for EduNova Hackathon winning teams.',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          publicationsCount: 29,
        },
        {
          name: 'Dr. Kavita Deshmukh',
          title: 'Professor & Head',
          department: 'Department of Humanities & Social Sciences',
          email: 'kavita.deshmukh@edunova.edu',
          qualification: 'Ph.D. (Oxford University), M.A. (JNU)',
          experience: '19 Years Ethics & Cultural Studies',
          specialization: 'Corporate Governance Ethics, Technical Communication & AI Policy',
          bio: 'Renowned author of 3 textbooks on tech ethics and human-computer society interaction.',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
          publicationsCount: 42,
        },
      ]);
      console.log('[Seed] Faculty pre-populated successfully.');
    }

    // 3. Seed FAQs
    const faqCount = await FAQ.countDocuments();
    if (faqCount === 0) {
      await FAQ.insertMany([
        {
          question: 'What are the admission requirements for B.Tech programs?',
          answer: 'Applicants must have passed 10+2 with Physics, Chemistry, and Mathematics with a minimum aggregate of 60%, along with valid entrance exam scores (JEE Main / EduNova Entrance Exam).',
          category: 'Admissions',
        },
        {
          question: 'Are merit-based scholarships available for students?',
          answer: 'Yes! EduNova College awards up to 100% tuition scholarships for national rank holders, top entrance scorers, and deserving merit-cum-means applicants.',
          category: 'Admissions',
        },
        {
          question: 'What is the attendance policy for undergraduate courses?',
          answer: 'Students are required to maintain a minimum of 75% attendance in both lectures and practical sessions to be eligible for end-semester examinations.',
          category: 'Academics',
        },
        {
          question: 'Does the college offer hostel accommodations?',
          answer: 'EduNova provides separate fully-furnished air-conditioned hostels for male and female students with 24/7 high-speed WiFi, security, laundry, and dining halls.',
          category: 'Hostel & Facilities',
        },
        {
          question: 'How is the placement record for graduating batches?',
          answer: 'Our placement cell achieves a 96%+ placement record annually with over 200+ tier-1 recruiting companies visiting campus, offering top packages up to ₹45 LPA.',
          category: 'Placements',
        },
        {
          question: 'How are end-semester grades evaluated?',
          answer: 'Evaluation is based on continuous assessment (40% weightage: quizzes, mid-terms, projects) and final end-semester examinations (60% weightage).',
          category: 'Examinations',
        },
      ]);
      console.log('[Seed] FAQs pre-populated successfully.');
    }

    // 4. Seed Events
    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.insertMany([
        {
          title: 'SkillHack 2026: National Hackathon',
          date: 'August 24-25, 2026',
          time: '09:00 AM - 05:00 PM',
          location: 'Central Auditorium & Innovation Center',
          category: 'Hackathon',
          description: '36-hour intense hackathon featuring $10,000 in prizes, industry mentors from top tech giants, and direct placement opportunities.',
          image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
        },
        {
          title: 'Global Tech & Innovation Symposium',
          date: 'September 10, 2026',
          time: '10:00 AM - 04:00 PM',
          location: 'EduNova Grand Conference Hall',
          category: 'Conference',
          description: 'Keynotes from international tech researchers discussing Generative AI, Sustainable Energy, and Micro-robotics.',
          image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
        },
        {
          title: 'Annual Cultural & Tech Festival: IGNITE 2026',
          date: 'October 15-17, 2026',
          time: '10:00 AM - 10:00 PM',
          location: 'Campus Open Air Theatre & Grounds',
          category: 'Cultural',
          description: 'Three days of music concerts, robotics wars, esports leagues, drama competitions, and food carnivals.',
          image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
        },
      ]);
      console.log('[Seed] Events pre-populated successfully.');
    }

    // 5. Seed Announcements
    const announcementCount = await Announcement.countDocuments();
    if (announcementCount === 0) {
      await Announcement.insertMany([
        {
          title: 'Autumn 2026 Examination Schedule Released',
          content: 'The end-semester exam timetable for all undergraduate and postgraduate programs is now published on the student portal.',
          date: 'July 28, 2026',
          priority: 'high',
          category: 'Academics',
        },
        {
          title: 'EduNova Research Grant Applications Open',
          content: 'Faculty and postgraduate students can submit research proposals for the annual internal research grant up to ₹5,000,000.',
          date: 'July 25, 2026',
          priority: 'medium',
          category: 'Research',
        },
        {
          title: 'Campus Internship Drive Phase 1',
          content: 'Over 45 companies will participate in the upcoming campus summer internship recruitment starting next week.',
          date: 'July 20, 2026',
          priority: 'high',
          category: 'Placements',
        },
      ]);
      console.log('[Seed] Announcements pre-populated successfully.');
    }
  } catch (err) {
    console.error('[Seed] Error seeding initial database:', err);
  }
};

module.exports = seedInitialData;
