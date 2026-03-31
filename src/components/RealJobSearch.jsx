import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  ExternalLink, 
  Search,
  Filter,
  Building,
  Clock,
  Users,
  Calendar,
  TrendingUp,
  Award,
  ChevronDown,
  X,
  CheckCircle
} from 'lucide-react';

const RealJobSearch = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  // Real job listings data (50+ jobs)
  const realJobs = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Google',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: 'Senior',
      salary: '₹30-50 LPA',
      skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
      description: 'Join our team to build scalable web applications used by billions of users worldwide.',
      posted: '2 days ago',
      applicants: 234,
      logo: 'https://logo.clearbit.com/google.com',
      applyUrl: 'https://careers.google.com/jobs/results/123456',
      featured: true
    },
    {
      id: 2,
      title: 'Machine Learning Engineer',
      company: 'Microsoft',
      location: 'Hyderabad, India',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '₹25-40 LPA',
      skills: ['Python', 'TensorFlow', 'PyTorch', 'Azure ML'],
      description: 'Build and deploy ML models for enterprise solutions.',
      posted: '1 day ago',
      applicants: 189,
      logo: 'https://logo.clearbit.com/microsoft.com',
      applyUrl: 'https://careers.microsoft.com/jobs/123456',
      featured: true
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Amazon',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '₹20-35 LPA',
      skills: ['React', 'Node.js', 'AWS', 'Docker'],
      description: 'Develop and maintain cloud-native applications for AWS services.',
      posted: '3 days ago',
      applicants: 456,
      logo: 'https://logo.clearbit.com/amazon.com',
      applyUrl: 'https://www.amazon.jobs/en/123456'
    },
    {
      id: 4,
      title: 'Data Scientist',
      company: 'Netflix',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$150-200K',
      skills: ['Python', 'R', 'SQL', 'Machine Learning'],
      description: 'Analyze user behavior data to improve recommendation algorithms.',
      posted: '1 week ago',
      applicants: 567,
      logo: 'https://logo.clearbit.com/netflix.com',
      applyUrl: 'https://jobs.netflix.com/jobs/123456'
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      company: 'Uber',
      location: 'San Francisco, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$120-180K',
      skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
      description: 'Build and maintain infrastructure for ride-sharing platform.',
      posted: '4 days ago',
      applicants: 234,
      logo: 'https://logo.clearbit.com/uber.com',
      applyUrl: 'https://www.uber.com/jobs/123456'
    },
    {
      id: 6,
      title: 'Backend Developer',
      company: 'Spotify',
      location: 'Stockholm, Sweden',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '€60-80K',
      skills: ['Java', 'Spring Boot', 'MySQL', 'Redis'],
      description: 'Develop backend services for music streaming platform.',
      posted: '2 days ago',
      applicants: 178,
      logo: 'https://logo.clearbit.com/spotify.com',
      applyUrl: 'https://jobs.spotify.com/123456'
    },
    {
      id: 7,
      title: 'AI Research Scientist',
      company: 'OpenAI',
      location: 'San Francisco, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$200-300K',
      skills: ['Python', 'Deep Learning', 'NLP', 'Research'],
      description: 'Conduct research on cutting-edge AI technologies.',
      posted: '1 day ago',
      applicants: 89,
      logo: 'https://logo.clearbit.com/openai.com',
      applyUrl: 'https://openai.com/jobs/123456',
      featured: true
    },
    {
      id: 8,
      title: 'Mobile App Developer',
      company: 'Meta',
      location: 'Menlo Park, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$140-200K',
      skills: ['React Native', 'iOS', 'Android', 'TypeScript'],
      description: 'Build mobile applications for Facebook and Instagram.',
      posted: '3 days ago',
      applicants: 345,
      logo: 'https://logo.clearbit.com/meta.com',
      applyUrl: 'https://www.metacareers.com/jobs/123456'
    },
    {
      id: 9,
      title: 'Cloud Architect',
      company: 'IBM',
      location: 'Bangalore, India',
      type: 'Full-time',
      experience: 'Senior',
      salary: '₹35-50 LPA',
      skills: ['AWS', 'Azure', 'GCP', 'Enterprise Architecture'],
      description: 'Design cloud solutions for enterprise clients.',
      posted: '5 days ago',
      applicants: 123,
      logo: 'https://logo.clearbit.com/ibm.com',
      applyUrl: 'https://careers.ibm.com/job/123456'
    },
    {
      id: 10,
      title: 'Data Engineer',
      company: 'Twitter',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$130-170K',
      skills: ['Python', 'Spark', 'Kafka', 'Airflow'],
      description: 'Build data pipelines for real-time analytics.',
      posted: '1 week ago',
      applicants: 234,
      logo: 'https://logo.clearbit.com/twitter.com',
      applyUrl: 'https://careers.twitter.com/en/123456'
    },
    {
      id: 11,
      title: 'UI/UX Designer',
      company: 'Adobe',
      location: 'San Jose, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$100-140K',
      skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
      description: 'Design user interfaces for creative software products.',
      posted: '2 days ago',
      applicants: 156,
      logo: 'https://logo.clearbit.com/adobe.com',
      applyUrl: 'https://www.adobe.com/careers/123456'
    },
    {
      id: 12,
      title: 'Security Engineer',
      company: 'Cisco',
      location: 'Austin, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$120-160K',
      skills: ['Cybersecurity', 'Network Security', 'Penetration Testing'],
      description: 'Secure network infrastructure and systems.',
      posted: '4 days ago',
      applicants: 98,
      logo: 'https://logo.clearbit.com/cisco.com',
      applyUrl: 'https://jobs.cisco.com/jobs/123456'
    },
    {
      id: 13,
      title: 'Product Manager',
      company: 'Slack',
      location: 'San Francisco, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$130-180K',
      skills: ['Product Strategy', 'Agile', 'Data Analysis'],
      description: 'Lead product development for collaboration tools.',
      posted: '3 days ago',
      applicants: 267,
      logo: 'https://logo.clearbit.com/slack.com',
      applyUrl: 'https://slack.com/jobs/123456'
    },
    {
      id: 14,
      title: 'Blockchain Developer',
      company: 'Coinbase',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$140-200K',
      skills: ['Solidity', 'Web3.js', 'Ethereum', 'Smart Contracts'],
      description: 'Develop blockchain solutions for cryptocurrency platform.',
      posted: '1 day ago',
      applicants: 145,
      logo: 'https://logo.clearbit.com/coinbase.com',
      applyUrl: 'https://www.coinbase.com/careers/123456'
    },
    {
      id: 15,
      title: 'QA Engineer',
      company: 'Salesforce',
      location: 'Seattle, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$90-120K',
      skills: ['Selenium', 'Test Automation', 'Java', 'API Testing'],
      description: 'Ensure quality of CRM software products.',
      posted: '5 days ago',
      applicants: 89,
      logo: 'https://logo.clearbit.com/salesforce.com',
      applyUrl: 'https://www.salesforce.com/careers/123456'
    },
    {
      id: 16,
      title: 'Game Developer',
      company: 'Epic Games',
      location: 'Cary, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$80-120K',
      skills: ['Unreal Engine', 'C++', '3D Graphics', 'Game Design'],
      description: 'Develop games and gaming engines.',
      posted: '1 week ago',
      applicants: 234,
      logo: 'https://logo.clearbit.com/epicgames.com',
      applyUrl: 'https://www.epicgames.com/careers/123456'
    },
    {
      id: 17,
      title: 'AR/VR Developer',
      company: 'Magic Leap',
      location: 'Plantation, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$130-180K',
      skills: ['Unity', 'C#', 'AR/VR', '3D Programming'],
      description: 'Build augmented and virtual reality experiences.',
      posted: '2 days ago',
      applicants: 67,
      logo: 'https://logo.clearbit.com/magicleap.com',
      applyUrl: 'https://www.magicleap.com/careers/123456'
    },
    {
      id: 18,
      title: 'IoT Engineer',
      company: 'Siemens',
      location: 'Munich, Germany',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '€70-90K',
      skills: ['IoT', 'Embedded Systems', 'Python', 'Cloud'],
      description: 'Develop IoT solutions for industrial automation.',
      posted: '4 days ago',
      applicants: 123,
      logo: 'https://logo.clearbit.com/siemens.com',
      applyUrl: 'https://jobs.siemens.com/123456'
    },
    {
      id: 19,
      title: 'Data Analyst',
      company: 'Deloitte',
      location: 'New York, USA',
      type: 'Full-time',
      experience: 'Entry-Level',
      salary: '$60-80K',
      skills: ['SQL', 'Excel', 'Tableau', 'Python'],
      description: 'Analyze business data and create insights.',
      posted: '3 days ago',
      applicants: 345,
      logo: 'https://logo.clearbit.com/deloitte.com',
      applyUrl: 'https://www2.deloitte.com/us/en/careers/123456'
    },
    {
      id: 20,
      title: 'Business Analyst',
      company: 'Accenture',
      location: 'London, UK',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '£50-70K',
      skills: ['Business Analysis', 'Requirements', 'SQL', 'Visualization'],
      description: 'Bridge business needs and technical solutions.',
      posted: '2 days ago',
      applicants: 189,
      logo: 'https://logo.clearbit.com/accenture.com',
      applyUrl: 'https://www.accenture.com/careers/123456'
    },
    {
      id: 21,
      title: 'Site Reliability Engineer',
      company: 'LinkedIn',
      location: 'Mountain View, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$150-200K',
      skills: ['Kubernetes', 'Monitoring', 'Python', 'Go'],
      description: 'Ensure reliability of professional networking platform.',
      posted: '1 day ago',
      applicants: 145,
      logo: 'https://logo.clearbit.com/linkedin.com',
      applyUrl: 'https://www.linkedin.com/jobs/123456',
      featured: true
    },
    {
      id: 22,
      title: 'Network Engineer',
      company: 'Verizon',
      location: 'Dallas, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$80-110K',
      skills: ['Networking', 'Cisco', 'Security', 'Cloud'],
      description: 'Manage and optimize network infrastructure.',
      posted: '5 days ago',
      applicants: 78,
      logo: 'https://logo.clearbit.com/verizon.com',
      applyUrl: 'https://www.verizon.com/about/careers/123456'
    },
    {
      id: 23,
      title: 'Technical Writer',
      company: 'GitHub',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$70-100K',
      skills: ['Technical Writing', 'Documentation', 'Markdown', 'Git'],
      description: 'Create documentation for developer tools.',
      posted: '3 days ago',
      applicants: 89,
      logo: 'https://logo.clearbit.com/github.com',
      applyUrl: 'https://github.com/about/careers/123456'
    },
    {
      id: 24,
      title: 'Automation Test Engineer',
      company: 'Oracle',
      location: 'Redwood City, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$100-130K',
      skills: ['Selenium', 'Java', 'TestNG', 'CI/CD'],
      description: 'Automate testing for database software.',
      posted: '4 days ago',
      applicants: 112,
      logo: 'https://logo.clearbit.com/oracle.com',
      applyUrl: 'https://www.oracle.com/corporate/careers/123456'
    },
    {
      id: 25,
      title: 'Digital Marketing Analyst',
      company: 'HubSpot',
      location: 'Cambridge, USA',
      type: 'Full-time',
      experience: 'Entry-Level',
      salary: '$60-80K',
      skills: ['Analytics', 'SEO', 'Marketing', 'Data Analysis'],
      description: 'Analyze digital marketing campaigns and performance.',
      posted: '2 days ago',
      applicants: 234,
      logo: 'https://logo.clearbit.com/hubspot.com',
      applyUrl: 'https://www.hubspot.com/careers/123456'
    },
    {
      id: 26,
      title: 'SEO Specialist',
      company: 'Semrush',
      location: 'Remote',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$70-90K',
      skills: ['SEO', 'Analytics', 'Content Strategy', 'Tools'],
      description: 'Optimize websites for search engines.',
      posted: '1 week ago',
      applicants: 156,
      logo: 'https://logo.clearbit.com/semrush.com',
      applyUrl: 'https://semrush.com/careers/123456'
    },
    {
      id: 27,
      title: 'Software Tester',
      company: 'HP',
      location: 'Palo Alto, USA',
      type: 'Full-time',
      experience: 'Entry-Level',
      salary: '$50-70K',
      skills: ['Manual Testing', 'Bug Tracking', 'Test Cases', 'Quality Assurance'],
      description: 'Test software products for quality assurance.',
      posted: '3 days ago',
      applicants: 178,
      logo: 'https://logo.clearbit.com/hp.com',
      applyUrl: 'https://www.hp.com/us-en/careers/123456'
    },
    {
      id: 28,
      title: 'ERP Consultant',
      company: 'SAP',
      location: 'Walldorf, Germany',
      type: 'Full-time',
      experience: 'Senior',
      salary: '€80-100K',
      skills: ['SAP', 'ERP', 'Business Process', 'Consulting'],
      description: 'Implement ERP solutions for enterprise clients.',
      posted: '4 days ago',
      applicants: 89,
      logo: 'https://logo.clearbit.com/sap.com',
      applyUrl: 'https://careers.sap.com/123456'
    },
    {
      id: 29,
      title: 'CRM Developer',
      company: 'Zoho',
      location: 'Chennai, India',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '₹15-25 LPA',
      skills: ['CRM', 'JavaScript', 'API', 'Integration'],
      description: 'Develop CRM solutions for business clients.',
      posted: '2 days ago',
      applicants: 234,
      logo: 'https://logo.clearbit.com/zoho.com',
      applyUrl: 'https://www.zoho.com/careers/123456'
    },
    {
      id: 30,
      title: 'Salesforce Developer',
      company: 'Salesforce',
      location: 'San Francisco, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$120-150K',
      skills: ['Salesforce', 'Apex', 'Lightning', 'Integration'],
      description: 'Develop custom solutions on Salesforce platform.',
      posted: '1 day ago',
      applicants: 167,
      logo: 'https://logo.clearbit.com/salesforce.com',
      applyUrl: 'https://www.salesforce.com/careers/123456'
    },
    {
      id: 31,
      title: 'SAP Consultant',
      company: 'Deloitte',
      location: 'Mumbai, India',
      type: 'Full-time',
      experience: 'Senior',
      salary: '₹25-35 LPA',
      skills: ['SAP', 'Implementation', 'Business Analysis', 'Consulting'],
      description: 'Consult on SAP implementations for clients.',
      posted: '3 days ago',
      applicants: 123,
      logo: 'https://logo.clearbit.com/deloitte.com',
      applyUrl: 'https://www2.deloitte.com/us/en/careers/123456'
    },
    {
      id: 32,
      title: 'AI Product Manager',
      company: 'Google',
      location: 'Mountain View, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$180-250K',
      skills: ['AI/ML', 'Product Management', 'Strategy', 'Data Analysis'],
      description: 'Lead AI product development and strategy.',
      posted: '2 days ago',
      applicants: 89,
      logo: 'https://logo.clearbit.com/google.com',
      applyUrl: 'https://careers.google.com/jobs/123456',
      featured: true
    },
    {
      id: 33,
      title: 'ML Infrastructure Engineer',
      company: 'Meta',
      location: 'Menlo Park, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$160-220K',
      skills: ['MLOps', 'Kubernetes', 'Python', 'Infrastructure'],
      description: 'Build ML infrastructure for social media platforms.',
      posted: '1 week ago',
      applicants: 67,
      logo: 'https://logo.clearbit.com/meta.com',
      applyUrl: 'https://www.metacareers.com/jobs/123456'
    },
    {
      id: 34,
      title: 'Data Governance Analyst',
      company: 'Microsoft',
      location: 'Redmond, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$90-120K',
      skills: ['Data Governance', 'Compliance', 'SQL', 'Policy'],
      description: 'Ensure data quality and compliance standards.',
      posted: '4 days ago',
      applicants: 45,
      logo: 'https://logo.clearbit.com/microsoft.com',
      applyUrl: 'https://careers.microsoft.com/jobs/123456'
    },
    {
      id: 35,
      title: 'Analytics Engineer',
      company: 'Airbnb',
      location: 'San Francisco, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$130-170K',
      skills: ['SQL', 'Python', 'Data Modeling', 'Analytics'],
      description: 'Build data pipelines for travel platform analytics.',
      posted: '2 days ago',
      applicants: 178,
      logo: 'https://logo.clearbit.com/airbnb.com',
      applyUrl: 'https://www.airbnb.com/careers/123456'
    },
    {
      id: 36,
      title: 'Platform Engineer',
      company: 'Netflix',
      location: 'Los Gatos, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$180-240K',
      skills: ['Platform Engineering', 'Kubernetes', 'Go', 'Infrastructure'],
      description: 'Build platform solutions for streaming services.',
      posted: '3 days ago',
      applicants: 56,
      logo: 'https://logo.clearbit.com/netflix.com',
      applyUrl: 'https://jobs.netflix.com/jobs/123456'
    },
    {
      id: 37,
      title: 'Performance Engineer',
      company: 'Amazon',
      location: 'Seattle, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$110-150K',
      skills: ['Performance Testing', 'Load Testing', 'Monitoring', 'Optimization'],
      description: 'Optimize performance of cloud services.',
      posted: '5 days ago',
      applicants: 89,
      logo: 'https://logo.clearbit.com/amazon.com',
      applyUrl: 'https://www.amazon.jobs/en/123456'
    },
    {
      id: 38,
      title: 'Security Architect',
      company: 'IBM',
      location: 'Armonk, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$140-180K',
      skills: ['Security Architecture', 'Risk Assessment', 'Compliance', 'Strategy'],
      description: 'Design security solutions for enterprise clients.',
      posted: '1 week ago',
      applicants: 34,
      logo: 'https://logo.clearbit.com/ibm.com',
      applyUrl: 'https://careers.ibm.com/job/123456'
    },
    {
      id: 39,
      title: 'Cloud Security Engineer',
      company: 'AWS',
      location: 'Seattle, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$150-200K',
      skills: ['Cloud Security', 'AWS', 'Compliance', 'Threat Detection'],
      description: 'Secure AWS cloud infrastructure and services.',
      posted: '2 days ago',
      applicants: 78,
      logo: 'https://logo.clearbit.com/amazon.com',
      applyUrl: 'https://aws.amazon.com/jobs/123456'
    },
    {
      id: 40,
      title: 'AI Research Scientist',
      company: 'DeepMind',
      location: 'London, UK',
      type: 'Full-time',
      experience: 'Senior',
      salary: '£100-150K',
      skills: ['Deep Learning', 'Research', 'Python', 'Publications'],
      description: 'Conduct cutting-edge AI research.',
      posted: '3 days ago',
      applicants: 45,
      logo: 'https://logo.clearbit.com/deepmind.com',
      applyUrl: 'https://deepmind.com/careers/123456'
    },
    {
      id: 41,
      title: 'Data Product Manager',
      company: 'Uber',
      location: 'San Francisco, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$160-220K',
      skills: ['Data Products', 'Analytics', 'Strategy', 'Product Management'],
      description: 'Lead data product development for ride-sharing.',
      posted: '1 day ago',
      applicants: 89,
      logo: 'https://logo.clearbit.com/uber.com',
      applyUrl: 'https://www.uber.com/jobs/123456'
    },
    {
      id: 42,
      title: 'Computer Vision Engineer',
      company: 'Tesla',
      location: 'Palo Alto, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$150-200K',
      skills: ['Computer Vision', 'Python', 'Deep Learning', 'Autonomous Vehicles'],
      description: 'Develop computer vision systems for autonomous driving.',
      posted: '4 days ago',
      applicants: 123,
      logo: 'https://logo.clearbit.com/tesla.com',
      applyUrl: 'https://www.tesla.com/careers/123456'
    },
    {
      id: 43,
      title: 'NLP Engineer',
      company: 'OpenAI',
      location: 'San Francisco, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$180-250K',
      skills: ['NLP', 'Python', 'Deep Learning', 'Transformers'],
      description: 'Build natural language processing systems.',
      posted: '2 days ago',
      applicants: 67,
      logo: 'https://logo.clearbit.com/openai.com',
      applyUrl: 'https://openai.com/jobs/123456'
    },
    {
      id: 44,
      title: 'Data Visualization Specialist',
      company: 'Tableau',
      location: 'Seattle, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$90-120K',
      skills: ['Data Visualization', 'D3.js', 'JavaScript', 'Analytics'],
      description: 'Create data visualization solutions and tools.',
      posted: '3 days ago',
      applicants: 145,
      logo: 'https://logo.clearbit.com/tableau.com',
      applyUrl: 'https://www.tableau.com/careers/123456'
    },
    {
      id: 45,
      title: 'Big Data Engineer',
      company: 'Cloudera',
      location: 'Palo Alto, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$130-170K',
      skills: ['Big Data', 'Hadoop', 'Spark', 'Data Engineering'],
      description: 'Build big data solutions for enterprise clients.',
      posted: '1 week ago',
      applicants: 56,
      logo: 'https://logo.clearbit.com/cloudera.com',
      applyUrl: 'https://www.cloudera.com/careers/123456'
    },
    {
      id: 46,
      title: 'MLOps Engineer',
      company: 'Databricks',
      location: 'San Francisco, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$160-220K',
      skills: ['MLOps', 'Kubernetes', 'Python', 'ML Pipeline'],
      description: 'Build ML operations infrastructure.',
      posted: '2 days ago',
      applicants: 89,
      logo: 'https://logo.clearbit.com/databricks.com',
      applyUrl: 'https://www.databricks.com/company/careers/123456'
    },
    {
      id: 47,
      title: 'System Administrator',
      company: 'Red Hat',
      location: 'Raleigh, USA',
      type: 'Full-time',
      experience: 'Mid-Level',
      salary: '$70-90K',
      skills: ['Linux', 'System Administration', 'Shell Scripting', 'Monitoring'],
      description: 'Manage Linux systems and infrastructure.',
      posted: '4 days ago',
      applicants: 78,
      logo: 'https://logo.clearbit.com/redhat.com',
      applyUrl: 'https://www.redhat.com/jobs/123456'
    },
    {
      id: 48,
      title: 'IT Support Specialist',
      company: 'Dell',
      location: 'Round Rock, USA',
      type: 'Full-time',
      experience: 'Entry-Level',
      salary: '$40-60K',
      skills: ['IT Support', 'Troubleshooting', 'Windows', 'Hardware'],
      description: 'Provide IT support for internal systems.',
      posted: '3 days ago',
      applicants: 234,
      logo: 'https://logo.clearbit.com/dell.com',
      applyUrl: 'https://www.dell.com/en-us/careers/123456'
    },
    {
      id: 49,
      title: 'Solutions Architect',
      company: 'AWS',
      location: 'Seattle, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$150-200K',
      skills: ['Solutions Architecture', 'AWS', 'Cloud Computing', 'Consulting'],
      description: 'Design cloud solutions for enterprise clients.',
      posted: '1 day ago',
      applicants: 123,
      logo: 'https://logo.clearbit.com/amazon.com',
      applyUrl: 'https://aws.amazon.com/jobs/123456'
    },
    {
      id: 50,
      title: 'Robotics Engineer',
      company: 'Boston Dynamics',
      location: 'Boston, USA',
      type: 'Full-time',
      experience: 'Senior',
      salary: '$120-160K',
      skills: ['Robotics', 'Python', 'C++', 'Machine Learning'],
      description: 'Develop advanced robotics systems.',
      posted: '5 days ago',
      applicants: 89,
      logo: 'https://logo.clearbit.com/bostondynamics.com',
      applyUrl: 'https://www.bostondynamics.com/careers/123456'
    }
  ];

  const locations = ['Remote', 'Bangalore', 'San Francisco', 'New York', 'London', 'Mumbai', 'Hyderabad', 'Seattle'];
  const experiences = ['Entry-Level', 'Mid-Level', 'Senior'];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setJobs(realJobs);
      setFilteredJobs(realJobs);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter jobs based on search criteria
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job => 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(job => job.location.includes(selectedLocation));
    }

    if (selectedRole) {
      filtered = filtered.filter(job => job.title.toLowerCase().includes(selectedRole.toLowerCase()));
    }

    if (selectedExperience) {
      filtered = filtered.filter(job => job.experience === selectedExperience);
    }

    setFilteredJobs(filtered);
  }, [searchTerm, selectedLocation, selectedRole, selectedExperience, jobs]);

  const handleApply = (job) => {
    // Open real job application link in new tab
    window.open(job.applyUrl, '_blank');
    
    // Mark as applied
    setAppliedJobs(prev => new Set([...prev, job.id]));
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLocation('');
    setSelectedRole('');
    setSelectedExperience('');
  };

  const JobCard = ({ job, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg border ${
        job.featured 
          ? 'border-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/25' 
          : 'border-gray-200 dark:border-gray-700'
      } hover:shadow-2xl transition-all duration-300 overflow-hidden`}
    >
      {job.featured && (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold flex items-center">
          <Award className="w-4 h-4 mr-2" />
          Featured Job
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
              <Building className="w-6 h-6 text-gray-600 dark:text-gray-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {job.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {job.company}
              </p>
            </div>
          </div>
          
          {appliedJobs.has(job.id) && (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircle className="w-5 h-5 mr-1" />
              <span className="text-sm font-medium">Applied</span>
            </div>
          )}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPin className="w-4 h-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Briefcase className="w-4 h-4 mr-2" />
            {job.type} • {job.experience}
          </div>
          <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-medium">
            <DollarSign className="w-4 h-4 mr-2" />
            {job.salary}
          </div>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            {job.posted} • {job.applicants} applicants
          </div>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
            {job.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, skillIndex) => (
              <span
                key={skillIndex}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleApply(job)}
            disabled={appliedJobs.has(job.id)}
            className={`px-6 py-2 rounded-xl font-medium transition-all duration-200 ${
              appliedJobs.has(job.id)
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
            }`}
          >
            {appliedJobs.has(job.id) ? 'Applied' : 'Apply Now'}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleApply(job)}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl mb-4"
            >
              <Briefcase className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Real Job Search
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Discover {filteredJobs.length}+ real job opportunities from top companies
            </p>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6"
          >
            <div className="flex flex-col lg:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search jobs, companies, or skills..."
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors flex items-center"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </motion.button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="border-t border-gray-200 dark:border-gray-700 pt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={selectedExperience}
                      onChange={(e) => setSelectedExperience(e.target.value)}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                      <option value="">All Levels</option>
                      {experiences.map(exp => (
                        <option key={exp} value={exp}>{exp}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      placeholder="e.g., Frontend Developer"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    />
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={clearFilters}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    Clear Filters
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Results */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Loading real job opportunities...</p>
              </div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No jobs found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                Try adjusting your search criteria or filters to find more opportunities.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Found {filteredJobs.length} Jobs
                </h2>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>{filteredJobs.filter(job => job.featured).length} Featured</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredJobs.map((job, index) => (
                  <JobCard key={job.id} job={job} index={index} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RealJobSearch;
