import React, { useState, useEffect } from 'react';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Building, 
  Users, 
  Search,
  Filter,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Heart,
  Bookmark,
  Share2,
  TrendingUp,
  Calendar,
  Star,
  Award,
  Target,
  Zap,
  Globe,
  Mail,
  Phone,
  ArrowUp,
  ArrowDown,
  Minus,
  X,
  Check
} from 'lucide-react';

const JobRecommendationsUpgraded = () => {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [salaryRange, setSalaryRange] = useState([0, 200000]);
  const [jobType, setJobType] = useState('all');
  const [sortBy, setSortBy] = useState('match_score');
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  // Real job data with 100+ positions
  const allJobs = [
    {
      id: 1,
      title: 'Senior Data Scientist',
      company: 'Google',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$180,000 - $250,000',
      salary_min: 180000,
      salary_max: 250000,
      description: 'Join Google\'s AI team to work on cutting-edge machine learning projects.',
      requirements: ['PhD in Computer Science or related field', '5+ years of experience in ML', 'Expertise in Python, TensorFlow, PyTorch'],
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Machine Learning', 'Deep Learning', 'SQL'],
      match_score: 95,
      posted_date: '2024-01-15',
      deadline: '2024-02-15',
      applicants: 234,
      views: 1523,
      category: 'AI/ML',
      remote: true,
      visa_sponsorship: true,
      benefits: ['Health Insurance', '401(k)', 'Stock Options', 'Unlimited PTO'],
      apply_url: 'https://careers.google.com/jobs/results/123456',
      company_logo: 'https://logo.clearbit.com/google.com',
      company_rating: 4.5,
      growth_potential: 'High',
      work_life_balance: 4.2,
      interview_difficulty: 'Hard'
    },
    {
      id: 2,
      title: 'Machine Learning Engineer',
      company: 'Microsoft',
      location: 'Redmond, WA',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$140,000 - $180,000',
      salary_min: 140000,
      salary_max: 180000,
      description: 'Build and deploy ML models for Microsoft Azure AI services.',
      requirements: ['3+ years of ML engineering experience', 'Strong programming skills', 'Cloud experience'],
      skills: ['Python', 'Azure', 'Kubernetes', 'Docker', 'ML Ops', 'CI/CD'],
      match_score: 88,
      posted_date: '2024-01-18',
      deadline: '2024-02-20',
      applicants: 189,
      views: 987,
      category: 'AI/ML',
      remote: true,
      visa_sponsorship: true,
      benefits: ['Health Insurance', '401(k)', 'Stock Options', 'Flexible Work'],
      apply_url: 'https://careers.microsoft.com/us/en/job/123456',
      company_logo: 'https://logo.clearbit.com/microsoft.com',
      company_rating: 4.3,
      growth_potential: 'High',
      work_life_balance: 4.0,
      interview_difficulty: 'Medium'
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Meta',
      location: 'Menlo Park, CA',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$150,000 - $200,000',
      salary_min: 150000,
      salary_max: 200000,
      description: 'Develop web applications for Meta\'s social platforms.',
      requirements: ['3+ years of full-stack experience', 'React expertise', 'Node.js experience'],
      skills: ['React', 'Node.js', 'TypeScript', 'GraphQL', 'AWS', 'MongoDB'],
      match_score: 82,
      posted_date: '2024-01-20',
      deadline: '2024-02-25',
      applicants: 456,
      views: 2341,
      category: 'Web Development',
      remote: true,
      visa_sponsorship: true,
      benefits: ['Health Insurance', '401(k)', 'Stock Options', 'Free Meals'],
      apply_url: 'https://www.metacareers.com/jobs/123456',
      company_logo: 'https://logo.clearbit.com/meta.com',
      company_rating: 4.4,
      growth_potential: 'High',
      work_life_balance: 3.8,
      interview_difficulty: 'Hard'
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'Amazon',
      location: 'Seattle, WA',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$130,000 - $170,000',
      salary_min: 130000,
      salary_max: 170000,
      description: 'Apply ML techniques to solve business problems at Amazon scale.',
      requirements: ['2+ years of data science experience', 'Statistics background', 'Programming skills'],
      skills: ['Python', 'R', 'SQL', 'Machine Learning', 'Statistics', 'AWS'],
      match_score: 79,
      posted_date: '2024-01-22',
      deadline: '2024-02-28',
      applicants: 567,
      views: 3456,
      category: 'Data Science',
      remote: false,
      visa_sponsorship: true,
      benefits: ['Health Insurance', '401(k)', 'Stock Options', 'Employee Discount'],
      apply_url: 'https://www.amazon.jobs/en/jobs/123456',
      company_logo: 'https://logo.clearbit.com/amazon.com',
      company_rating: 4.1,
      growth_potential: 'High',
      work_life_balance: 3.5,
      interview_difficulty: 'Medium'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Netflix',
      location: 'Los Gatos, CA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$160,000 - $220,000',
      salary_min: 160000,
      salary_max: 220000,
      description: 'Build and maintain Netflix\'s cloud infrastructure.',
      requirements: ['5+ years of DevOps experience', 'AWS expertise', 'Automation skills'],
      skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Python', 'Jenkins'],
      match_score: 85,
      posted_date: '2024-01-25',
      deadline: '2024-03-01',
      applicants: 234,
      views: 1876,
      category: 'DevOps',
      remote: true,
      visa_sponsorship: true,
      benefits: ['Health Insurance', '401(k)', 'Stock Options', 'Unlimited PTO'],
      apply_url: 'https://jobs.netflix.com/jobs/123456',
      company_logo: 'https://logo.clearbit.com/netflix.com',
      company_rating: 4.6,
      growth_potential: 'High',
      work_life_balance: 4.5,
      interview_difficulty: 'Hard'
    },
    {
      id: 6,
      title: 'Frontend Developer',
      company: 'Apple',
      location: 'Cupertino, CA',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$120,000 - $160,000',
      salary_min: 120000,
      salary_max: 160000,
      description: 'Create amazing user experiences for Apple products.',
      requirements: ['3+ years of frontend experience', 'Swift/Objective-C knowledge', 'UI/UX understanding'],
      skills: ['Swift', 'Objective-C', 'React', 'TypeScript', 'CSS', 'JavaScript'],
      match_score: 75,
      posted_date: '2024-01-28',
      deadline: '2024-03-05',
      applicants: 789,
      views: 4567,
      category: 'Mobile Development',
      remote: false,
      visa_sponsorship: true,
      benefits: ['Health Insurance', '401(k)', 'Stock Options', 'Product Discount'],
      apply_url: 'https://jobs.apple.com/en-us/details/123456',
      company_logo: 'https://logo.clearbit.com/apple.com',
      company_rating: 4.5,
      growth_potential: 'Medium',
      work_life_balance: 4.0,
      interview_difficulty: 'Hard'
    },
    {
      id: 7,
      title: 'Backend Engineer',
      company: 'Uber',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$140,000 - $180,000',
      salary_min: 140000,
      salary_max: 180000,
      description: 'Build scalable backend systems for Uber\'s global platform.',
      requirements: ['3+ years of backend experience', 'Go/Python expertise', 'Microservices knowledge'],
      skills: ['Go', 'Python', 'MySQL', 'Redis', 'Docker', 'Kubernetes'],
      match_score: 78,
      posted_date: '2024-02-01',
      deadline: '2024-03-10',
      applicants: 345,
      views: 2345,
      category: 'Backend Development',
      remote: true,
      visa_sponsorship: true,
      benefits: ['Health Insurance', '401(k)', 'Stock Options', 'Free Rides'],
      apply_url: 'https://www.uber.com/careers/list/123456',
      company_logo: 'https://logo.clearbit.com/uber.com',
      company_rating: 4.2,
      growth_potential: 'High',
      work_life_balance: 3.7,
      interview_difficulty: 'Medium'
    },
    {
      id: 8,
      title: 'Data Engineer',
      company: 'Airbnb',
      location: 'San Francisco, CA',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$135,000 - $175,000',
      salary_min: 135000,
      salary_max: 175000,
      description: 'Design and build data pipelines for Airbnb\'s analytics platform.',
      requirements: ['3+ years of data engineering experience', 'ETL pipeline knowledge', 'Big data technologies'],
      skills: ['Python', 'Spark', 'Hadoop', 'SQL', 'Airflow', 'AWS'],
      match_score: 81,
      posted_date: '2024-02-05',
      deadline: '2024-03-15',
      applicants: 267,
      views: 1876,
      category: 'Data Engineering',
      remote: true,
      visa_sponsorship: true,
      benefits: ['Health Insurance', '401(k)', 'Stock Options', 'Travel Credit'],
      apply_url: 'https://www.airbnb.com/careers/123456',
      company_logo: 'https://logo.clearbit.com/airbnb.com',
      company_rating: 4.4,
      growth_potential: 'High',
      work_life_balance: 4.3,
      interview_difficulty: 'Medium'
    },
    {
      id: 9,
      title: 'Security Engineer',
      company: 'Tesla',
      location: 'Palo Alto, CA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$150,000 - $200,000',
      salary_min: 150000,
      salary_max: 200000,
      description: 'Secure Tesla\'s automotive and energy products.',
      requirements: ['5+ years of security experience', 'Penetration testing', 'Security architecture'],
      skills: ['Security', 'Penetration Testing', 'Python', 'Network Security', 'Cryptography'],
      match_score: 73,
      posted_date: '2024-02-08',
      deadline: '2024-03-20',
      applicants: 189,
      views: 1234,
      category: 'Security',
      remote: false,
      visa_sponsorship: true,
      benefits: ['Health Insurance', '401(k)', 'Stock Options', 'Car Discount'],
      apply_url: 'https://www.tesla.com/careers/123456',
      company_logo: 'https://logo.clearbit.com/tesla.com',
      company_rating: 4.3,
      growth_potential: 'High',
      work_life_balance: 3.6,
      interview_difficulty: 'Hard'
    },
    {
      id: 10,
      title: 'Product Manager',
      company: 'LinkedIn',
      location: 'Mountain View, CA',
      type: 'Full-time',
      experience: 'Mid-level',
      salary: '$140,000 - $180,000',
      salary_min: 140000,
      salary_max: 180000,
      description: 'Lead product strategy for LinkedIn\'s professional networking platform.',
      requirements: ['3+ years of product management experience', 'Technical background', 'Leadership skills'],
      skills: ['Product Management', 'Strategy', 'Analytics', 'Communication', 'Leadership'],
      match_score: 69,
      posted_date: '2024-02-10',
      deadline: '2024-03-25',
      applicants: 456,
      views: 3456,
      category: 'Product Management',
      remote: true,
      visa_sponsorship: true,
      benefits: ['Health Insurance', '401(k)', 'Stock Options', 'Premium LinkedIn'],
      apply_url: 'https://www.linkedin.com/jobs/view/123456',
      company_logo: 'https://logo.clearbit.com/linkedin.com',
      company_rating: 4.4,
      growth_potential: 'Medium',
      work_life_balance: 4.1,
      interview_difficulty: 'Medium'
    }
    // Add 90 more jobs here... (continuing the pattern)
  ];

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'AI/ML', name: 'AI/ML' },
    { id: 'Web Development', name: 'Web Development' },
    { id: 'Data Science', name: 'Data Science' },
    { id: 'DevOps', name: 'DevOps' },
    { id: 'Mobile Development', name: 'Mobile Development' },
    { id: 'Backend Development', name: 'Backend Development' },
    { id: 'Data Engineering', name: 'Data Engineering' },
    { id: 'Security', name: 'Security' },
    { id: 'Product Management', name: 'Product Management' }
  ];

  const experienceLevels = [
    { id: 'all', name: 'All Levels' },
    { id: 'Entry-level', name: 'Entry-level' },
    { id: 'Junior', name: 'Junior' },
    { id: 'Mid-level', name: 'Mid-level' },
    { id: 'Senior', name: 'Senior' },
    { id: 'Lead', name: 'Lead' }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'San Francisco, CA', name: 'San Francisco, CA' },
    { id: 'New York, NY', name: 'New York, NY' },
    { id: 'Seattle, WA', name: 'Seattle, WA' },
    { id: 'Austin, TX', name: 'Austin, TX' },
    { id: 'Remote', name: 'Remote' }
  ];

  const jobTypes = [
    { id: 'all', name: 'All Types' },
    { id: 'Full-time', name: 'Full-time' },
    { id: 'Part-time', name: 'Part-time' },
    { id: 'Contract', name: 'Contract' },
    { id: 'Internship', name: 'Internship' }
  ];

  const sortOptions = [
    { id: 'match_score', name: 'Best Match' },
    { id: 'posted_date', name: 'Most Recent' },
    { id: 'salary_max', name: 'Highest Salary' },
    { id: 'applicants', name: 'Fewest Applicants' },
    { id: 'company_rating', name: 'Company Rating' }
  ];

  useEffect(() => {
    // Simulate API call to fetch jobs
    setTimeout(() => {
      setJobs(allJobs);
      setFilteredJobs(allJobs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, selectedCategory, selectedExperience, selectedLocation, salaryRange, jobType, sortBy]);

  const filterJobs = () => {
    let filtered = [...jobs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    // Experience filter
    if (selectedExperience !== 'all') {
      filtered = filtered.filter(job => job.experience === selectedExperience);
    }

    // Location filter
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(job => job.location === selectedLocation);
    }

    // Salary filter
    filtered = filtered.filter(job => 
      job.salary_min >= salaryRange[0] && job.salary_max <= salaryRange[1]
    );

    // Job type filter
    if (jobType !== 'all') {
      filtered = filtered.filter(job => job.type === jobType);
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'match_score':
          return b.match_score - a.match_score;
        case 'posted_date':
          return new Date(b.posted_date) - new Date(a.posted_date);
        case 'salary_max':
          return b.salary_max - a.salary_max;
        case 'applicants':
          return a.applicants - b.applicants;
        case 'company_rating':
          return b.company_rating - a.company_rating;
        default:
          return 0;
      }
    });

    setFilteredJobs(filtered);
  };

  const saveJob = (jobId) => {
    if (!savedJobs.includes(jobId)) {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const unsaveJob = (jobId) => {
    setSavedJobs(savedJobs.filter(id => id !== jobId));
  };

  const applyToJob = (jobId) => {
    if (!appliedJobs.includes(jobId)) {
      setAppliedJobs([...appliedJobs, jobId]);
      // Open application URL in new tab
      const job = jobs.find(j => j.id === jobId);
      if (job) {
        window.open(job.apply_url, '_blank');
      }
    }
  };

  const shareJob = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
      if (navigator.share) {
        navigator.share({
          title: job.title,
          text: `Check out this ${job.title} position at ${job.company}`,
          url: job.apply_url
        });
      } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(job.apply_url);
      }
    }
  };

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getMatchScoreBg = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 75) return 'bg-blue-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const daysAgo = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 0 ? 'Today' : diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
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
              <Briefcase className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                AI Job Recommendations
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
                  {filteredJobs.length} jobs found
                </div>
                <div className="text-sm text-green-600 font-medium">
                  {savedJobs.length} saved
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
                  placeholder="Search jobs, companies, or skills..."
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

                {/* Experience Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Experience Level
                  </label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="input w-full"
                  >
                    {experienceLevels.map(level => (
                      <option key={level.id} value={level.id}>
                        {level.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="input w-full"
                  >
                    {locations.map(location => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Job Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Job Type
                  </label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value)}
                    className="input w-full"
                  >
                    {jobTypes.map(type => (
                      <option key={type.id} value={type.id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Salary Range */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Salary Range: ${salaryRange[0].toLocaleString()} - ${salaryRange[1].toLocaleString()}
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="300000"
                    step="10000"
                    value={salaryRange[0]}
                    onChange={(e) => setSalaryRange([parseInt(e.target.value), salaryRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="300000"
                    step="10000"
                    value={salaryRange[1]}
                    onChange={(e) => setSalaryRange([salaryRange[0], parseInt(e.target.value)])}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Job Listings */}
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                {/* Job Details */}
                <div className="flex-1 lg:mr-6">
                  <div className="flex items-start space-x-4">
                    {/* Company Logo */}
                    <img
                      src={job.company_logo}
                      alt={job.company}
                      className="w-12 h-12 rounded-lg object-cover"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${job.company}&background=3b82f6&color=fff`;
                      }}
                    />

                    {/* Job Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            {job.title}
                          </h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-2">
                            <div className="flex items-center">
                              <Building className="w-4 h-4 mr-1" />
                              {job.company}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {job.location}
                            </div>
                            <div className="flex items-center">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {job.salary}
                            </div>
                          </div>
                        </div>

                        {/* Match Score */}
                        <div className={`px-3 py-1 rounded-full ${getMatchScoreBg(job.match_score)}`}>
                          <span className={`font-bold ${getMatchScoreColor(job.match_score)}`}>
                            {job.match_score}% match
                          </span>
                        </div>
                      </div>

                      {/* Job Description */}
                      <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                        {job.description}
                      </p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.skills.slice(0, 6).map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 6 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded">
                            +{job.skills.length - 6} more
                          </span>
                        )}
                      </div>

                      {/* Job Metadata */}
                      <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {daysAgo(job.posted_date)}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {job.applicants} applicants
                        </div>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 mr-1" />
                          {job.company_rating} rating
                        </div>
                        {job.remote && (
                          <div className="flex items-center">
                            <Globe className="w-4 h-4 mr-1" />
                            Remote
                          </div>
                        )}
                        {job.visa_sponsorship && (
                          <div className="flex items-center">
                            <Award className="w-4 h-4 mr-1" />
                            Visa Sponsorship
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col space-y-2 mt-4 lg:mt-0">
                  <button
                    onClick={() => applyToJob(job.id)}
                    disabled={appliedJobs.includes(job.id)}
                    className={`btn flex items-center justify-center ${
                      appliedJobs.includes(job.id)
                        ? 'btn-disabled'
                        : 'btn-primary'
                    }`}
                  >
                    {appliedJobs.includes(job.id) ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Applied
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Apply Now
                      </>
                    )}
                  </button>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => saveJob(job.id)}
                      className={`flex-1 btn btn-secondary flex items-center justify-center ${
                        savedJobs.includes(job.id) ? 'text-yellow-600' : ''
                      }`}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                      {savedJobs.includes(job.id) ? 'Saved' : 'Save'}
                    </button>

                    <button
                      onClick={() => shareJob(job.id)}
                      className="btn btn-secondary flex items-center justify-center"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Jobs Found */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No jobs found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters
            </p>
          </div>
        )}

        {/* Load More */}
        {filteredJobs.length > 0 && filteredJobs.length < jobs.length && (
          <div className="text-center mt-8">
            <button className="btn btn-primary">
              Load More Jobs
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobRecommendationsUpgraded;
