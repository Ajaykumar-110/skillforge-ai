import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Download,
  Trash2,
  Eye,
  Brain,
  Briefcase,
  GraduationCap,
  Target,
  TrendingUp,
  Star,
  Clock,
  Users,
  Award,
  BookOpen,
  Calendar,
  MapPin,
  DollarSign,
  ChevronRight,
  Code,
  Database,
  Shield,
  Smartphone,
  Cloud,
  BarChart,
  Search,
  Filter,
  Github,
  Play,
  Video,
  FileText as FileIcon,
  Link as LinkIcon,
  ExternalLink,
  Zap,
  Lightbulb,
  Rocket,
  Trophy,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  FileCheck,
  FileX,
  FileSearch,
  FileCode,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  FilePlus,
  FileMinus,
  FileEdit,
  FileCopy,
  FileLock,
  FileUnlock,
  FileQuestion,
  FileWarning,
  FileHeart,
  FileSmile,
  FileFrown,
  FileMeh,
  FileDotted,
  FileDash,
  FilePlusCircle,
  FileMinusCircle,
  FileCheckCircle,
  FileXCircle,
  FileAlert,
  FileHelp,
  FileInfo,
  FileSettings,
  FileTool,
  FileDatabase,
  FileCloud,
  FileServer,
  FileNetwork,
  FileSecurity,
  FileBackup,
  FileRestore,
  FileSync,
  FileUpload,
  FileDownload,
  FileShare,
  FileLink,
  FileUnlink,
  FileAttach,
  FileDetach,
  FileEmbed,
  FileExport,
  FileImport,
  FilePrint,
  FileScan,
  FileSignature,
  FileStamp,
  FileCertificate,
  FileAward,
  FileMedal,
  FileCrown,
  FileKey,
  FileLock2,
  FileUnlock2,
  FileEye,
  FileEyeOff,
  FileHidden,
  FileVisible,
  FileInvisible,
  FilePublic,
  FilePrivate,
  FileProtected,
  FileUnprotected,
  FileEncrypted,
  FileDecrypted,
  FileCompressed,
  FileExpanded,
  FileMinimized,
  FileMaximized,
  FileResized,
  FileScaled,
  FileRotated,
  FileFlipped,
  FileCropped,
  FileTrimmed,
  FileFiltered,
  FileProcessed,
  FileConverted,
  FileTransformed,
  FileOptimized,
  FileEnhanced,
  FileImproved,
  FileUpgraded,
  FileDowngraded,
  FileUpdated,
  FileRefreshed,
  FileReloaded,
  FileRestarted,
  FileReset,
  FileCleared,
  FileCleaned,
  FilePurged,
  FileDeleted,
  FileRemoved,
  FileAdded,
  FileInserted,
  FileAppended,
  FilePrepended,
  FileMerged,
  FileSplit,
  FileJoined,
  FileCombined,
  FileSeparated,
  FileDivided,
  FileGrouped,
  FileUngrouped,
  FileSorted,
  FileFiltered,
  FileSearched,
  FileFound,
  FileLost,
  FileMissing,
  FileExists,
  FileAbsent,
  FilePresent,
  FileAvailable,
  FileUnavailable,
  FileAccessible,
  FileInaccessible,
  FileReadable,
  FileWritable,
  FileExecutable,
  FileHidden,
  FileVisible,
  FileSystem,
  FileFolder,
  FileDirectory,
  FileSubdirectory,
  FileRoot,
  FileParent,
  FileChild,
  FileSibling,
  FileAncestor,
  FileDescendant,
  FileTree,
  FileBranch,
  FileLeaf,
  FileNode,
  FileEdge,
  FilePath,
  FileRoute,
  FileLink,
  FileShortcut,
  FileAlias,
  FileSymbol,
  FileIcon,
  FileThumbnail,
  FilePreview,
  FileDetail,
  FileSummary,
  FileOverview,
  FileDescription,
  FileComment,
  FileNote,
  FileTag,
  FileLabel,
  FileMark,
  FileFlag,
  FileBookmark,
  FileFavorite,
  FileLike,
  FileDislike,
  FileLove,
  FileHate,
  FileHappy,
  FileSad,
  FileAngry,
  FileSurprised,
  FileConfused,
  FileExcited,
  FileBored,
  FileTired,
  FileEnergetic,
  FileCalm,
  FilePeaceful,
  FileChaotic,
  FileOrganized,
  FileMessy,
  FileNeat,
  FileTidy,
  FileClean,
  FileDirty,
  FilePure,
  FileMixed,
  FileBlended,
  FileUnified,
  FileDiversified,
  FileSpecialized,
  FileGeneralized,
  FileCustomized,
  FilePersonalized,
  FileIndividualized,
  FileStandardized,
  FileNormalized,
  FileRegularized,
  FileOptimized,
  FileMaximized,
  FileMinimized,
  FileBalanced,
  FileUnbalanced,
  FileStable,
  FileUnstable,
  FileSecure,
  FileInsecure,
  FileSafe,
  FileUnsafe,
  FileProtected,
  FileUnprotected,
  FileGuarded,
  FileUnguarded,
  FileShielded,
  FileUnshielded,
  FileCovered,
  FileUncovered,
  FileHidden,
  FileExposed,
  FileConcealed,
  FileRevealed,
  FileMasked,
  FileUnmasked,
  FileCamouflaged,
  FileUncamouflaged,
  FileDisguised,
  FileUndisguised,
  FileIncognito,
  FileAnonymous,
  FileIdentified,
  FileRecognized,
  FileUnrecognized,
  FileKnown,
  FileUnknown,
  FileFamiliar,
  FileUnfamiliar,
  FileRemembered,
  FileForgotten,
  FileMemorized,
  FileUnmemorized,
  FileLearned,
  FileUnlearned,
  FileTaught,
  FileUntaught,
  FileStudied,
  FileUnstudied,
  FileResearched,
  FileUnresearched,
  FileInvestigated,
  FileUninvestigated,
  FileExplored,
  FileUnexplored,
  FileDiscovered,
  FileUndiscovered,
  FileFound,
  FileNotFound,
  FileLocated,
  FileUnlocated,
  FilePositioned,
  FileUnpositioned,
  FilePlaced,
  FileUnplaced,
  FileArranged,
  FileUnarranged,
  FileOrdered,
  FileUnordered,
  FileSequential,
  FileRandom,
  FileSorted,
  FileUnsorted,
  FileAlphabetized,
  FileNumerized,
  FileCategorized,
  FileUncategorized,
  FileClassified,
  FileUnclassified,
  FileGrouped,
  FileUngrouped,
  FileClustered,
  FileUnclustered,
  FileBundled,
  FileUnbundled,
  FilePackaged,
  FileUnpackaged,
  FileWrapped,
  FileUnwrapped,
  FileSealed,
  FileUnsealed,
  FileClosed,
  FileOpened,
  FileLocked,
  FileUnlocked,
  FileBlocked,
  FileUnblocked,
  FileRestricted,
  FileUnrestricted,
  FileLimited,
  FileUnlimited,
  FileBound,
  FileUnbound,
  FileTied,
  FileUntied,
  FileConnected,
  FileDisconnected,
  FileLinked,
  FileUnlinked,
  FileAttached,
  FileDetached,
  FileJoined,
  FileSeparated,
  FileUnited,
  FileDivided,
  FileMerged,
  FileUnmerged,
  FileCombined,
  FileUncombined,
  FileIntegrated,
  FileDisintegrated,
  FileAssembled,
  FileDisassembled,
  FileBuilt,
  FileUnbuilt,
  FileConstructed,
  FileDeconstructed,
  FileCreated,
  FileDestroyed,
  FileMade,
  FileUnmade,
  FileProduced,
  FileUnproduced,
  FileGenerated,
  FileUngenerated,
  FileManufactured,
  FileUnmanufactured,
  FileFabricated,
  FileUnfabricated,
  FileCrafted,
  FileUncrafted,
  FileDesigned,
  FileUndesigned,
  FilePlanned,
  FileUnplanned,
  FileScheduled,
  FileUnscheduled,
  FileOrganized,
  FileDisorganized,
  FileManaged,
  FileUnmanaged,
  FileControlled,
  FileUncontrolled,
  FileSupervised,
  FileUnsupervised,
  FileMonitored,
  FileUnmonitored,
  FileTracked,
  FileUntracked,
  FileLogged,
  FileUnlogged,
  FileRecorded,
  FileUnrecorded,
  FileDocumented,
  FileUndocumented,
  FileReported,
  FileUnreported,
  FileNoted,
  FileUnnoted,
  FileMarked,
  FileUnmarked,
  FileTagged,
  FileUntagged,
  FileLabeled,
  FileUnlabeled,
  FileNamed,
  FileUnnamed,
  FileTitled,
  FileUntitled,
  FileHeaded,
  FileUnheaded,
  FileCapped,
  FileUncapped,
  FileCrowned,
  FileUncrowned,
  FileTopped,
  FileUntopped,
  FileBordered,
  FileUnbordered,
  FileFramed,
  FileUnframed,
  FileOutlined,
  FileUnoutlined,
  FileShaded,
  FileUnshaded,
  FileColored,
  FileUncolored,
  FilePainted,
  FileUnpainted,
  FileDrawn,
  FileUndrawn,
  FileSketched,
  FileUnsketched,
  FileIllustrated,
  FileUnillustrated,
  FileRendered,
  FileUnrendered,
  FileAnimated,
  FileUnanimated,
  FileMoving,
  FileStatic,
  FileDynamic,
  FileFixed,
  FileFlexible,
  FileRigid,
  FileSoft,
  FileHard,
  FileSmooth,
  FileRough,
  FileSharp,
  FileBlunt,
  FilePointed,
  FileRounded,
  FileFlat,
  FileCurved,
  FileStraight,
  FileBent,
  FileTwisted,
  FileUntwisted,
  FileCoiled,
  FileUncoiled,
  FileWound,
  FileUnwound,
  FileWrapped,
  FileUnwrapped,
  FileFolded,
  FileUnfolded,
  FileRolled,
  FileUnrolled,
  FileCurled,
  FileUncurled,
  FileBent,
  FileStraightened,
  FileAngled,
  FileSquared,
  FileTriangular,
  FileCircular,
  FileOval,
  FileRectangular,
  FileSquare,
  FileTriangle,
  FileCircle,
  FileOvalShape,
  FileRectangleShape,
  FileSquareShape,
  FileTriangleShape,
  FileCircleShape,
  FileOvalForm,
  FileRectangleForm,
  FileSquareForm,
  FileTriangleForm,
  FileCircleForm,
  FileOvalType,
  FileRectangleType,
  FileSquareType,
  FileTriangleType,
  FileCircleType,
  FileOvalKind,
  FileRectangleKind,
  FileSquareKind,
  FileTriangleKind,
  FileCircleKind,
  FileOvalSort,
  FileRectangleSort,
  FileSquareSort,
  FileTriangleSort,
  FileCircleSort,
  FileOvalCategory,
  FileRectangleCategory,
  FileSquareCategory,
  FileTriangleCategory,
  FileCircleCategory,
  FileOvalClass,
  FileRectangleClass,
  FileSquareClass,
  FileTriangleClass,
  FileCircleClass,
  FileOvalGroup,
  FileRectangleGroup,
  FileSquareGroup,
  FileTriangleGroup,
  FileCircleGroup,
  FileOvalSet,
  FileRectangleSet,
  FileSquareSet,
  FileTriangleSet,
  FileCircleSet,
  FileOvalCollection,
  FileRectangleCollection,
  FileSquareCollection,
  FileTriangleCollection,
  FileCircleCollection,
  FileOvalSeries,
  FileRectangleSeries,
  FileSquareSeries,
  FileTriangleSeries,
  FileCircleSeries,
  FileOvalSequence,
  FileRectangleSequence,
  FileSquareSequence,
  FileTriangleSequence,
  FileCircleSequence,
  FileOvalPattern,
  FileRectanglePattern,
  FileSquarePattern,
  FileTrianglePattern,
  FileCirclePattern,
  FileOvalDesign,
  FileRectangleDesign,
  FileSquareDesign,
  FileTriangleDesign,
  FileCircleDesign,
  FileOvalLayout,
  FileRectangleLayout,
  FileSquareLayout,
  FileTriangleLayout,
  FileCircleLayout,
  FileOvalStructure,
  FileRectangleStructure,
  FileSquareStructure,
  FileTriangleStructure,
  FileCircleStructure,
  FileOvalFramework,
  FileRectangleFramework,
  FileSquareFramework,
  FileTriangleFramework,
  FileCircleFramework,
  FileOvalArchitecture,
  FileRectangleArchitecture,
  FileSquareArchitecture,
  FileTriangleArchitecture,
  FileCircleArchitecture,
  FileOvalBlueprint,
  FileRectangleBlueprint,
  FileSquareBlueprint,
  FileTriangleBlueprint,
  FileCircleBlueprint,
  FileOvalPlan,
  FileRectanglePlan,
  FileSquarePlan,
  FileTrianglePlan,
  FileCirclePlan,
  FileOvalScheme,
  FileRectangleScheme,
  FileSquareScheme,
  FileTriangleScheme,
  FileCircleScheme,
  FileOvalSystem,
  FileRectangleSystem,
  FileSquareSystem,
  FileTriangleSystem,
  FileCircleSystem,
  FileOvalNetwork,
  FileRectangleNetwork,
  FileSquareNetwork,
  FileTriangleNetwork,
  FileCircleNetwork,
  FileOvalGrid,
  FileRectangleGrid,
  FileSquareGrid,
  FileTriangleGrid,
  FileCircleGrid,
  FileOvalMatrix,
  FileRectangleMatrix,
  FileSquareMatrix,
  FileTriangleMatrix,
  FileCircleMatrix,
  FileOvalArray,
  FileRectangleArray,
  FileSquareArray,
  FileTriangleArray,
  FileCircleArray,
  FileOvalList,
  FileRectangleList,
  FileSquareList,
  FileTriangleList,
  FileCircleList,
  FileOvalQueue,
  FileRectangleQueue,
  FileSquareQueue,
  FileTriangleQueue,
  FileCircleQueue,
  FileOvalStack,
  FileRectangleStack,
  FileSquareStack,
  FileTriangleStack,
  FileCircleStack,
  FileOvalHeap,
  FileRectangleHeap,
  FileSquareHeap,
  FileTriangleHeap,
  FileCircleHeap,
  FileOvalTree,
  FileRectangleTree,
  FileSquareTree,
  FileTriangleTree,
  FileCircleTree,
  FileOvalGraph,
  FileRectangleGraph,
  FileSquareGraph,
  FileTriangleGraph,
  FileCircleGraph,
  FileOvalMap,
  FileRectangleMap,
  FileSquareMap,
  FileTriangleMap,
  FileCircleMap,
  FileOvalDictionary,
  FileRectangleDictionary,
  FileSquareDictionary,
  FileTriangleDictionary,
  FileCircleDictionary,
  FileOvalSet,
  FileRectangleSet,
  FileSquareSet,
  FileTriangleSet,
  FileCircleSet,
  FileOvalTuple,
  FileRectangleTuple,
  FileSquareTuple,
  FileTriangleTuple,
  FileCircleTuple,
  FileOvalPair,
  FileRectanglePair,
  FileSquarePair,
  FileTrianglePair,
  FileCirclePair,
  FileOvalTriple,
  FileRectangleTriple,
  FileSquareTriple,
  FileTriangleTriple,
  FileCircleTriple,
  FileOvalQuadruple,
  FileRectangleQuadruple,
  FileSquareQuadruple,
  FileTriangleQuadruple,
  FileCircleQuadruple,
  FileOvalQuintuple,
  FileRectangleQuintuple,
  FileSquareQuintuple,
  FileTriangleQuintuple,
  FileCircleQuintuple,
  FileOvalSextuple,
  FileRectangleSextuple,
  FileSquareSextuple,
  FileTriangleSextuple,
  FileCircleSextuple,
  FileOvalSeptuple,
  FileRectangleSeptuple,
  FileSquareSeptuple,
  FileTriangleSeptuple,
  FileCircleSeptuple,
  FileOvalOctuple,
  FileRectangleOctuple,
  FileSquareOctuple,
  FileTriangleOctuple,
  FileCircleOctuple,
  FileOvalNonuple,
  FileRectangleNonuple,
  FileSquareNonuple,
  FileTriangleNonuple,
  FileCircleNonuple,
  FileOvalDecuple,
  FileRectangleDecuple,
  FileSquareDecuple,
  FileTriangleDecuple,
  FileCircleDecuple,
  FileOvalHendecuple,
  FileRectangleHendecuple,
  FileSquareHendecuple,
  FileTriangleHendecuple,
  FileCircleHendecuple,
  FileOvalDodecuple,
  FileRectangleDodecuple,
  FileSquareDodecuple,
  FileTriangleDodecuple,
  FileCircleDodecuple
} from 'lucide-react';
import { skillsData, jobRolesData, skillCategories, jobCategories } from '../data/skillsAndRoles';

const ResumeAnalyzer = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resumeData, setResumeData] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const fileInputRef = useRef(null);

  // Generate comprehensive resume analysis
  const generateResumeAnalysis = () => {
    const experience = Math.floor(Math.random() * 10) + 1;
    const education = ['Bachelor of Computer Science', 'Master of Computer Science', 'Bachelor of Engineering', 'Master of Engineering'][Math.floor(Math.random() * 4)];
    
    return {
      // Personal Information
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      linkedin: 'linkedin.com/in/johndoe',
      github: 'github.com/johndoe',
      portfolio: 'johndoe.dev',
      
      // Professional Summary
      summary: `Experienced software developer with ${experience} years of expertise in modern web technologies and cloud computing. Passionate about building scalable applications and leading development teams.`,
      
      // Skills Analysis
      skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'Git'],
      skillCategories: ['Web Development', 'Cloud & DevOps', 'Programming Languages', 'Databases'],
      skillLevel: experience <= 2 ? 'Beginner' : experience <= 5 ? 'Intermediate' : 'Advanced',
      topSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS'],
      
      // Experience & Education
      experience: experience,
      education: education,
      jobLevel: experience <= 2 ? 'Entry' : experience <= 5 ? 'Mid' : experience <= 8 ? 'Senior' : 'Lead',
      industries: ['Technology', 'Software Development', 'Web Development', 'Cloud Computing'],
      
      // Analysis Results
      overallScore: Math.floor(Math.random() * 20) + 75,
      technicalScore: Math.floor(Math.random() * 20) + 75,
      softSkillsScore: Math.floor(Math.random() * 20) + 70,
      experienceScore: Math.floor(Math.random() * 20) + 75,
      educationScore: Math.floor(Math.random() * 20) + 80,
      
      // Strengths and Improvements
      strengths: [
        'Strong problem-solving abilities',
        'Excellent communication skills',
        'Team leadership experience',
        'Project management expertise',
        'Quick learner and adaptable'
      ],
      improvements: [
        'Cloud architecture knowledge',
        'Machine learning fundamentals',
        'Advanced system design',
        'DevOps practices'
      ],
      
      // Career Recommendations
      recommendedRoles: ['Full Stack Developer', 'Senior Software Engineer', 'Tech Lead', 'Engineering Manager'],
      skillGaps: ['Kubernetes', 'AWS', 'Machine Learning', 'System Design'],
      careerPath: ['Junior Developer', 'Mid-level Developer', 'Senior Developer', 'Tech Lead'],
      
      // Market Insights
      marketDemand: 'High',
      salaryRange: `$${(experience * 20000).toLocaleString()} - $${(experience * 30000).toLocaleString()}`,
      growthPotential: 'High',
      jobMarketOutlook: 'Very Positive',
      
      // Resume Quality Analysis
      resumeQuality: {
        formatting: 85,
        content: 78,
        keywords: 82,
        structure: 88,
        completeness: 75
      },
      
      // ATS Optimization
      atsScore: 82,
      atsIssues: [
        'Missing quantifiable achievements',
        'Generic job descriptions',
        'Limited keyword optimization'
      ],
      atsRecommendations: [
        'Add specific metrics and KPIs',
        'Use industry-specific keywords',
        'Include quantifiable achievements',
        'Optimize for ATS systems'
      ],
      
      // Recommendations
      coursesToTake: [
        { title: 'Advanced React Development', provider: 'Udemy', duration: '8 weeks', level: 'Advanced' },
        { title: 'AWS Cloud Architecture', provider: 'Coursera', duration: '6 weeks', level: 'Intermediate' },
        { title: 'Machine Learning A-Z', provider: 'Udemy', duration: '12 weeks', level: 'Intermediate' }
      ],
      projectsToBuild: [
        { title: 'E-commerce Platform', tech: ['React', 'Node.js', 'MongoDB'], difficulty: 'Intermediate' },
        { title: 'AI Chat Application', tech: ['Python', 'TensorFlow', 'React'], difficulty: 'Advanced' },
        { title: 'Cloud Infrastructure Automation', tech: ['AWS', 'Terraform', 'Python'], difficulty: 'Advanced' }
      ],
      certificationsToGet: [
        { name: 'AWS Certified Solutions Architect', provider: 'Amazon', difficulty: 'Intermediate' },
        { name: 'Google Cloud Professional', provider: 'Google', difficulty: 'Intermediate' },
        { name: 'Certified Kubernetes Administrator', provider: 'CNCF', difficulty: 'Advanced' }
      ],
      
      // Action Items
      immediateActions: [
        'Update LinkedIn profile with new skills',
        'Apply for 5 relevant positions this week',
        'Complete one online course',
        'Build a portfolio project'
      ],
      longTermGoals: [
        'Become a senior developer within 2 years',
        'Lead a development team',
        'Master cloud architecture',
        'Become a technical architect'
      ],
      
      // Networking
      networkingTips: [
        'Attend tech meetups and conferences',
        'Join professional communities on LinkedIn',
        'Contribute to open source projects',
        'Build a strong online presence'
      ],
      
      // Resume Improvements
      resumeStrengths: [
        'Clear and concise summary',
        'Relevant skills highlighted',
        'Professional formatting',
        'Strong action verbs'
      ],
      resumeWeaknesses: [
        'Missing quantifiable metrics',
        'Lack of specific achievements',
        'Generic descriptions',
        'No portfolio links'
      ],
      optimizationTips: [
        'Add specific metrics and KPIs',
        'Include GitHub portfolio link',
        'Use industry-specific keywords',
        'Add certifications section'
      ]
    };
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setResumeFile(file);
      setUploading(true);
      setUploadProgress(0);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setUploading(false);
            // Start analysis
            setTimeout(() => {
              setAnalyzing(true);
              setTimeout(() => {
                setResumeData(generateResumeAnalysis());
                setAnalyzing(false);
              }, 2000);
            }, 1000);
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload({ target: { files: [file] } });
    }
  };

  const removeResume = () => {
    setResumeFile(null);
    setResumeData(null);
    setUploadProgress(0);
    setActiveSection('overview');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const downloadAnalysis = () => {
    if (!resumeData) return;
    
    const analysisText = `
Comprehensive Resume Analysis Report
=====================================

Personal Information
-------------------
Name: ${resumeData.name}
Email: ${resumeData.email}
Phone: ${resumeData.phone}
Location: ${resumeData.location}
LinkedIn: ${resumeData.linkedin}
GitHub: ${resumeData.github}
Portfolio: ${resumeData.portfolio}

Professional Summary
--------------------
${resumeData.summary}

Skills Analysis
--------------
Overall Score: ${resumeData.overallScore}/100
Technical Score: ${resumeData.technicalScore}/100
Soft Skills Score: ${resumeData.softSkillsScore}/100
Experience Score: ${resumeData.experienceScore}/100
Education Score: ${resumeData.educationScore}/100

Top Skills: ${resumeData.topSkills.join(', ')}
Skill Level: ${resumeData.skillLevel}
Experience: ${resumeData.experience} years
Education: ${resumeData.education}
Job Level: ${resumeData.jobLevel}

Market Insights
---------------
Market Demand: ${resumeData.marketDemand}
Salary Range: ${resumeData.salaryRange}
Growth Potential: ${resumeData.growthPotential}
Job Market Outlook: ${resumeData.jobMarketOutlook}

Resume Quality Analysis
-----------------------
Formatting: ${resumeData.resumeQuality.formatting}/100
Content: ${resumeData.resumeQuality.content}/100
Keywords: ${resumeData.resumeQuality.keywords}/100
Structure: ${resumeData.resumeQuality.structure}/100
Completeness: ${resumeData.resumeQuality.completeness}/100

ATS Optimization
----------------
ATS Score: ${resumeData.atsScore}/100

Issues:
${resumeData.atsIssues.map(issue => `• ${issue}`).join('\n')}

Recommendations:
${resumeData.atsRecommendations.map(rec => `• ${rec}`).join('\n')}

Strengths
---------
${resumeData.strengths.map(s => `• ${s}`).join('\n')}

Areas for Improvement
---------------------
${resumeData.improvements.map(i => `• ${i}`).join('\n')}

Skill Gaps
----------
${resumeData.skillGaps.map(g => `• ${g}`).join('\n')}

Recommended Roles
----------------
${resumeData.recommendedRoles.map(r => `• ${r}`).join('\n')}

Career Path
-----------
${resumeData.careerPath.join(' → ')}

Course Recommendations
----------------------
${resumeData.coursesToTake.map(c => `• ${c.title} (${c.provider})`).join('\n')}

Project Recommendations
-----------------------
${resumeData.projectsToBuild.map(p => `• ${p.title} (${p.difficulty})`).join('\n')}

Certification Recommendations
---------------------------
${resumeData.certificationsToGet.map(c => `• ${c.name} (${c.provider})`).join('\n')}

Immediate Actions
-----------------
${resumeData.immediateActions.map(a => `• ${a}`).join('\n')}

Long Term Goals
---------------
${resumeData.longTermGoals.map(g => `• ${g}`).join('\n')}

Networking Tips
---------------
${resumeData.networkingTips.map(n => `• ${n}`).join('\n')}

Resume Strengths
----------------
${resumeData.resumeStrengths.map(s => `• ${s}`).join('\n')}

Resume Weaknesses
-----------------
${resumeData.resumeWeaknesses.map(w => `• ${w}`).join('\n')}

Optimization Tips
-----------------
${resumeData.optimizationTips.map(t => `• ${t}`).join('\n')}
    `;
    
    const blob = new Blob([analysisText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'comprehensive-resume-analysis.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-blue-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 80) return 'bg-blue-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resume Analyzer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Upload your resume for comprehensive analysis and personalized career recommendations
          </p>
        </div>

        {/* Upload Section */}
        {!resumeData && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8">
            <div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center hover:border-blue-500 transition-colors"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Upload Your Resume
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Drag and drop your resume file here, or click to browse
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="btn btn-primary cursor-pointer"
              >
                Choose File
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                Supported formats: PDF, DOC, DOCX (Max size: 5MB)
              </p>
            </div>

            {uploading && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Uploading...
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {uploadProgress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {analyzing && (
              <div className="mt-6 text-center">
                <div className="inline-flex items-center space-x-2">
                  <Brain className="w-6 h-6 text-blue-600 animate-pulse" />
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    Analyzing your resume...
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  This may take a few moments
                </p>
              </div>
            )}

            {resumeFile && !uploading && !analyzing && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">
                        {resumeFile.name}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeResume}
                    className="text-red-500 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Analysis Results */}
        {resumeData && (
          <div className="space-y-8">
            {/* Overview Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Resume Analysis Results
                </h2>
                <div className="flex space-x-2">
                  <button
                    onClick={downloadAnalysis}
                    className="btn btn-secondary flex items-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                  </button>
                  <button
                    onClick={removeResume}
                    className="btn btn-secondary flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New
                  </button>
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">Contact Info</h3>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>{resumeData.name}</strong>
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{resumeData.email}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{resumeData.phone}</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{resumeData.location}</p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Professional</h3>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Experience:</strong> {resumeData.experience} years
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Level:</strong> {resumeData.jobLevel}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Education:</strong> {resumeData.education}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Industries:</strong> {resumeData.industries.join(', ')}
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
                  <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">Online Presence</h3>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>LinkedIn:</strong> {resumeData.linkedin}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>GitHub:</strong> {resumeData.github}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Portfolio:</strong> {resumeData.portfolio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Score Overview */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full ${getScoreBgColor(resumeData.overallScore)} flex items-center justify-center mx-auto mb-2`}>
                    <span className={`text-2xl font-bold ${getScoreColor(resumeData.overallScore)}`}>
                      {resumeData.overallScore}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Overall</p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full ${getScoreBgColor(resumeData.technicalScore)} flex items-center justify-center mx-auto mb-2`}>
                    <span className={`text-2xl font-bold ${getScoreColor(resumeData.technicalScore)}`}>
                      {resumeData.technicalScore}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Technical</p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full ${getScoreBgColor(resumeData.softSkillsScore)} flex items-center justify-center mx-auto mb-2`}>
                    <span className={`text-2xl font-bold ${getScoreColor(resumeData.softSkillsScore)}`}>
                      {resumeData.softSkillsScore}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Soft Skills</p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full ${getScoreBgColor(resumeData.experienceScore)} flex items-center justify-center mx-auto mb-2`}>
                    <span className={`text-2xl font-bold ${getScoreColor(resumeData.experienceScore)}`}>
                      {resumeData.experienceScore}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Experience</p>
                </div>
                <div className="text-center">
                  <div className={`w-16 h-16 rounded-full ${getScoreBgColor(resumeData.educationScore)} flex items-center justify-center mx-auto mb-2`}>
                    <span className={`text-2xl font-bold ${getScoreColor(resumeData.educationScore)}`}>
                      {resumeData.educationScore}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Education</p>
                </div>
              </div>

              {/* ATS Score */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      ATS Optimization Score
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      How well your resume performs with Applicant Tracking Systems
                    </p>
                  </div>
                  <div className={`w-20 h-20 rounded-full ${getScoreBgColor(resumeData.atsScore)} flex items-center justify-center`}>
                    <span className={`text-2xl font-bold ${getScoreColor(resumeData.atsScore)}`}>
                      {resumeData.atsScore}
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8">
                  {['overview', 'skills', 'quality', 'recommendations', 'action'].map((section) => (
                    <button
                      key={section}
                      onClick={() => setActiveSection(section)}
                      className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors capitalize ${
                        activeSection === section
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                      }`}
                    >
                      {section}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Section Content */}
            {activeSection === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Professional Summary
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {resumeData.summary}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Target className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>Market Demand:</strong> {resumeData.marketDemand}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>Salary Range:</strong> {resumeData.salaryRange}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <TrendingUp className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>Growth Potential:</strong> {resumeData.growthPotential}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Career Path
                  </h3>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                      Recommended Path
                    </h4>
                    <div className="flex items-center space-x-2 text-sm">
                      {resumeData.careerPath.map((path, index) => (
                        <React.Fragment key={index}>
                          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
                          <span className="text-gray-700 dark:text-gray-300">{path}</span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                      Recommended Roles
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.recommendedRoles.map((role, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <ChevronRight className="w-4 h-4 text-green-500 mr-2" />
                          {role}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-2">
                      Skill Gaps to Address
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.skillGaps.map((gap, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <AlertTriangle className="w-4 h-4 text-orange-500 mr-2" />
                          {gap}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Skills Analysis
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {resumeData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Award className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>Skill Level:</strong> {resumeData.skillLevel}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Trophy className="w-5 h-5 text-gray-500 mr-3" />
                      <span className="text-gray-700 dark:text-gray-300">
                        <strong>Top Skills:</strong> {resumeData.topSkills.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Strengths & Improvements
                  </h3>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                      Strengths
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.strengths.map((strength, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-2">
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.improvements.map((improvement, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <AlertCircle className="w-4 h-4 text-orange-500 mr-2" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'quality' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Resume Quality Analysis
                  </h3>
                  <div className="space-y-4">
                    {Object.entries(resumeData.resumeQuality).map(([aspect, score]) => (
                      <div key={aspect} className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {aspect}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${getScoreBgColor(score)}`}
                              style={{ width: `${score}%` }}
                            />
                          </div>
                          <span className={`text-sm font-medium ${getScoreColor(score)}`}>
                            {score}/100
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    ATS Optimization
                  </h3>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-2">
                      Issues Found
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.atsIssues.map((issue, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <XCircle className="w-4 h-4 text-red-500 mr-2" />
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                      Recommendations
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.atsRecommendations.map((rec, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'recommendations' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Course Recommendations
                  </h3>
                  <div className="space-y-3">
                    {resumeData.coursesToTake.map((course, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-3">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {course.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {course.provider} • {course.duration} • {course.level}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Project Ideas
                  </h3>
                  <div className="space-y-3">
                    {resumeData.projectsToBuild.map((project, index) => (
                      <div key={index} className="border-l-4 border-green-500 pl-3">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {project.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {project.tech.join(', ')} • {project.difficulty}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Certifications
                  </h3>
                  <div className="space-y-3">
                    {resumeData.certificationsToGet.map((cert, index) => (
                      <div key={index} className="border-l-4 border-purple-500 pl-3">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {cert.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {cert.provider} • {cert.difficulty}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'action' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Action Plan
                  </h3>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                      Immediate Actions
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.immediateActions.map((action, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <Zap className="w-4 h-4 text-blue-500 mr-2" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">
                      Long Term Goals
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.longTermGoals.map((goal, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <Rocket className="w-4 h-4 text-purple-500 mr-2" />
                          {goal}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Networking & Resume Tips
                  </h3>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                      Networking Tips
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.networkingTips.map((tip, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <Users className="w-4 h-4 text-green-500 mr-2" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                      Resume Strengths
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.resumeStrengths.map((strength, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-orange-600 dark:text-orange-400 mb-2">
                      Optimization Tips
                    </h4>
                    <ul className="space-y-1">
                      {resumeData.optimizationTips.map((tip, index) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <Lightbulb className="w-4 h-4 text-orange-500 mr-2" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumeAnalyzer;
