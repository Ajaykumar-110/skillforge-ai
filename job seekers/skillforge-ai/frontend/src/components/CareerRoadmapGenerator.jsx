import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Brain, 
  BookOpen, 
  Award, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Code,
  Briefcase,
  GraduationCap,
  Star,
  ArrowRight,
  Download,
  RefreshCw,
  AlertCircle,
  Lightbulb,
  Rocket
} from 'lucide-react';

const CareerRoadmapGenerator = () => {
  const [user, setUser] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        generateRoadmap(parsedUser);
      } catch (error) {
        console.error('Error parsing user data:', error);
        setError('Unable to load user data');
      }
    } else {
      setError('Please register or login to generate your personalized roadmap');
    }
    setLoading(false);
  }, []);

  const generateRoadmap = (userData) => {
    setGenerating(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const userSkills = userData?.skills || ['JavaScript', 'React'];
      const targetRole = userData?.targetJobRole || 'Full Stack Developer';
      const experienceLevel = userData?.experienceLevel || 'mid';
      const resumeAnalysis = userData?.resumeAnalysis || {};
      
      const generatedRoadmap = createPersonalizedRoadmap(userSkills, targetRole, experienceLevel, resumeAnalysis);
      setRoadmap(generatedRoadmap);
      setGenerating(false);
    }, 2000);
  };

  const createPersonalizedRoadmap = (userSkills, targetRole, experienceLevel, resumeAnalysis) => {
    // Define role-specific roadmaps
    const roleRoadmaps = {
      'Full Stack Developer': {
        goal: 'Full Stack Developer',
        currentSkills: userSkills,
        missingSkills: ['Node.js', 'MongoDB', 'Docker', 'AWS', 'TypeScript'],
        steps: [
          {
            title: 'Foundation Skills',
            description: 'Strengthen your core web development fundamentals',
            learn: ['Advanced JavaScript concepts', 'ES6+ features', 'Async programming', 'DOM manipulation'],
            tools: ['VS Code', 'Chrome DevTools', 'Postman'],
            project: 'Build a real-time chat application with WebSocket',
            estimatedTime: '2-3 weeks'
          },
          {
            title: 'Backend Development',
            description: 'Master server-side programming and database management',
            learn: ['Node.js & Express.js', 'RESTful APIs', 'MongoDB/PostgreSQL', 'Authentication'],
            tools: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Postman'],
            project: 'Create a complete CRUD API with user authentication',
            estimatedTime: '3-4 weeks'
          },
          {
            title: 'Frontend Mastery',
            description: 'Advanced React development and state management',
            learn: ['React Hooks', 'Redux/Context API', 'React Router', 'Performance optimization'],
            tools: ['React', 'Redux', 'React Router', 'Webpack'],
            project: 'Build a complex dashboard with data visualization',
            estimatedTime: '2-3 weeks'
          },
          {
            title: 'DevOps & Deployment',
            description: 'Learn deployment and containerization',
            learn: ['Docker', 'CI/CD pipelines', 'AWS basics', 'Environment management'],
            tools: ['Docker', 'GitHub Actions', 'AWS', 'Nginx'],
            project: 'Deploy your full-stack app to AWS with Docker',
            estimatedTime: '2 weeks'
          },
          {
            title: 'TypeScript Integration',
            description: 'Add type safety to your applications',
            learn: ['TypeScript basics', 'Type definitions', 'Advanced typing', 'Migration strategies'],
            tools: ['TypeScript', 'DefinitelyTyped', 'ts-node'],
            project: 'Convert an existing JavaScript project to TypeScript',
            estimatedTime: '1-2 weeks'
          },
          {
            title: 'Testing & Quality Assurance',
            description: 'Implement comprehensive testing strategies',
            learn: ['Unit testing', 'Integration testing', 'E2E testing', 'TDD'],
            tools: ['Jest', 'React Testing Library', 'Cypress', 'Supertest'],
            project: 'Add comprehensive test suite to your applications',
            estimatedTime: '2 weeks'
          },
          {
            title: 'Portfolio & GitHub',
            description: 'Showcase your projects professionally',
            learn: ['GitHub best practices', 'README writing', 'Documentation', 'Code quality'],
            tools: ['GitHub', 'GitHub Pages', 'Markdown', 'Git'],
            project: 'Create a professional portfolio website with project showcases',
            estimatedTime: '1 week'
          },
          {
            title: 'Interview Preparation',
            description: 'Prepare for technical interviews',
            learn: ['Data structures', 'Algorithms', 'System design', 'Behavioral questions'],
            tools: ['LeetCode', 'HackerRank', 'Pramp', 'Whiteboard'],
            project: 'Complete 50+ coding challenges and mock interviews',
            estimatedTime: '3-4 weeks'
          }
        ],
        certifications: [
          {
            name: 'AWS Certified Developer',
            provider: 'Amazon Web Services',
            value: 'Cloud deployment skills',
            difficulty: 'Intermediate'
          },
          {
            name: 'MongoDB Certified Developer',
            provider: 'MongoDB',
            value: 'Database expertise',
            difficulty: 'Beginner'
          }
        ],
        checklist: [
          'Built 3+ full-stack projects',
          'Deployed applications to production',
          'Strong understanding of REST APIs',
          'Experience with database design',
          'Knowledge of deployment and CI/CD',
          'Active GitHub profile with quality code',
          'Completed 50+ coding challenges',
          'Mock interview practice completed'
        ]
      },
      'Data Scientist': {
        goal: 'Data Scientist',
        currentSkills: userSkills,
        missingSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization'],
        steps: [
          {
            title: 'Python & Statistics Foundation',
            description: 'Master Python programming and statistical concepts',
            learn: ['Python basics', 'NumPy', 'Pandas', 'Statistics', 'Probability'],
            tools: ['Python', 'Jupyter Notebook', 'NumPy', 'Pandas'],
            project: 'Analyze a real dataset and generate insights',
            estimatedTime: '3-4 weeks'
          },
          {
            title: 'Machine Learning Fundamentals',
            description: 'Learn core ML algorithms and concepts',
            learn: ['Supervised learning', 'Unsupervised learning', 'Model evaluation', 'Feature engineering'],
            tools: ['Scikit-learn', 'MLflow', 'Jupyter'],
            project: 'Build a predictive model for a real-world problem',
            estimatedTime: '4-5 weeks'
          },
          {
            title: 'Data Visualization',
            description: 'Create compelling data visualizations and dashboards',
            learn: ['Matplotlib', 'Seaborn', 'Plotly', 'Dashboard design'],
            tools: ['Matplotlib', 'Seaborn', 'Plotly', 'Tableau'],
            project: 'Create an interactive dashboard with multiple visualizations',
            estimatedTime: '2-3 weeks'
          },
          {
            title: 'Deep Learning',
            description: 'Explore neural networks and deep learning',
            learn: ['Neural networks', 'CNN', 'RNN', 'Transfer learning'],
            tools: ['TensorFlow', 'Keras', 'PyTorch'],
            project: 'Build a deep learning model for image or text classification',
            estimatedTime: '4-5 weeks'
          },
          {
            title: 'Big Data Technologies',
            description: 'Work with large-scale data processing',
            learn: ['Apache Spark', 'Hadoop', 'Distributed computing'],
            tools: ['Apache Spark', 'Hadoop', 'AWS EMR'],
            project: 'Process and analyze a large dataset using Spark',
            estimatedTime: '3 weeks'
          },
          {
            title: 'SQL & Database Skills',
            description: 'Master database querying and management',
            learn: ['Advanced SQL', 'Database design', 'Performance optimization'],
            tools: ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB'],
            project: 'Design and optimize a database schema for a data-intensive application',
            estimatedTime: '2 weeks'
          },
          {
            title: 'Portfolio & Kaggle',
            description: 'Build a strong data science portfolio',
            learn: ['Kaggle competitions', 'Project documentation', 'Storytelling'],
            tools: ['Kaggle', 'GitHub', 'Medium', 'Tableau Public'],
            project: 'Participate in Kaggle competitions and document your approach',
            estimatedTime: '4-6 weeks'
          },
          {
            title: 'Interview Preparation',
            description: 'Prepare for data science interviews',
            learn: ['Statistics questions', 'ML concepts', 'Case studies', 'Programming'],
            tools: ['LeetCode', 'Interview Query', 'Glassdoor'],
            project: 'Complete mock interviews and case study challenges',
            estimatedTime: '3-4 weeks'
          }
        ],
        certifications: [
          {
            name: 'IBM Data Science Professional Certificate',
            provider: 'IBM',
            value: 'Comprehensive data science foundation',
            difficulty: 'Beginner'
          },
          {
            name: 'Google Data Analytics Professional Certificate',
            provider: 'Google',
            value: 'Industry-recognized analytics skills',
            difficulty: 'Beginner'
          }
        ],
        checklist: [
          'Completed 5+ data science projects',
          'Participated in Kaggle competitions',
          'Strong Python and SQL skills',
          'Experience with ML libraries',
          'Data visualization portfolio',
          'Statistical analysis knowledge',
          'Understanding of ML algorithms',
          'Communication and storytelling skills'
        ]
      },
      'Machine Learning Engineer': {
        goal: 'Machine Learning Engineer',
        currentSkills: userSkills,
        missingSkills: ['Python', 'TensorFlow', 'MLOps', 'Cloud Platforms', 'Software Engineering'],
        steps: [
          {
            title: 'Advanced Python & Software Engineering',
            description: 'Master Python for ML and software engineering principles',
            learn: ['Advanced Python', 'OOP', 'Design patterns', 'Testing'],
            tools: ['Python', 'pytest', 'SOLID principles'],
            project: 'Build a well-structured Python application with unit tests',
            estimatedTime: '3 weeks'
          },
          {
            title: 'Machine Learning Deep Dive',
            description: 'Master ML algorithms and deep learning frameworks',
            learn: ['TensorFlow', 'PyTorch', 'ML pipelines', 'Model optimization'],
            tools: ['TensorFlow', 'PyTorch', 'MLflow', 'Weights & Biases'],
            project: 'Build and deploy an end-to-end ML pipeline',
            estimatedTime: '5-6 weeks'
          },
          {
            title: 'MLOps & Deployment',
            description: 'Learn to deploy and maintain ML models in production',
            learn: ['Docker', 'Kubernetes', 'CI/CD', 'Model monitoring'],
            tools: ['Docker', 'Kubernetes', 'Jenkins', 'Prometheus'],
            project: 'Deploy a ML model with automated retraining',
            estimatedTime: '4 weeks'
          },
          {
            title: 'Cloud Platforms',
            description: 'Master cloud services for ML',
            learn: ['AWS SageMaker', 'Google AI Platform', 'Azure ML'],
            tools: ['AWS', 'GCP', 'Azure', 'Terraform'],
            project: 'Deploy ML models on multiple cloud platforms',
            estimatedTime: '3 weeks'
          },
          {
            title: 'Data Engineering',
            description: 'Build robust data pipelines for ML',
            learn: ['Apache Airflow', 'Apache Spark', 'Data streaming'],
            tools: ['Apache Airflow', 'Spark', 'Kafka', 'dbt'],
            project: 'Create a real-time data pipeline for ML',
            estimatedTime: '4 weeks'
          },
          {
            title: 'Model Optimization',
            description: 'Optimize ML models for production',
            learn: ['Model compression', 'Quantization', 'Edge deployment'],
            tools: ['TensorFlow Lite', 'ONNX', 'TensorRT'],
            project: 'Optimize a model for edge device deployment',
            estimatedTime: '3 weeks'
          },
          {
            title: 'Research & Innovation',
            description: 'Stay updated with latest ML research',
            learn: ['Reading papers', 'Reproducing research', 'Experimentation'],
            tools: ['arXiv', 'Papers with Code', 'Google Colab'],
            project: 'Implement a recent research paper',
            estimatedTime: '2 weeks'
          },
          {
            title: 'Portfolio & System Design',
            description: 'Build MLOps portfolio and system design skills',
            learn: ['System design', 'Architecture patterns', 'Documentation'],
            tools: ['GitHub', 'Architecture diagrams', 'Technical writing'],
            project: 'Design and document an ML system architecture',
            estimatedTime: '2 weeks'
          }
        ],
        certifications: [
          {
            name: 'AWS Certified Machine Learning Engineer',
            provider: 'Amazon Web Services',
            value: 'Cloud ML expertise',
            difficulty: 'Advanced'
          },
          {
            name: 'TensorFlow Developer Certificate',
            provider: 'Google',
            value: 'TensorFlow proficiency',
            difficulty: 'Intermediate'
          }
        ],
        checklist: [
          'Built end-to-end ML pipelines',
          'Deployed models to production',
          'Experience with cloud ML platforms',
          'Strong software engineering skills',
          'Understanding of MLOps principles',
          'Model optimization experience',
          'Data pipeline development',
          'System design knowledge'
        ]
      },
      'DevOps Engineer': {
        goal: 'DevOps Engineer',
        currentSkills: userSkills,
        missingSkills: ['Linux', 'Docker', 'Kubernetes', 'CI/CD', 'Cloud Platforms'],
        steps: [
          {
            title: 'Linux & Scripting',
            description: 'Master Linux administration and shell scripting',
            learn: ['Linux commands', 'Shell scripting', 'System administration'],
            tools: ['Linux', 'Bash', 'PowerShell', 'Vim'],
            project: 'Automate system administration tasks with scripts',
            estimatedTime: '2-3 weeks'
          },
          {
            title: 'Containerization with Docker',
            description: 'Learn containerization and Docker fundamentals',
            learn: ['Docker concepts', 'Dockerfile', 'Docker Compose', 'Container orchestration'],
            tools: ['Docker', 'Docker Compose', 'Container registry'],
            project: 'Containerize a multi-service application',
            estimatedTime: '2 weeks'
          },
          {
            title: 'Kubernetes Mastery',
            description: 'Master container orchestration with Kubernetes',
            learn: ['K8s architecture', 'Pods, Services', 'Deployments', 'Helm'],
            tools: ['Kubernetes', 'Helm', 'Kustomize', 'kubectl'],
            project: 'Deploy and manage applications on Kubernetes',
            estimatedTime: '3-4 weeks'
          },
          {
            title: 'CI/CD Pipelines',
            description: 'Build automated deployment pipelines',
            learn: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Pipeline as code'],
            tools: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'ArgoCD'],
            project: 'Create a complete CI/CD pipeline for an application',
            estimatedTime: '3 weeks'
          },
          {
            title: 'Cloud Infrastructure',
            description: 'Master cloud platforms and infrastructure as code',
            learn: ['AWS', 'Azure', 'GCP', 'Terraform', 'CloudFormation'],
            tools: ['AWS', 'Terraform', 'CloudFormation', 'Pulumi'],
            project: 'Deploy infrastructure using IaC',
            estimatedTime: '4 weeks'
          },
          {
            title: 'Monitoring & Observability',
            description: 'Implement monitoring and logging solutions',
            learn: ['Prometheus', 'Grafana', 'ELK stack', 'APM tools'],
            tools: ['Prometheus', 'Grafana', 'ELK', 'Datadog'],
            project: 'Set up comprehensive monitoring for applications',
            estimatedTime: '2-3 weeks'
          },
          {
            title: 'Security & Compliance',
            description: 'Learn DevSecOps practices and security automation',
            learn: ['Security scanning', 'Compliance automation', 'Secret management'],
            tools: ['SonarQube', 'OWASP ZAP', 'Vault', 'Compliance tools'],
            project: 'Implement security scanning in CI/CD',
            estimatedTime: '2 weeks'
          },
          {
            title: 'Infrastructure Optimization',
            description: 'Learn cost optimization and performance tuning',
            learn: ['Cost management', 'Performance optimization', 'Scaling strategies'],
            tools: ['Cloud cost tools', 'Performance monitoring', 'Autoscaling'],
            project: 'Optimize infrastructure costs and performance',
            estimatedTime: '2 weeks'
          }
        ],
        certifications: [
          {
            name: 'Kubernetes Administrator (CKA)',
            provider: 'CNCF',
            value: 'Kubernetes expertise',
            difficulty: 'Intermediate'
          },
          {
            name: 'AWS DevOps Engineer',
            provider: 'Amazon Web Services',
            value: 'AWS DevOps skills',
            difficulty: 'Intermediate'
          }
        ],
        checklist: [
          'Managed Kubernetes clusters',
          'Built CI/CD pipelines',
          'Infrastructure as code experience',
          'Monitoring and logging setup',
          'Security automation',
          'Cost optimization',
          'Cloud platform expertise',
          'Troubleshooting skills'
        ]
      }
    };

    // Get the appropriate roadmap or default to Full Stack Developer
    const selectedRoadmap = roleRoadmaps[targetRole] || roleRoadmaps['Full Stack Developer'];
    
    // Customize missing skills based on user's current skills
    const missingSkills = selectedRoadmap.missingSkills.filter(skill => !userSkills.includes(skill));
    
    return {
      ...selectedRoadmap,
      missingSkills,
      personalizedTips: generatePersonalizedTips(userSkills, targetRole, experienceLevel),
      estimatedTotalTime: selectedRoadmap.steps.reduce((total, step) => {
        const weeks = parseInt(step.estimatedTime) || 2;
        return total + weeks;
      }, 0)
    };
  };

  const generatePersonalizedTips = (skills, targetRole, experienceLevel) => {
    const tips = [];
    
    if (experienceLevel === 'entry') {
      tips.push('Focus on building strong fundamentals before advanced topics');
      tips.push('Start with small projects and gradually increase complexity');
    }
    
    if (skills.length < 3) {
      tips.push('Consider learning complementary skills to broaden your expertise');
    }
    
    if (targetRole.includes('Machine Learning') && !skills.includes('Python')) {
      tips.push('Python is essential for ML roles - prioritize learning it first');
    }
    
    tips.push('Join online communities and forums related to your target role');
    tips.push('Network with professionals in your desired field');
    
    return tips;
  };

  const regenerateRoadmap = () => {
    if (user) {
      generateRoadmap(user);
    }
  };

  const downloadRoadmap = () => {
    if (!roadmap) return;
    
    const roadmapText = `
Career Roadmap: ${roadmap.goal}

Current Skills: ${roadmap.currentSkills.join(', ')}
Missing Skills: ${roadmap.missingSkills.join(', ')}
Estimated Time: ${roadmap.estimatedTotalTime} weeks

${roadmap.steps.map((step, index) => `
Step ${index + 1}: ${step.title}
${step.description}
Learn: ${step.learn.join(', ')}
Tools: ${step.tools.join(', ')}
Project: ${step.project}
Estimated Time: ${step.estimatedTime}
`).join('\n')}

Certifications:
${roadmap.certifications.map(cert => `- ${cert.name} (${cert.provider})`).join('\n')}

Final Readiness Checklist:
${roadmap.checklist.map(item => `- ${item}`).join('\n')}

Personalized Tips:
${roadmap.personalizedTips.map(tip => `- ${tip}`).join('\n')}
    `.trim();

    const blob = new Blob([roadmapText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `career-roadmap-${roadmap.goal.toLowerCase().replace(' ', '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your career roadmap...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Unable to Generate Roadmap</h2>
          <p className="text-gray-600 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-xl mb-4"
            >
              <Target className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Your Personalized Career Roadmap
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              AI-powered career development plan tailored to your skills and goals
            </p>
          </div>

          {generating ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">AI is analyzing your profile and generating your personalized roadmap...</p>
            </div>
          ) : roadmap && (
            <>
              {/* Overview */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-8 border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Rocket className="w-6 h-6 mr-3 text-purple-600" />
                    Career Goal: {roadmap.goal}
                  </h2>
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={regenerateRoadmap}
                      className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={downloadRoadmap}
                      className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800"
                    >
                      <Download className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </motion.button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Current Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {roadmap.currentSkills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Skills to Learn</h3>
                    <div className="flex flex-wrap gap-2">
                      {roadmap.missingSkills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Estimated Timeline</h3>
                    <div className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                      {roadmap.estimatedTotalTime} weeks
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Personalized Tips */}
              {roadmap.personalizedTips.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-8 border border-blue-200 dark:border-blue-800"
                >
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
                    Personalized Tips for You
                  </h3>
                  <div className="space-y-2">
                    {roadmap.personalizedTips.map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Roadmap Steps */}
              <div className="space-y-6 mb-8">
                {roadmap.steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold mr-4">
                            {index + 1}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                          </div>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="w-4 h-4 inline mr-1" />
                          {step.estimatedTime}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                            <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                            What to Learn
                          </h4>
                          <ul className="space-y-1">
                            {step.learn.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                                <ArrowRight className="w-3 h-3 mr-2 text-gray-400" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                            <Code className="w-4 h-4 mr-2 text-green-600" />
                            Tools & Technologies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {step.tools.map((tool, toolIndex) => (
                              <span key={toolIndex} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs">
                                {tool}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2 flex items-center">
                          <Briefcase className="w-4 h-4 mr-2 text-purple-600" />
                          Practical Project
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">{step.project}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <Award className="w-6 h-6 mr-3 text-orange-600" />
                  Certifications (Optional but Valuable)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roadmap.certifications.map((cert, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900 dark:text-white">{cert.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{cert.provider}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{cert.value}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          cert.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          cert.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {cert.difficulty}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Final Readiness Checklist */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800"
              >
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
                  Final Readiness Checklist
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roadmap.checklist.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-green-600 border-green-300 rounded focus:ring-green-500 mr-3"
                      />
                      <span className="text-gray-700 dark:text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <p className="text-green-800 dark:text-green-200 text-center font-medium">
                    🎉 Complete all items in this checklist to be ready for your {roadmap.goal} role!
                  </p>
                </div>
              </motion.div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default CareerRoadmapGenerator;
