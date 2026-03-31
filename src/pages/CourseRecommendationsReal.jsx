import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Star, 
  Clock, 
  Users, 
  Search,
  Filter,
  ChevronDown,
  ExternalLink,
  Heart,
  Bookmark,
  Share2,
  TrendingUp,
  Award,
  Target,
  Zap,
  Globe,
  Calendar,
  CheckCircle,
  PlayCircle,
  Download,
  Monitor,
  Award as Certificate,
  DollarSign,
  BarChart,
  Briefcase,
  GraduationCap,
  Code,
  Database,
  Palette,
  Shield,
  Smartphone,
  Brain,
  Cloud
} from 'lucide-react';

const CourseRecommendationsUpgraded = () => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [savedCourses, setSavedCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  // Real course data from Google, Coursera, IBM, Microsoft and other platforms
  const allCourses = [
    // Google Courses
    {
      id: 1,
      title: 'Google Data Analytics Professional Certificate',
      platform: 'Google',
      provider: 'Google',
      instructor: 'Google Career Certificates',
      duration: '6 months',
      skill_level: 'Beginner',
      rating: 4.8,
      enrolled_count: 245000,
      price: 49,
      currency: 'USD',
      skills_taught: ['Data Analysis', 'SQL', 'Tableau', 'R Programming', 'Data Cleaning'],
      course_url: 'https://coursera.org/professional-certificates/google-data-analytics',
      thumbnail_url: 'https://coursera.org/google-data-analytics',
      description: 'Learn data analytics skills with this comprehensive certificate program from Google.',
      certificate_available: true,
      language: 'English',
      subtitle_languages: ['English', 'Spanish', 'French', 'German'],
      category: 'Data Science',
      topics: ['Data Analysis', 'SQL', 'Data Visualization', 'R Programming'],
      prerequisites: ['Basic computer skills', 'Comfort with online learning'],
      learning_objectives: ['Analyze data for business decisions', 'Create data visualizations', 'Use SQL for data analysis'],
      career_outcomes: ['Data Analyst', 'Business Analyst', 'Marketing Analyst'],
      industry_recognition: 'Google Certified',
      flexible_deadlines: true,
      shareable_certificate: true,
      financial_aid_available: true,
      university_partner: null,
      company_partner: 'Google'
    },
    {
      id: 2,
      title: 'Google UX Design Professional Certificate',
      platform: 'Google',
      provider: 'Google',
      instructor: 'Google Career Certificates',
      duration: '6 months',
      skill_level: 'Beginner',
      rating: 4.7,
      enrolled_count: 189000,
      price: 49,
      currency: 'USD',
      skills_taught: ['UX Design', 'User Research', 'Wireframing', 'Prototyping', 'Figma'],
      course_url: 'https://coursera.org/professional-certificates/google-ux-design',
      thumbnail_url: 'https://coursera.org/google-ux-design',
      description: 'Start your career in UX design with this professional certificate from Google.',
      certificate_available: true,
      language: 'English',
      subtitle_languages: ['English', 'Spanish', 'French'],
      category: 'Design',
      topics: ['UX Design', 'User Research', 'Prototyping', 'Figma'],
      prerequisites: ['No prior experience required'],
      learning_objectives: ['Conduct user research', 'Create wireframes and prototypes', 'Design user-centered solutions'],
      career_outcomes: ['UX Designer', 'UI Designer', 'Product Designer'],
      industry_recognition: 'Google Certified',
      flexible_deadlines: true,
      shareable_certificate: true,
      financial_aid_available: true,
      university_partner: null,
      company_partner: 'Google'
    },
    {
      id: 3,
      title: 'Google Project Management Professional Certificate',
      platform: 'Google',
      provider: 'Google',
      instructor: 'Google Career Certificates',
      duration: '6 months',
      skill_level: 'Beginner',
      rating: 4.8,
      enrolled_count: 312000,
      price: 49,
      currency: 'USD',
      skills_taught: ['Project Management', 'Agile', 'Scrum', 'Risk Management', 'Stakeholder Management'],
      course_url: 'https://coursera.org/professional-certificates/google-project-management',
      thumbnail_url: 'https://coursera.org/google-project-management',
      description: 'Learn project management skills and prepare for PMP certification.',
      certificate_available: true,
      language: 'English',
      subtitle_languages: ['English', 'Spanish', 'French', 'German'],
      category: 'Business',
      topics: ['Project Management', 'Agile', 'Scrum', 'Leadership'],
      prerequisites: ['No prior experience required'],
      learning_objectives: ['Manage projects effectively', 'Lead teams', 'Apply Agile methodologies'],
      career_outcomes: ['Project Manager', 'Program Manager', 'Scrum Master'],
      industry_recognition: 'Google Certified',
      flexible_deadlines: true,
      shareable_certificate: true,
      financial_aid_available: true,
      university_partner: null,
      company_partner: 'Google'
    },
    // Coursera Courses
    {
      id: 4,
      title: 'Machine Learning Specialization',
      platform: 'Coursera',
      provider: 'Stanford University',
      instructor: 'Andrew Ng',
      duration: '3 months',
      skill_level: 'Intermediate',
      rating: 4.9,
      enrolled_count: 450000,
      price: 79,
      currency: 'USD',
      skills_taught: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Python', 'TensorFlow'],
      course_url: 'https://coursera.org/specializations/machine-learning-introduction',
      thumbnail_url: 'https://coursera.org/machine-learning-stanford',
      description: 'Master machine learning fundamentals with Andrew Ng from Stanford University.',
      certificate_available: true,
      language: 'English',
      subtitle_languages: ['English', 'Chinese', 'Spanish', 'French'],
      category: 'Data Science',
      topics: ['Machine Learning', 'Deep Learning', 'Neural Networks', 'AI'],
      prerequisites: ['Python programming', 'Basic linear algebra', 'Probability theory'],
      learning_objectives: ['Build ML models', 'Understand neural networks', 'Apply ML to real problems'],
      career_outcomes: ['ML Engineer', 'Data Scientist', 'AI Researcher'],
      industry_recognition: 'Stanford Certificate',
      flexible_deadlines: true,
      shareable_certificate: true,
      financial_aid_available: true,
      university_partner: 'Stanford University',
      company_partner: null
    },
    {
      id: 5,
      title: 'Python for Everybody Specialization',
      platform: 'Coursera',
      provider: 'University of Michigan',
      instructor: 'Charles Severance',
      duration: '4 months',
      skill_level: 'Beginner',
      rating: 4.8,
      enrolled_count: 680000,
      price: 49,
      currency: 'USD',
      skills_taught: ['Python Programming', 'Data Structures', 'Web Development', 'Database Access', 'JSON'],
      course_url: 'https://coursera.org/specializations/python',
      thumbnail_url: 'https://coursera.org/python-for-everybody',
      description: 'Learn Python programming from scratch with this comprehensive specialization.',
      certificate_available: true,
      language: 'English',
      subtitle_languages: ['English', 'Spanish', 'Chinese', 'Arabic'],
      category: 'Programming',
      topics: ['Python', 'Programming', 'Web Development', 'Databases'],
      prerequisites: ['Basic computer skills'],
      learning_objectives: ['Write Python programs', 'Work with data structures', 'Build web applications'],
      career_outcomes: ['Python Developer', 'Web Developer', 'Data Analyst'],
      industry_recognition: 'University of Michigan Certificate',
      flexible_deadlines: true,
      shareable_certificate: true,
      financial_aid_available: true,
      university_partner: 'University of Michigan',
      company_partner: null
    },
    // IBM Courses
    {
      id: 6,
      title: 'IBM Data Science Professional Certificate',
      platform: 'Coursera',
      provider: 'IBM',
      instructor: 'IBM Skills Network',
      duration: '11 months',
      skill_level: 'Beginner',
      rating: 4.6,
      enrolled_count: 234000,
      price: 39,
      currency: 'USD',
      skills_taught: ['Data Science', 'Python', 'SQL', 'Machine Learning', 'Data Visualization'],
      course_url: 'https://coursera.org/professional-certificates/ibm-data-science',
      thumbnail_url: 'https://coursera.org/ibm-data-science',
      description: 'Launch your career in data science with this IBM professional certificate.',
      certificate_available: true,
      language: 'English',
      subtitle_languages: ['English', 'Spanish', 'French'],
      category: 'Data Science',
      topics: ['Data Science', 'Python', 'Machine Learning', 'IBM Watson'],
      prerequisites: ['Basic computer skills', 'Comfort with math'],
      learning_objectives: ['Apply data science methods', 'Build ML models', 'Use IBM tools'],
      career_outcomes: ['Data Scientist', 'Data Analyst', 'ML Engineer'],
      industry_recognition: 'IBM Certified',
      flexible_deadlines: true,
      shareable_certificate: true,
      financial_aid_available: true,
      university_partner: null,
      company_partner: 'IBM'
    },
    {
      id: 7,
      title: 'IBM Cybersecurity Analyst Professional Certificate',
      platform: 'Coursera',
      provider: 'IBM',
      instructor: 'IBM Skills Network',
      duration: '8 months',
      skill_level: 'Beginner',
      rating: 4.7,
      enrolled_count: 156000,
      price: 39,
      currency: 'USD',
      skills_taught: ['Cybersecurity', 'Network Security', 'Threat Intelligence', 'SIEM', 'Incident Response'],
      course_url: 'https://coursera.org/professional-certificates/ibm-cybersecurity-analyst',
      thumbnail_url: 'https://coursera.org/ibm-cybersecurity',
      description: 'Start your career in cybersecurity with this IBM certificate program.',
      certificate_available: true,
      language: 'English',
      subtitle_languages: ['English', 'Spanish'],
      category: 'Cybersecurity',
      topics: ['Cybersecurity', 'Network Security', 'IBM Security', 'SIEM'],
      prerequisites: ['Basic IT knowledge'],
      learning_objectives: ['Monitor security systems', 'Respond to incidents', 'Use security tools'],
      career_outcomes: ['Cybersecurity Analyst', 'Security Engineer', 'SOC Analyst'],
      industry_recognition: 'IBM Certified',
      flexible_deadlines: true,
      shareable_certificate: true,
      financial_aid_available: true,
      university_partner: null,
      company_partner: 'IBM'
    },
    // Microsoft Courses
    {
      id: 8,
      title: 'Microsoft Azure Fundamentals AZ-900',
      platform: 'Microsoft Learn',
      provider: 'Microsoft',
      instructor: 'Microsoft Learning',
      duration: '1 month',
      skill_level: 'Beginner',
      rating: 4.7,
      enrolled_count: 425000,
      price: 0,
      currency: 'USD',
      skills_taught: ['Azure', 'Cloud Computing', 'Cloud Services', 'Security', 'Pricing'],
      course_url: 'https://learn.microsoft.com/en-us/credentials/certifications/exams/az-900/',
      thumbnail_url: 'https://learn.microsoft.com/azure-fundamentals',
      description: 'Learn cloud fundamentals and prepare for Azure AZ-900 certification.',
      certificate_available: true,
      language: 'English',
      subtitle_languages: ['English', 'Spanish', 'French', 'German', 'Chinese'],
      category: 'Cloud Computing',
      topics: ['Azure', 'Cloud Computing', 'Microsoft Cloud', 'Certification Prep'],
      prerequisites: ['Basic IT knowledge'],
      learning_objectives: ['Understand cloud concepts', 'Learn Azure services', 'Prepare for AZ-900 exam'],
      career_outcomes: ['Cloud Engineer', 'Azure Administrator', 'Solutions Architect'],
      industry_recognition: 'Microsoft Certified',
      flexible_deadlines: true,
      shareable_certificate: true,
      financial_aid_available: false,
      university_partner: null,
      company_partner: 'Microsoft'
    },
    {
      id: 9,
      title: 'Microsoft Power BI Data Analyst PL-300',
      platform: 'Microsoft Learn',
      provider: 'Microsoft',
      instructor: 'Microsoft Learning',
      duration: '2 months',
      skill_level: 'Intermediate',
      rating: 4.6,
      enrolled_count: 287000,
      price: 0,
      currency: 'USD',
      skills_taught: ['Power BI', 'Data Visualization', 'DAX', 'Data Modeling', 'Business Intelligence'],
      course_url: 'https://learn.microsoft.com/en-us/credentials/certifications/exams/pl-300/',
      thumbnail_url: 'https://learn.microsoft.com/power-bi-data-analyst',
      description: 'Master Power BI and prepare for PL-300 certification exam.',
      certificate_available: true,
      language: 'English',
      subtitle_languages: ['English', 'Spanish', 'French'],
      category: 'Data Science',
      topics: ['Power BI', 'Data Visualization', 'Business Intelligence', 'DAX'],
      prerequisites: ['Excel knowledge', 'Basic data concepts'],
      learning_objectives: ['Create Power BI reports', 'Build data models', 'Use DAX formulas'],
      career_outcomes: ['Data Analyst', 'BI Developer', 'Power BI Developer'],
      industry_recognition: 'Microsoft Certified',
      flexible_deadlines: true,
      shareable_certificate: true,
      financial_aid_available: false,
      university_partner: null,
      company_partner: 'Microsoft'
    },
    {
      id: 10,
      title: 'Microsoft Azure AI Fundamentals AI-900',
      platform: 'Microsoft Learn',
      provider: 'Microsoft',
      instructor: 'Microsoft Learning',
      duration: '1 month',
      skill_level: 'Beginner',
      rating: 4.5,
      enrolled_count: 198000,
      price: 0,
      currency: 'USD',
      skills_taught: ['AI', 'Machine Learning', 'Azure AI', 'Computer Vision', 'NLP'],
      course_url: 'https://learn.microsoft.com/en-us/credentials/certifications/exams/ai-900/',
      thumbnail_url: 'https://learn.microsoft.com/azure-ai-fundamentals',
      description: 'Learn AI fundamentals and Azure AI services for AI-900 certification.',
      certificate_available: true,
      language: 'English',
      subtitle_languages: ['English', 'Spanish', 'Chinese'],
      category: 'Artificial Intelligence',
      topics: ['AI', 'Machine Learning', 'Azure AI', 'Computer Vision'],
      prerequisites: ['Basic computer skills'],
      learning_objectives: ['Understand AI concepts', 'Learn Azure AI services', 'Prepare for AI-900'],
      career_outcomes: ['AI Engineer', 'ML Engineer', 'Azure AI Specialist'],
      industry_recognition: 'Microsoft Certified',
      flexible_deadlines: true,
      shareable_certificate: true,
      financial_aid_available: false,
      university_partner: null,
      company_partner: 'Microsoft'
    },
    // Additional real courses from various platforms
    {
      id: 11,
      title: 'The Complete Web Developer Bootcamp 2024',
      platform: 'Udemy',
      provider: 'Udemy',
      instructor: 'Dr. Angela Yu',
      duration: '65 hours',
      skill_level: 'Beginner',
      rating: 4.7,
      enrolled_count: 892000,
      price: 89.99,
      currency: 'USD',
      skills_taught: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB', 'Express'],
      course_url: 'https://www.udemy.com/course/the-complete-web-developer-bootcamp/',
      thumbnail_url: 'https://www.udemy.com/course/the-complete-web-developer-bootcamp/',
      description: 'Become a full-stack web developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB and more!',
      certificate_available: true,
      language: 'English',
      subtitle_languages: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'],
      category: 'Web Development',
      topics: ['Web Development', 'Full Stack', 'JavaScript', 'React', 'Node.js'],
      prerequisites: ['No programming experience needed'],
      learning_objectives: ['Build 16 web projects', 'Master modern web technologies', 'Deploy applications'],
      career_outcomes: ['Full Stack Developer', 'Web Developer', 'Frontend Developer'],
      industry_recognition: 'Udemy Certificate',
      flexible_deadlines: true,
      shareable_certificate: true,
      financial_aid_available: false,
      university_partner: null,
      company_partner: null
    },
    {
      id: 12,
      title: 'AWS Certified Solutions Architect - Associate',
      platform: 'Udemy',
      provider: 'Udemy',
      instructor: 'Stephane Maarek',
      duration: '27 hours',
      skill_level: 'Intermediate',
      rating: 4.7,
      enrolled_count: 567000,
      price: 84.99,
      currency: 'USD',
      skills_taught: ['AWS', 'Cloud Architecture', 'EC2', 'S3', 'Lambda', 'VPC', 'IAM'],
      course_url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate/',
      thumbnail_url: 'https://www.udemy.com/course/aws-certified-solutions-architect-associate/',
      description: 'AWS Certified Solutions Architect - Associate SAA-C03. Pass the AWS Certified Solutions Architect Associate exam.',
      certificate_available: true,
      language: 'English',
      subtitle_languages: ['English', 'Spanish', 'French', 'German'],
      category: 'Cloud Computing',
      topics: ['AWS', 'Cloud Computing', 'Solutions Architecture', 'Certification Prep'],
      prerequisites: ['Basic AWS knowledge', 'Some IT experience'],
      learning_objectives: ['Design AWS solutions', 'Pass SAA-C03 exam', 'Master AWS services'],
      career_outcomes: ['AWS Solutions Architect', 'Cloud Architect', 'DevOps Engineer'],
      industry_recognition: 'AWS Certification Prep',
      flexible_deadlines: true,
      shareable_certificate: true,
      financial_aid_available: false,
      university_partner: null,
      company_partner: null
    }
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'Data Science', name: 'Data Science', icon: BarChart },
    { id: 'Programming', name: 'Programming', icon: Code },
    { id: 'Web Development', name: 'Web Development', icon: Monitor },
    { id: 'Cloud Computing', name: 'Cloud Computing', icon: Cloud },
    { id: 'Design', name: 'Design', icon: Palette },
    { id: 'Business', name: 'Business', icon: Briefcase },
    { id: 'Cybersecurity', name: 'Cybersecurity', icon: Shield },
    { id: 'Artificial Intelligence', name: 'Artificial Intelligence', icon: Brain }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'Beginner', name: 'Beginner' },
    { id: 'Intermediate', name: 'Intermediate' },
    { id: 'Advanced', name: 'Advanced' }
  ];

  const platforms = [
    { id: 'all', name: 'All Platforms' },
    { id: 'Google', name: 'Google' },
    { id: 'Coursera', name: 'Coursera' },
    { id: 'IBM', name: 'IBM' },
    { id: 'Microsoft', name: 'Microsoft' },
    { id: 'Udemy', name: 'Udemy' },
    { id: 'edX', name: 'edX' },
    { id: 'Pluralsight', name: 'Pluralsight' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'free', name: 'Free' },
    { id: 'paid', name: 'Paid' },
    { id: '0-50', name: '$0 - $50' },
    { id: '50-100', name: '$50 - $100' },
    { id: '100+', name: '$100+' }
  ];

  const sortOptions = [
    { id: 'rating', name: 'Highest Rated' },
    { id: 'enrolled', name: 'Most Popular' },
    { id: 'price-low', name: 'Price: Low to High' },
    { id: 'price-high', name: 'Price: High to Low' },
    { id: 'duration', name: 'Duration' },
    { id: 'newest', name: 'Newest' }
  ];

  useEffect(() => {
    // Simulate API call to fetch courses
    setTimeout(() => {
      setCourses(allCourses);
      setFilteredCourses(allCourses);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, searchTerm, selectedCategory, selectedLevel, selectedPlatform, selectedPrice, sortBy]);

  const filterCourses = () => {
    let filtered = [...courses];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.skills_taught.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        course.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Level filter
    if (selectedLevel !== 'all') {
      filtered = filtered.filter(course => course.skill_level === selectedLevel);
    }

    // Platform filter
    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(course => course.platform === selectedPlatform);
    }

    // Price filter
    if (selectedPrice !== 'all') {
      filtered = filtered.filter(course => {
        if (selectedPrice === 'free') return course.price === 0;
        if (selectedPrice === 'paid') return course.price > 0;
        if (selectedPrice === '0-50') return course.price > 0 && course.price <= 50;
        if (selectedPrice === '50-100') return course.price > 50 && course.price <= 100;
        if (selectedPrice === '100+') return course.price > 100;
        return true;
      });
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'enrolled':
          return b.enrolled_count - a.enrolled_count;
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'duration':
          return a.duration.localeCompare(b.duration);
        case 'newest':
          return b.id - a.id;
        default:
          return 0;
      }
    });

    setFilteredCourses(filtered);
  };

  const saveCourse = (courseId) => {
    if (!savedCourses.includes(courseId)) {
      setSavedCourses([...savedCourses, courseId]);
    }
  };

  const unsaveCourse = (courseId) => {
    setSavedCourses(savedCourses.filter(id => id !== courseId));
  };

  const enrollCourse = (courseId) => {
    if (!enrolledCourses.includes(courseId)) {
      setEnrolledCourses([...enrolledCourses, courseId]);
      // Open course URL in new tab for real enrollment
      const course = courses.find(c => c.id === courseId);
      if (course) {
        window.open(course.course_url, '_blank');
      }
    }
  };

  const shareCourse = (courseId) => {
    const course = courses.find(c => c.id === courseId);
    if (course) {
      if (navigator.share) {
        navigator.share({
          title: course.title,
          text: `Check out this course: ${course.title} on ${course.platform}`,
          url: course.course_url
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(course.course_url);
      }
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Data Science': return 'bg-purple-100 text-purple-800';
      case 'Programming': return 'bg-blue-100 text-blue-800';
      case 'Web Development': return 'bg-green-100 text-green-800';
      case 'Cloud Computing': return 'bg-orange-100 text-orange-800';
      case 'Design': return 'bg-pink-100 text-pink-800';
      case 'Business': return 'bg-indigo-100 text-indigo-800';
      case 'Cybersecurity': return 'bg-red-100 text-red-800';
      case 'Artificial Intelligence': return 'bg-cyan-100 text-cyan-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'Google': return '🔍';
      case 'Coursera': return '🎓';
      case 'IBM': return '💼';
      case 'Microsoft': return '🪟';
      case 'Udemy': return '📚';
      case 'edX': return '🎯';
      case 'Pluralsight': return '🎬';
      default: return '📖';
    }
  };

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'Google': return 'bg-blue-500';
      case 'Coursera': return 'bg-blue-600';
      case 'IBM': return 'bg-blue-700';
      case 'Microsoft': return 'bg-green-600';
      case 'Udemy': return 'bg-purple-600';
      case 'edX': return 'bg-red-600';
      case 'Pluralsight': return 'bg-orange-600';
      default: return 'bg-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Course Recommendations
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              <div className="flex items-center space-x-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredCourses.length} courses found
                </div>
                <div className="text-sm text-green-600 font-medium">
                  {savedCourses.length} saved
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="card mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses, skills, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input w-full pl-10"
                />
              </div>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-secondary flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown className={`w-4 h-4 ml-2 transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input appearance-none pr-10"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="input w-full"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Level Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Level
                  </label>
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="input w-full"
                  >
                    {levels.map(level => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Platform Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Platform
                  </label>
                  <select
                    value={selectedPlatform}
                    onChange={(e) => setSelectedPlatform(e.target.value)}
                    className="input w-full"
                  >
                    {platforms.map(platform => (
                      <option key={platform.id} value={platform.id}>
                        {platform.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Price
                  </label>
                  <select
                    value={selectedPrice}
                    onChange={(e) => setSelectedPrice(e.target.value)}
                    className="input w-full"
                  >
                    {priceRanges.map(range => (
                      <option key={range.id} value={range.id}>
                        {range.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Course Listings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="card hover:shadow-lg transition-shadow">
              {/* Course Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 ${getPlatformColor(course.platform)} rounded-lg flex items-center justify-center text-white`}>
                    {getPlatformIcon(course.platform)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {course.provider}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <span className={`px-2 py-1 text-xs rounded ${getCategoryColor(course.category)}`}>
                    {course.category}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded ${getLevelColor(course.skill_level)}`}>
                    {course.skill_level}
                  </span>
                </div>
              </div>

              {/* Course Description */}
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">{formatNumber(course.enrolled_count)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </span>
                </div>
              </div>

              {/* Skills Taught */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Skills You'll Learn
                </h4>
                <div className="flex flex-wrap gap-1">
                  {course.skills_taught.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {course.skills_taught.length > 4 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded">
                      +{course.skills_taught.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Instructor Info */}
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center">
                  <GraduationCap className="w-4 h-4 mr-1" />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center">
                  <Certificate className="w-4 h-4 mr-1" />
                  <span>{course.certificate_available ? 'Certificate' : 'No Certificate'}</span>
                </div>
              </div>

              {/* Learning Outcomes */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  <div className="flex items-center justify-between mb-1">
                    <span>Career outcomes:</span>
                    <span className="font-medium">{course.career_outcomes.length} paths</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Industry recognition:</span>
                    <span className="font-medium">{course.industry_recognition}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  onClick={() => enrollCourse(course.id)}
                  disabled={enrolledCourses.includes(course.id)}
                  className={`flex-1 btn flex items-center justify-center ${
                    enrolledCourses.includes(course.id)
                      ? 'btn-disabled'
                      : 'btn-primary'
                  }`}
                >
                  {enrolledCourses.includes(course.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Enrolled
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Enroll Now
                    </>
                  )}
                </button>

                <button
                  onClick={() => saveCourse(course.id)}
                  className={`btn btn-secondary flex items-center justify-center ${
                    savedCourses.includes(course.id) ? 'text-yellow-600' : ''
                  }`}
                >
                  <Heart className={`w-4 h-4 ${savedCourses.includes(course.id) ? 'fill-current' : ''}`} />
                </button>

                <button
                  onClick={() => shareCourse(course.id)}
                  className="btn btn-secondary flex items-center justify-center"
                >
                  <Share2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => window.open(course.course_url, '_blank')}
                  className="btn btn-secondary flex items-center justify-center"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Courses Found */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No courses found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredCourses.length > 0 && filteredCourses.length < courses.length && (
          <div className="text-center mt-8">
            <button className="btn btn-primary">
              Load More Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseRecommendationsUpgraded;
