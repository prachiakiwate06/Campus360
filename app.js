/**
 * =================================================================
 * CollabU — Campus Community & Student Collaboration Platform
 * Client-Side Application Logic (Step 4: Student Collaboration)
 * =================================================================
 */

// -------------------------------------------------------------
// 1. Initial State & Realistic Datasets
// -------------------------------------------------------------
const DEFAULT_HELP_REQUESTS = [
  {
    id: 'req-1',
    type: 'request', // 'request' | 'offer'
    title: 'Need help debugging Recursive Backtracking in Python',
    description: 'Stuck on CS201 Assignment 3 (N-Queens problem). Getting recursion depth exceeded error. Can someone do a quick 15-min Discord review?',
    category: 'coding',
    categoryLabel: 'Coding Help',
    courseTag: 'CS201 Algorithms',
    isUrgent: true,
    author: 'Sophia Ramirez',
    initials: 'SR',
    department: 'CS Sophomore',
    contact: 'Discord: sophia_r#4201',
    timestamp: '15 mins ago',
    timestampMs: Date.now() - 15 * 60 * 1000,
    responsesCount: 3,
    status: 'open'
  },
  {
    id: 'req-2',
    type: 'request',
    title: 'Looking for 1 UI/UX Designer for Smart India / Campus Hackathon',
    description: 'We are 3 developers (React + Node.js + Python ML). We need a teammate proficient in Figma to design high-fidelity user flows before Thursday midnight!',
    category: 'hackathon',
    categoryLabel: 'Hackathon Partner',
    courseTag: 'Hackathon Squad',
    isUrgent: true,
    author: 'Rohan Sharma',
    initials: 'RS',
    department: 'IT Junior',
    contact: 'rohan.sharma@campus.edu',
    timestamp: '42 mins ago',
    timestampMs: Date.now() - 42 * 60 * 1000,
    responsesCount: 5,
    status: 'open'
  },
  {
    id: 'req-3',
    type: 'offer',
    title: 'Sharing Calculus II (MATH 152) Mid-Term Revision Cheatsheet & Notes',
    description: 'Compiled comprehensive notes on Series Convergence tests, Taylor polynomials, and radius of convergence with 20 solved past exam problems. Free to download!',
    category: 'notes',
    categoryLabel: 'Study Notes',
    courseTag: 'MATH 152 Calc II',
    isUrgent: false,
    author: 'Emily Watson',
    initials: 'EW',
    department: 'Data Science \'27',
    contact: 'emily.w@campus.edu',
    timestamp: '2 hours ago',
    timestampMs: Date.now() - 2 * 3600 * 1000,
    responsesCount: 12,
    status: 'open'
  },
  {
    id: 'req-4',
    type: 'request',
    title: 'Calculus I derivatives & chain rule study partner needed',
    description: 'Preparing for Friday’s quiz. Looking for someone taking MATH 101 to practice problem sets in the campus library second floor.',
    category: 'academic',
    categoryLabel: 'Academics',
    courseTag: 'MATH 101',
    isUrgent: false,
    author: 'Liam Chen',
    initials: 'LC',
    department: 'Freshman Eng',
    contact: 'Discord: liam_math',
    timestamp: '3 hours ago',
    timestampMs: Date.now() - 3 * 3600 * 1000,
    responsesCount: 1,
    status: 'open'
  },
  {
    id: 'req-5',
    type: 'offer',
    title: 'Offering React & Modern JavaScript mentorship for beginners',
    description: 'Senior CS student offering 1-on-1 code reviews and project setup guidance for Web Development course assignments. DM anytime!',
    category: 'coding',
    categoryLabel: 'Coding Help',
    courseTag: 'Web Dev & JS',
    isUrgent: false,
    author: 'Marcus Brody',
    initials: 'MB',
    department: 'CS Senior',
    contact: 'Discord: marcus_dev',
    timestamp: '4 hours ago',
    timestampMs: Date.now() - 4 * 3600 * 1000,
    responsesCount: 8,
    status: 'open'
  },
  {
    id: 'req-6',
    type: 'request',
    title: 'Urgent: TI-84 Scientific Calculator loaner needed for Exam tomorrow',
    description: 'Left my graphing calculator at home and have my Circuit Analysis mid-term exam tomorrow at 10 AM. Will return immediately with coffee!',
    category: 'general',
    categoryLabel: 'General Help',
    courseTag: 'EE 205 Circuits',
    isUrgent: true,
    author: 'David Kim',
    initials: 'DK',
    department: 'Electrical Eng \'26',
    contact: 'Phone: 555-0192 / david.k@campus.edu',
    timestamp: '5 hours ago',
    timestampMs: Date.now() - 5 * 3600 * 1000,
    responsesCount: 4,
    status: 'open'
  },
  {
    id: 'req-7',
    type: 'offer',
    title: 'Organic Chemistry II Reaction Mechanism Flashcards (Anki Deck)',
    description: 'Pre-made Anki flashcard deck containing all SN1, SN2, E1, E2 mechanisms with visual retrosynthesis notes.',
    category: 'notes',
    categoryLabel: 'Study Notes',
    courseTag: 'CHEM 220',
    isUrgent: false,
    author: 'Priya Nair',
    initials: 'PN',
    department: 'Biotech \'25',
    contact: 'priya.nair@campus.edu',
    timestamp: '1 day ago',
    timestampMs: Date.now() - 24 * 3600 * 1000,
    responsesCount: 9,
    status: 'open'
  },
  {
    id: 'req-8',
    type: 'request',
    title: 'Need 1 Machine Learning / Cloud deployment engineer for Hackathon team',
    description: 'Building a smart campus IoT energy optimization app. Need someone familiar with FastAPI or Docker + AWS to deploy our model backend.',
    category: 'hackathon',
    categoryLabel: 'Hackathon Partner',
    courseTag: 'Cloud / AI',
    isUrgent: false,
    author: 'Alex Chen',
    initials: 'AC',
    department: 'CS \'26',
    contact: 'alex.chen@campus.edu',
    timestamp: '1 day ago',
    timestampMs: Date.now() - 26 * 3600 * 1000,
    responsesCount: 2,
    status: 'open'
  }
];

const DEFAULT_EVENTS = [
  {
    id: 'evt-1',
    title: 'Annual Campus 36-Hour Hackathon 2026',
    category: 'Hackathon',
    month: 'OCT',
    day: '18',
    dateIso: '2026-10-18',
    time: '9:00 AM - Next Day 9:00 PM',
    location: 'Student Innovation Center (Hall B)',
    venueType: 'in-person',
    host: 'Google Developer Student Club & ACM',
    capacity: 200,
    registeredCount: 142,
    isRegistered: false,
    description: 'Themes: AI for Good, Smart Campus, and Sustainable Cloud Infra. Over $5,000 in cash prizes, API credits, free swag bags, and direct mentorship from startup founders.'
  },
  {
    id: 'evt-2',
    title: 'Hands-on Cloud & Serverless Workshop (AWS & Google Cloud)',
    category: 'Workshop',
    month: 'OCT',
    day: '21',
    dateIso: '2026-10-21',
    time: '4:00 PM - 6:30 PM',
    location: 'Computer Lab 304 & Zoom Hybrid',
    venueType: 'hybrid',
    host: 'Campus Cloud Computing Chapter',
    capacity: 100,
    registeredCount: 88,
    isRegistered: true,
    description: 'Bring your laptop! Deploy full-stack serverless web apps with automated CI/CD pipelines, containerize with Docker, and learn infrastructure as code.'
  },
  {
    id: 'evt-3',
    title: 'Tech Resume & Portfolio Roast with Alumni Engineers',
    category: 'Career Meetup',
    month: 'OCT',
    day: '25',
    dateIso: '2026-10-25',
    time: '5:30 PM - 7:30 PM',
    location: 'Campus Auditorium A',
    venueType: 'in-person',
    host: 'Student Career & Placement Cell',
    capacity: 80,
    registeredCount: 64,
    isRegistered: false,
    description: 'Get constructive, unfiltered feedback on your GitHub profile, LinkedIn, and software engineering resume from senior engineers at Microsoft, Google, and Stripe.'
  },
  {
    id: 'evt-4',
    title: 'Competitive Programming Speed-Run & Algorithmic Duel',
    category: 'Competition',
    month: 'OCT',
    day: '28',
    dateIso: '2026-10-28',
    time: '3:00 PM - 6:00 PM',
    location: 'CS Department Lab 102',
    venueType: 'in-person',
    host: 'Competitive Coders Society',
    capacity: 60,
    registeredCount: 45,
    isRegistered: false,
    description: 'Fast-paced algorithmic challenge solving graph theory, dynamic programming, and binary search problems under time pressure. Pizza provided!'
  },
  {
    id: 'evt-5',
    title: 'Building Modern Full-Stack Web Apps with Next.js & Supabase',
    category: 'Workshop',
    month: 'NOV',
    day: '02',
    dateIso: '2026-11-02',
    time: '6:00 PM - 8:00 PM',
    location: 'Virtual via Google Meet',
    venueType: 'virtual',
    host: 'Web Dev Innovation Cohort',
    capacity: 150,
    registeredCount: 110,
    isRegistered: false,
    description: 'Step-by-step masterclass connecting frontend React/Next.js to Supabase PostgreSQL, configuring Row-Level Security, and deploying live to Vercel.'
  },
  {
    id: 'evt-6',
    title: 'Intro to Machine Learning & Computer Vision with OpenCV',
    category: 'Workshop',
    month: 'NOV',
    day: '06',
    dateIso: '2026-11-06',
    time: '2:00 PM - 5:00 PM',
    location: 'Robotics Lab 2B',
    venueType: 'in-person',
    host: 'AI & Robotics Student Club',
    capacity: 75,
    registeredCount: 72,
    isRegistered: false,
    description: 'Learn real-time face detection, object tracking, and contour detection using Python and OpenCV. Prior basic Python knowledge recommended.'
  },
  {
    id: 'evt-7',
    title: 'Inter-College Cultural Symphony & Arts Gala 2026',
    category: 'Cultural',
    month: 'NOV',
    day: '12',
    dateIso: '2026-11-12',
    time: '5:00 PM - 9:30 PM',
    location: 'Campus Main Auditorium B',
    venueType: 'in-person',
    host: 'DYP Cultural & Fine Arts Society',
    capacity: 450,
    registeredCount: 310,
    isRegistered: false,
    description: 'Annual musical night, street dance battle, dramatics showcase, and rock band fusion battle. Free entry pass for DYP students with college ID.'
  },
  {
    id: 'evt-8',
    title: 'Executive Seminar: Edge AI & Future of Cloud Computing',
    category: 'Seminar',
    month: 'NOV',
    day: '18',
    dateIso: '2026-11-18',
    time: '11:00 AM - 1:00 PM',
    location: 'Tech Innovation Wing B - Seminar Hall',
    venueType: 'hybrid',
    host: 'IEEE Student Branch & Dept of CS',
    capacity: 120,
    registeredCount: 95,
    isRegistered: false,
    description: 'Keynote presentation by IEEE fellows on real-time neural network inference, Edge TPUs, and autonomous robotics on micro-controllers.'
  },
  {
    id: 'evt-9',
    title: 'Competitive Coding Club: Weekly LeetCode Hack Sprint',
    category: 'Club Activity',
    month: 'NOV',
    day: '22',
    dateIso: '2026-11-22',
    time: '3:30 PM - 6:00 PM',
    location: 'Computer Lab 304',
    venueType: 'in-person',
    host: 'DYP Coding Duo & ACM Club',
    capacity: 50,
    registeredCount: 38,
    isRegistered: true,
    description: 'Hands-on collaborative sprint solving LeetCode hard problems, peer code reviews, and contributing to open-source student campus repositories.'
  }
];

const DEFAULT_TEAMMATES = [
  {
    id: 'tm-1',
    name: 'Priya Nair',
    initials: 'PN',
    department: 'Biotech & Human Factors',
    year: 'Senior \'26',
    status: 'hackathon',
    statusLabel: '🚀 Looking for Hackathon Team',
    skills: ['UI/UX Design', 'Public Speaking', 'Web Development'],
    bio: 'Product designer passionate about intuitive Figma user journeys, interactive wireframes, and design systems. Looking for full-stack developers to team up for the campus 36-hr hackathon!',
    contact: 'priya.nair@campus.edu',
    github: 'behance.net/priyanair',
    invitesCount: 8
  },
  {
    id: 'tm-2',
    name: 'Rohan Sharma',
    initials: 'RS',
    department: 'Information Technology',
    year: 'Junior \'27',
    status: 'hackathon',
    statusLabel: '🚀 Looking for Hackathon Team',
    skills: ['Python', 'Data Science', 'Cloud & DevOps'],
    bio: 'Specialized in computer vision, PyTorch, and deploying REST API services with Docker. Need creative frontend developers and UI/UX designers to form a multidisciplinary hackathon team.',
    contact: 'rohan.sharma@campus.edu',
    github: 'github.com/rohansharma',
    invitesCount: 6
  },
  {
    id: 'tm-3',
    name: 'Sophia Ramirez',
    initials: 'SR',
    department: 'Computer Science',
    year: 'Sophomore \'28',
    status: 'capstone',
    statusLabel: '🎓 Capstone & Projects',
    skills: ['Python', 'Web Development', 'Public Speaking'],
    bio: 'Competitive programmer and backend developer. Experienced in FastAPI, PostgreSQL, and crafting high-impact slide pitch decks for startup pitch competitions.',
    contact: 'Discord: sophia_r#4201',
    github: 'github.com/sophiaramirez',
    invitesCount: 4
  },
  {
    id: 'tm-4',
    name: 'Marcus Brody',
    initials: 'MB',
    department: 'Computer Science',
    year: 'Senior \'26',
    status: 'mentor',
    statusLabel: '💡 Peer Mentor & Projects',
    skills: ['Cloud & DevOps', 'Web Development', 'Python'],
    bio: 'AWS Certified Cloud Practitioner and open-source contributor. Offering help with CI/CD workflows, Docker containerization, and backend architecture.',
    contact: 'marcus.brody@campus.edu',
    github: 'github.com/marcusbrody',
    invitesCount: 11
  },
  {
    id: 'tm-5',
    name: 'Aisha Khan',
    initials: 'AK',
    department: 'Business & Data Analytics',
    year: 'Junior \'27',
    status: 'hackathon',
    statusLabel: '🚀 Looking for Hackathon Team',
    skills: ['Data Science', 'Public Speaking', 'Python'],
    bio: 'Data analyst skilled in Pandas, Tableau, and business model canvas. I love translating technical concepts into persuasive presentations for hackathon judges.',
    contact: 'aisha.khan@campus.edu',
    github: 'linkedin.com/in/aishakhan',
    invitesCount: 5
  },
  {
    id: 'tm-6',
    name: 'Alex Chen',
    initials: 'AC',
    department: 'Computer Science',
    year: 'Sophomore \'28',
    status: 'hackathon',
    statusLabel: '🚀 Looking for Hackathon Team',
    skills: ['Web Development', 'Python', 'Cloud & DevOps'],
    bio: 'Full-stack web developer working with React, Vanilla JS, and Python cloud microservices. Eager to connect with designers and domain experts for hackathons!',
    contact: 'alex.chen@campus.edu',
    github: 'github.com/alexchen',
    invitesCount: 7
  }
];

// -------------------------------------------------------------
// Campus Navigator Demonstration Locations
// -------------------------------------------------------------
const DEFAULT_CAMPUS_LOCATIONS = [
  {
    id: 'loc-1',
    name: 'Lecture Hall 101 - Smart Interactive Classroom',
    room: '101',
    building: 'Engineering Block A',
    floor: '1st Floor',
    type: 'classroom',
    typeLabel: '🏛️ Classroom',
    department: 'Computer Engineering',
    landmark: 'Opposite Department Library & Staircase 1',
    directions: 'Enter Main Engineering Gate, take central stairs to 1st Floor, turn right down Corridor A.',
    timings: '8:30 AM - 5:30 PM',
    capacity: 75,
    equipment: '4K Laser Projector, Mic System, High-Speed Wi-Fi'
  },
  {
    id: 'loc-2',
    name: 'Lecture Hall 204 - Seminar Amphitheater',
    room: '204',
    building: 'Engineering Block A',
    floor: '2nd Floor',
    type: 'classroom',
    typeLabel: '🏛️ Classroom',
    department: 'Information Technology',
    landmark: 'Next to Faculty Lounge, West Wing',
    directions: 'Take West Elevator to 2nd Floor, walk straight 20m down Corridor B.',
    timings: '8:30 AM - 5:30 PM',
    capacity: 90,
    equipment: 'Tiered Seating, Dual Digital Displays, Central AC'
  },
  {
    id: 'loc-3',
    name: 'Lecture Hall 302 - Advanced Computing Classroom',
    room: '302',
    building: 'Engineering Block A',
    floor: '3rd Floor',
    type: 'classroom',
    typeLabel: '🏛️ Classroom',
    department: 'AI & Data Science',
    landmark: 'Beside Server Room',
    directions: 'Take staircase 2 to 3rd Floor, first door on the left.',
    timings: '8:30 AM - 5:30 PM',
    capacity: 65,
    equipment: 'Smart Touch Board, Integrated Audio, LAN Ports'
  },
  {
    id: 'loc-4',
    name: 'Computer Lab 304 - Cloud & Software Engg Lab',
    room: '304',
    building: 'Engineering Block A',
    floor: '3rd Floor',
    type: 'lab',
    typeLabel: '💻 Laboratory',
    department: 'Computer Engineering',
    landmark: 'Adjacent to HOD Office',
    directions: '3rd Floor East Wing, past the Network Security rack, Room 304.',
    timings: '9:00 AM - 6:00 PM',
    capacity: 40,
    equipment: '40x Core i7 Workstations, Ubuntu/Windows Dual OS, Gigabit LAN'
  },
  {
    id: 'loc-5',
    name: 'AI & Robotics Lab 2B - IoT Hardware Lab',
    room: '2B',
    building: 'Tech Innovation Wing B',
    floor: '2nd Floor',
    type: 'lab',
    typeLabel: '💻 Laboratory',
    department: 'AI & Robotics',
    landmark: 'Opposite 3D Printing Maker Space',
    directions: 'Cross skywalk to Wing B, take elevator to 2nd Floor, glass entrance door.',
    timings: '9:00 AM - 7:00 PM',
    capacity: 35,
    equipment: 'NVIDIA RTX GPUs, Raspberry Pi Kits, Arduino Oscilloscopes'
  },
  {
    id: 'loc-6',
    name: 'CAD / CAM Design & Simulation Lab',
    room: '112',
    building: 'Engineering Block A',
    floor: '1st Floor',
    type: 'lab',
    typeLabel: '💻 Laboratory',
    department: 'Mechanical Engineering',
    landmark: 'Beside Fluid Mechanics Lab',
    directions: '1st Floor connecting corridor towards Workshop bay, Room 112.',
    timings: '9:00 AM - 5:00 PM',
    capacity: 50,
    equipment: 'AutoCAD, SolidWorks workstations, 3D Printer Link'
  },
  {
    id: 'loc-7',
    name: 'VLSI & Embedded Systems Laboratory',
    room: '215',
    building: 'Engineering Block A',
    floor: '2nd Floor',
    type: 'lab',
    typeLabel: '💻 Laboratory',
    department: 'Electronics & Telecom',
    landmark: 'Opposite Microwave Testing Bench',
    directions: '2nd Floor Central Hallway, Room 215.',
    timings: '9:00 AM - 5:30 PM',
    capacity: 35,
    equipment: 'FPGA Boards, Digital Storage Oscilloscopes, Logic Analyzers'
  },
  {
    id: 'loc-8',
    name: 'Head of Department (HOD) - Computer Engineering',
    room: '301',
    building: 'Engineering Block A',
    floor: '3rd Floor',
    type: 'office',
    typeLabel: '🏢 Department Office',
    department: 'Computer Engineering',
    landmark: 'Entry point to 3rd Floor Computing Wing',
    directions: 'Corridor A, Room 301. Notice board outside.',
    timings: '10:00 AM - 4:30 PM',
    capacity: 10,
    equipment: 'Faculty Consultation Desk, Student Meeting Area'
  },
  {
    id: 'loc-9',
    name: 'Head of Department (HOD) - Information Technology',
    room: '201',
    building: 'Engineering Block A',
    floor: '2nd Floor',
    type: 'office',
    typeLabel: '🏢 Department Office',
    department: 'Information Technology',
    landmark: 'Opposite Student Project Display Board',
    directions: '2nd Floor, next to Staff Room 202.',
    timings: '10:00 AM - 4:30 PM',
    capacity: 10,
    equipment: 'Student Inquiry Desk, Department Records'
  },
  {
    id: 'loc-10',
    name: 'Student Section & Academic Counter',
    room: 'G-04',
    building: 'Administrative Wing C',
    floor: 'Ground Floor',
    type: 'office',
    typeLabel: '🏢 Administrative Office',
    department: 'Administration',
    landmark: 'Right next to Main Admission Foyer',
    directions: 'Ground Floor Admin building, Windows 1 to 4.',
    timings: '10:00 AM - 4:00 PM (Lunch: 1-2 PM)',
    capacity: 25,
    equipment: 'Bonafide, Railway Concession & Verification Counters'
  },
  {
    id: 'loc-11',
    name: 'Accounts & Fee Payment Counter',
    room: 'G-06',
    building: 'Administrative Wing C',
    floor: 'Ground Floor',
    type: 'office',
    typeLabel: '🏢 Administrative Office',
    department: 'Accounts',
    landmark: 'Beside Registrar Office',
    directions: 'Follow blue floor line to Accounts windows G-06.',
    timings: '10:00 AM - 3:00 PM',
    capacity: 20,
    equipment: 'Cashless POS, Challan Verification, Fee Inquiries'
  },
  {
    id: 'loc-12',
    name: 'Examination Cell & Confidential Section',
    room: '108',
    building: 'Administrative Wing C',
    floor: '1st Floor',
    type: 'office',
    typeLabel: '🏢 Administrative Office',
    department: 'Examinations',
    landmark: 'Next to Board Room',
    directions: '1st Floor Admin Block, Room 108.',
    timings: '11:00 AM - 4:00 PM',
    capacity: 15,
    equipment: 'Hall Ticket Re-issue, Grade-Card Corrections'
  },
  {
    id: 'loc-13',
    name: 'Central Campus Library & Digital Reading Room',
    room: 'LIB-01',
    building: 'Central Amenities Complex',
    floor: 'Ground & 1st Floor',
    type: 'amenity',
    typeLabel: '☕ Amenity',
    department: 'Library Services',
    landmark: 'Facing Main Fountain Garden',
    directions: 'Central Quadrangle, double glass doors.',
    timings: '8:00 AM - 10:00 PM (24/7 during exam weeks)',
    capacity: 350,
    equipment: '50,000+ Physical Volumes, IEEE Xplore Access, Silent Study Pods'
  },
  {
    id: 'loc-14',
    name: 'Campus Cafeteria & Food Court',
    room: 'CAN-01',
    building: 'Central Amenities Complex',
    floor: 'Ground Floor',
    type: 'amenity',
    typeLabel: '☕ Amenity',
    department: 'Hospitality & Services',
    landmark: 'Behind Student Activity Center',
    directions: 'Follow pathway towards Green Garden Lawn.',
    timings: '7:30 AM - 8:30 PM',
    capacity: 250,
    equipment: 'Fresh Meals, Juice Bar, Coffee Station, Outdoor Gazebo'
  },
  {
    id: 'loc-15',
    name: 'Campus Auditorium B (Main Tech Audi)',
    room: 'AUD-B',
    building: 'Central Amenities Complex',
    floor: '2nd Floor',
    type: 'amenity',
    typeLabel: '☕ Amenity',
    department: 'Cultural & Events Cell',
    landmark: 'Above Central Library',
    directions: 'Grand Staircase from Central Amenities atrium to 2nd Floor.',
    timings: 'Open for Scheduled Events & Rehearsals',
    capacity: 500,
    equipment: 'Dolby Acoustic Sound, Stage Lighting, Dual 4K Laser Displays'
  },
  {
    id: 'loc-16',
    name: 'Campus First Aid & Health Center',
    room: 'MED-01',
    building: 'Administrative Wing C',
    floor: 'Ground Floor',
    type: 'amenity',
    typeLabel: '☕ Amenity',
    department: 'Health Services',
    landmark: 'Adjacent to North Security Office',
    directions: 'North gate entrance, ramp access to Room MED-01.',
    timings: '8:30 AM - 7:00 PM (Doctor on call 24x7)',
    capacity: 10,
    equipment: 'Emergency Recovery Beds, First Aid, Nebulizers, Ambulance Bay'
  }
];

// -------------------------------------------------------------
// Lost & Found Demonstration Listings
// -------------------------------------------------------------
const DEFAULT_LOST_ITEMS = [
  {
    id: 'lost-1',
    title: 'Casio fx-991CW Scientific Calculator',
    type: 'lost',
    category: 'electronics',
    categoryLabel: '📱 Electronics',
    location: 'Central Library 2nd Floor (Table 18)',
    date: '2026-10-13',
    description: 'Black calculator with a small neon green dot sticker on the battery cover. Left on table during evening study session.',
    reporter: 'Rahul K. (TE CS)',
    contact: 'Discord: rahul_k#301',
    status: 'lost',
    isClaimed: false
  },
  {
    id: 'lost-2',
    title: 'Blue RFID Campus ID Card in Lanyard',
    type: 'found',
    category: 'cards',
    categoryLabel: '💳 ID & Wallets',
    location: 'Canteen Table 4 near juice counter',
    date: '2026-10-14',
    description: 'DYP student smart ID card with dark blue branded lanyard. Belonging to Computer Engg student with initials S.M.',
    reporter: 'Canteen Security Desk',
    contact: 'Campus Security Office (Window 2)',
    status: 'found',
    isClaimed: false
  },
  {
    id: 'lost-3',
    title: 'Boat Airdopes 141 White Case',
    type: 'lost',
    category: 'electronics',
    categoryLabel: '📱 Electronics',
    location: 'Computer Lab 304',
    date: '2026-10-12',
    description: 'White charging case with red silicone protective sleeve. Lost after CS practical session batch 2.',
    reporter: 'Priya V. (SE IT)',
    contact: 'priya.v@campus.edu',
    status: 'lost',
    isClaimed: false
  },
  {
    id: 'lost-4',
    title: 'Set of 3 Keys with Batman Keychain',
    type: 'found',
    category: 'keys',
    categoryLabel: '🔑 Keys & Badges',
    location: 'Staircase 1 between Ground & 1st Floor',
    date: '2026-10-14',
    description: 'Two small silver locker keys and one brass door key on a black metallic Batman logo ring.',
    reporter: 'Aditya S. (BE Mech)',
    contact: 'aditya.s@campus.edu',
    status: 'found',
    isClaimed: false
  },
  {
    id: 'lost-5',
    title: 'Calculus II Spiral Bound Handwritten Notes',
    type: 'lost',
    category: 'books',
    categoryLabel: '📚 Books & Notes',
    location: 'Auditorium Hall B',
    date: '2026-10-10',
    description: 'Blue cover Classmate spiral notebook containing MATH 152 formula derivations and past paper solutions.',
    reporter: 'Sneha P. (FE Engg)',
    contact: 'sneha.p@campus.edu',
    status: 'claimed',
    isClaimed: true
  }
];

// -------------------------------------------------------------
// Campus Quick Help: Forms, Timings, Departments & Portals
// -------------------------------------------------------------
const CAMPUS_ACADEMIC_FORMS = [
  {
    code: 'ACAD-01',
    title: 'Bonafide Certificate Application',
    desc: 'Official certificate for passport, education loan, hostel admission & scholarship applications.',
    time: '24-48 Hours',
    fee: 'Free',
    office: 'Student Section (Window 1)'
  },
  {
    code: 'ACAD-02',
    title: 'Railway Concession Pass Form',
    desc: 'Subsidized local & outstation railway travel concession pass for full-time enrolled students.',
    time: 'Same Day',
    fee: 'Free',
    office: 'Student Section (Window 2)'
  },
  {
    code: 'EXAM-03',
    title: 'Duplicate Hall Ticket / Admit Card Request',
    desc: 'Emergency request for damaged or misplaced semester examination hall tickets.',
    time: 'Immediate',
    fee: '₹50',
    office: 'Examination Cell (Room 108)'
  },
  {
    code: 'ACAD-04',
    title: 'Leave of Absence / Medical Certificate Form',
    desc: 'Official request for attendance regularization due to medical leave or university events.',
    time: '3 Working Days',
    fee: 'Free',
    office: 'Department HOD Office'
  },
  {
    code: 'EXAM-05',
    title: 'Semester Exam Re-evaluation & Verification',
    desc: 'Formal application for answer-sheet photocopy verification, re-totaling, and re-checking.',
    time: '7 Working Days',
    fee: '₹250/subject',
    office: 'Examination Cell (Room 108)'
  }
];

const CAMPUS_OFFICE_TIMINGS = [
  {
    name: 'Student Section',
    hours: '10:00 AM - 4:00 PM (Lunch: 1:00 - 2:00 PM)',
    days: 'Monday to Friday',
    location: 'Admin Block C, Ground Floor',
    status: 'Open Now',
    inCharge: 'Mr. S. K. Deshmukh'
  },
  {
    name: 'Accounts & Fee Counter',
    hours: '10:00 AM - 3:00 PM',
    days: 'Monday to Friday',
    location: 'Admin Block C, Window G-06',
    status: 'Open Now',
    inCharge: 'Mrs. A. R. Joshi'
  },
  {
    name: 'Examination Cell',
    hours: '11:00 AM - 4:00 PM',
    days: 'Monday to Saturday (1st & 3rd Sat)',
    location: 'Admin Block C, Room 108',
    status: 'Open Now',
    inCharge: 'Prof. V. N. Patil'
  },
  {
    name: 'Central Campus Library',
    hours: '8:00 AM - 10:00 PM (24/7 in Exam Week)',
    days: 'All 7 Days',
    location: 'Central Amenities Complex',
    status: 'Open Now',
    inCharge: 'Chief Librarian Dr. M. Iyer'
  },
  {
    name: 'First Aid & Health Center',
    hours: '8:30 AM - 7:00 PM (Emergency 24x7)',
    days: 'All Days',
    location: 'Admin Block C (North Gate)',
    status: 'Open Now',
    inCharge: 'Dr. Ananya Rao'
  }
];

const CAMPUS_DEPARTMENTS = [
  { name: 'Computer Engineering', hod: 'Dr. A. P. Shinde', email: 'hod.comp@dyp.edu', room: 'Block A - Room 301', phone: 'Ext. 2101' },
  { name: 'Information Technology', hod: 'Dr. R. S. Kulkarni', email: 'hod.it@dyp.edu', room: 'Block A - Room 201', phone: 'Ext. 2102' },
  { name: 'AI & Data Science', hod: 'Dr. P. M. Jadhav', email: 'hod.aids@dyp.edu', room: 'Block A - Room 303', phone: 'Ext. 2103' },
  { name: 'Mechanical Engineering', hod: 'Dr. S. B. More', email: 'hod.mech@dyp.edu', room: 'Block A - Room 110', phone: 'Ext. 2104' },
  { name: 'Electronics & Telecom', hod: 'Dr. M. D. Gaikwad', email: 'hod.entc@dyp.edu', room: 'Block A - Room 210', phone: 'Ext. 2105' },
  { name: 'Applied Sciences (First Year)', hod: 'Dr. N. T. Pawar', email: 'hod.fe@dyp.edu', room: 'Block A - Room 105', phone: 'Ext. 2106' }
];

const CAMPUS_PORTALS = [
  { title: 'Student ERP Portal', desc: 'Attendance, marks, fees & academic profile', url: 'https://erp.dypcampus.edu', icon: '🎓' },
  { title: 'University Exam Portal', desc: 'Question banks, syllabus & grade cards', url: 'https://exam.university.edu', icon: '📚' },
  { title: 'NPTEL & Swayam Registry', desc: 'Earn MOOC credits approved by academic council', url: 'https://swayam.gov.in', icon: '💻' },
  { title: 'Campus Digital Library', desc: 'Access 5,000+ IEEE journals, papers & e-books', url: 'https://library.dypcampus.edu', icon: '🌐' },
  { title: 'Placement & Career Cell', desc: 'Campus drive registrations & aptitude portal', url: 'https://tpo.dypcampus.edu', icon: '🎯' }
];

// Persistence Helpers
function loadPersistedRequests() {
  try {
    const raw = localStorage.getItem('dyp_help_requests') || localStorage.getItem('collabu_help_requests');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) { console.warn(e); }
  return DEFAULT_HELP_REQUESTS;
}

function saveRequests(list) {
  try {
    localStorage.setItem('dyp_help_requests', JSON.stringify(list));
  } catch (e) { console.warn(e); }
}

function loadPersistedEvents() {
  try {
    const raw = localStorage.getItem('dyp_campus_events') || localStorage.getItem('collabu_campus_events');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) { console.warn(e); }
  return DEFAULT_EVENTS;
}

function saveEvents(list) {
  try {
    localStorage.setItem('dyp_campus_events', JSON.stringify(list));
  } catch (e) { console.warn(e); }
}

function loadPersistedTeammates() {
  try {
    const raw = localStorage.getItem('dyp_teammates') || localStorage.getItem('collabu_teammates');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) { console.warn(e); }
  return DEFAULT_TEAMMATES;
}

function saveTeammates(list) {
  try {
    localStorage.setItem('dyp_teammates', JSON.stringify(list));
  } catch (e) { console.warn(e); }
}

function loadPersistedLocations() {
  try {
    const raw = localStorage.getItem('dyp_campus_locations');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) { console.warn(e); }
  return DEFAULT_CAMPUS_LOCATIONS;
}

function saveLocations(list) {
  try {
    localStorage.setItem('dyp_campus_locations', JSON.stringify(list));
  } catch (e) { console.warn(e); }
}

function loadPersistedLostItems() {
  try {
    const raw = localStorage.getItem('dyp_lost_found_items');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) { console.warn(e); }
  return DEFAULT_LOST_ITEMS;
}

function saveLostItems(list) {
  try {
    localStorage.setItem('dyp_lost_found_items', JSON.stringify(list));
  } catch (e) { console.warn(e); }
}

// -------------------------------------------------------------
// Campus Connect Datasets & Local Persistence Handlers
// -------------------------------------------------------------
const DEFAULT_CAMPUS_MENTORS = [
  {
    id: 'mentor-1',
    name: 'Rohan Kulkarni',
    initials: 'RK',
    branch: 'CSE',
    year: '4th Year',
    languages: ['English', 'Hindi', 'Marathi'],
    topics: ['Academics', 'Hackathons', 'Placements'],
    helpAreas: 'Full-Stack Web, Data Structures, Placement Prep, SIH',
    bio: 'Final year CSE student placed at Rakuten. Smart India Hackathon finalist and ex-president of Coding Club. Happy to help 12th-pass students understand what CSE actually teaches, coding workloads, and lab cultures.',
    isVerifiedVolunteer: true,
    isDemo: true,
    rating: '4.9 ★',
    sessionsCount: 28
  },
  {
    id: 'mentor-2',
    name: 'Tanvi Deshmukh',
    initials: 'TD',
    branch: 'IT',
    year: '3rd Year',
    languages: ['English', 'Marathi'],
    topics: ['Branch Selection', 'Hostel Life', 'Clubs'],
    helpAreas: 'ACM Chapter, Hostel Management, Cloud Fundamentals, Cultural Fest',
    bio: 'Third-year Information Technology student. Staying at the on-campus DYP hostel for 3 years. Can honestly answer everything about mess food, curfew, Wi-Fi reliability, room allotments, and peer study groups.',
    isVerifiedVolunteer: true,
    isDemo: true,
    rating: '5.0 ★',
    sessionsCount: 34
  },
  {
    id: 'mentor-3',
    name: 'Aditya Verma',
    initials: 'AV',
    branch: 'AI/DS',
    year: '2nd Year',
    languages: ['English', 'Hindi'],
    topics: ['Academics', 'Branch Selection', 'Hackathons'],
    helpAreas: 'Python, Machine Learning Basics, Math for AI, Beginners Coding',
    bio: 'Sophomore in AI & Data Science. Transitioned from state board PCM with zero prior coding background. Can guide beginners who feel nervous about starting college without previous programming knowledge.',
    isVerifiedVolunteer: true,
    isDemo: true,
    rating: '4.8 ★',
    sessionsCount: 19
  },
  {
    id: 'mentor-4',
    name: 'Meera Nair',
    initials: 'MN',
    branch: 'E&TC',
    year: '3rd Year',
    languages: ['English', 'Hindi'],
    topics: ['Academics', 'Campus Facilities', 'Placements'],
    helpAreas: 'Robotics Club, Embedded IoT, Core Hardware Labs, Circuit Design',
    bio: 'Junior year Electronics & Telecommunication engineer. Active in Robotics & IoT club. Can explain the real career paths in core electronics, VLSI, and software crossovers for circuit branches.',
    isVerifiedVolunteer: true,
    isDemo: true,
    rating: '4.9 ★',
    sessionsCount: 22
  },
  {
    id: 'mentor-5',
    name: 'Siddharth Patil',
    initials: 'SP',
    branch: 'Mechanical',
    year: '4th Year',
    languages: ['English', 'Marathi', 'Hindi'],
    topics: ['Campus Facilities', 'Clubs', 'Academics'],
    helpAreas: 'Formula Student SAE, CAD/SolidWorks, CNC Workshop, Tech Fests',
    bio: 'Final year Mechanical Engineering lead. Chassis head for the college Formula Student racing team. Ask me about mechanical workshops, maker spaces, and student automotive projects at DYP.',
    isVerifiedVolunteer: true,
    isDemo: true,
    rating: '4.7 ★',
    sessionsCount: 16
  },
  {
    id: 'mentor-6',
    name: 'Neha Kulkarni',
    initials: 'NK',
    branch: 'CSE',
    year: '2nd Year',
    languages: ['English', 'Hindi', 'Marathi'],
    topics: ['Admission Guidance', 'Hostel Life', 'College Life'],
    helpAreas: 'MHT-CET Counseling, Document Verification, Campus Life, Clubs',
    bio: 'Second-year CSE. Cleared MHT-CET in 2024. Remember the admission counseling and branch dilemma vividly. Love helping aspirants make peaceful, well-informed choices with zero stress.',
    isVerifiedVolunteer: true,
    isDemo: true,
    rating: '5.0 ★',
    sessionsCount: 41
  }
];

const DEFAULT_QA_QUESTIONS = [
  {
    id: 'qa-1',
    category: 'Academics and Teaching',
    targetBranch: 'General DYP Campus',
    title: 'How approachable are first-year professors if a student needs help after class?',
    details: 'I am coming from a small-town school and feel a bit intimidated by large lecture halls. Do professors hold office hours or mentor sessions?',
    asker: 'Aakash (12th Aspirant)',
    timestamp: '2 hours ago',
    answers: [
      {
        id: 'ans-1',
        author: 'Rohan Kulkarni',
        role: 'CSE • 4th Year',
        type: 'experience',
        text: 'From my personal experience, first-year faculty members are very welcoming. Every department assigns a Faculty Guardian (mentor) for every 20 students who meets you weekly. You can also visit their cabins during counter hours.',
        helpfulCount: 18
      }
    ]
  },
  {
    id: 'qa-2',
    category: 'Branch Selection',
    targetBranch: 'Computer Science (CSE)',
    title: 'What is the practical difference between CSE and AI/DS at DYP in terms of curriculum and placements?',
    details: 'My CET score is eligible for both. Will choosing AI/DS restrict me from regular software engineer roles during campus placements?',
    asker: 'Simran K. (Pune)',
    timestamp: 'Yesterday',
    answers: [
      {
        id: 'ans-2',
        author: 'Aditya Verma',
        role: 'AI/DS • 2nd Year',
        type: 'experience',
        text: 'In the first two years, 85% of subjects are almost identical (C++, Data Structures, OS, DBMS). In 3rd year, AI/DS focuses more on Machine Learning, Deep Learning, and NLP, while CSE has Compiler Design and Distributed Systems. Software companies open for both equally.',
        helpfulCount: 29
      }
    ]
  },
  {
    id: 'qa-3',
    category: 'College Life',
    targetBranch: 'General DYP Campus',
    title: 'Is it easy for introvert students to make friends and find good project partners in first year?',
    details: 'I take some time to open up in new environments. What are the best ways to get involved in student circles?',
    asker: 'Devendra (Nashik)',
    timestamp: '2 days ago',
    answers: [
      {
        id: 'ans-3',
        author: 'Tanvi Deshmukh',
        role: 'IT • 3rd Year',
        type: 'experience',
        text: 'Absolutely! The first-week induction program pairs you into small teams for fun campus treasure hunts and mini-challenges. Joining student clubs like GDSC or the cultural committee is the fastest way to build lasting friendships.',
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'qa-4',
    category: 'Campus Facilities',
    targetBranch: 'General DYP Campus',
    title: 'Are high-performance GPU workstations and central library accessible 24/7 during exam weeks?',
    details: 'I like studying late at night and want to run PyTorch deep learning models for my projects. Are labs open after normal college hours?',
    asker: 'Vikram S. (Mumbai)',
    timestamp: '3 days ago',
    answers: [
      {
        id: 'ans-4',
        author: 'Meera Nair',
        role: 'E&TC • 3rd Year',
        type: 'general',
        text: 'The Central Library study reading rooms are open 24/7 during semester exams with security and power backup. The Innovation Labs and Cloud Computing center can be accessed up to 8:30 PM on weekdays with lab coordinator permission.',
        helpfulCount: 15
      }
    ]
  },
  {
    id: 'qa-5',
    category: 'Clubs and Hackathons',
    targetBranch: 'Computer Science (CSE)',
    title: 'Can freshers without prior coding experience participate in campus hackathons?',
    details: 'I have never coded before 12th grade. Will I be able to join hackathons or is it only for experienced coders?',
    asker: 'Pooja M. (Kolhapur)',
    timestamp: '4 days ago',
    answers: [
      {
        id: 'ans-5',
        author: 'Rohan Kulkarni',
        role: 'CSE • 4th Year',
        type: 'experience',
        text: 'Yes! Hackathons need teams with varied skills including UI/UX design, documentation, presentation, and ideation. Senior teams frequently recruit freshers for testing and research. You will learn more in 24 hours than in 2 months of theory.',
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'qa-6',
    category: 'Admission Guidance',
    targetBranch: 'General DYP Campus',
    title: 'What documents should I keep ready for CAP rounds and institutional document verification?',
    details: 'Want to ensure no delays during the seat reporting window. What are the essential certificates needed?',
    asker: 'Aarav G.',
    timestamp: '5 days ago',
    answers: [
      {
        id: 'ans-6',
        author: 'Neha Kulkarni',
        role: 'CSE • 2nd Year',
        type: 'general',
        text: 'Keep 3 self-attested sets of: MHT-CET/JEE Scorecard, 10th & 12th marksheets, School Leaving/Transfer Certificate, Domicile/Nationality Certificate, and Income/Caste validity if applicable. Having soft copies on Google Drive saves panic!',
        helpfulCount: 27
      }
    ]
  },
  {
    id: 'qa-7',
    category: 'Hostel and Accommodation',
    targetBranch: 'General DYP Campus',
    title: 'How are the hostel amenities, safety, laundry, and mess food for outstation students?',
    details: 'Coming from outside Maharashtra. How is the room sharing setup, hot water, and cleanliness?',
    asker: 'Sanyam (Nagpur)',
    timestamp: '6 days ago',
    answers: [
      {
        id: 'ans-7',
        author: 'Tanvi Deshmukh',
        role: 'IT • 3rd Year',
        type: 'experience',
        text: 'Rooms have 2 or 3-sharing options with individual study tables, cupboards, and high-speed Wi-Fi. Hot water is available via solar heaters every morning. The mess serves both North and South Indian food with special menu on Sundays.',
        helpfulCount: 38
      }
    ]
  },
  {
    id: 'qa-8',
    category: 'Fees and Expenses',
    targetBranch: 'General DYP Campus',
    title: 'Are there additional laboratory, library, or activity fees beyond the declared annual tuition?',
    details: 'Want to budget accurately for the entire academic year. Are exam fees or club memberships extra?',
    asker: 'Priya R.',
    timestamp: '1 week ago',
    answers: [
      {
        id: 'ans-8',
        author: 'Alex Chen',
        role: 'CSE • 3rd Year',
        type: 'general',
        text: 'The government fee regulatory authority (FRA) approved fee structure covers tuition and lab development. The university examination fee (approx ₹1200 per sem) is paid directly to the university portal. Most technical clubs are free to join.',
        helpfulCount: 19
      }
    ]
  },
  {
    id: 'qa-9',
    category: 'Placements and Career Opportunities',
    targetBranch: 'Computer Science (CSE)',
    title: 'What kind of companies visit for internships from the 6th semester onwards?',
    details: 'Do product companies visit or predominantly IT service firms? When does coding interview training start?',
    asker: 'Karan J.',
    timestamp: '1 week ago',
    answers: [
      {
        id: 'ans-9',
        author: 'Rohan Kulkarni',
        role: 'CSE • 4th Year',
        type: 'experience',
        text: 'Both visit in large numbers. Product companies like Rakuten, Barclays, Veritas, and Nvidia recruit for internships from 6th semester with stipends ranging from ₹25k to ₹80k/mo. Training cell runs DSA and Aptitude bootcamps from 4th semester.',
        helpfulCount: 44
      }
    ]
  }
];

const DEFAULT_STUDENT_STORIES = [
  {
    id: 'story-1',
    category: 'Campus Life',
    readTime: '4 min read',
    title: 'My First Month at DYP: What to Expect & How to Settle In',
    author: 'Neha Kulkarni',
    authorRole: 'CSE • 2nd Year',
    date: 'Oct 2026',
    preview: 'From the nervousness of finding lecture hall 304 to eating late-night canteen dosas with roommates, here is how the first month actually felt.',
    content: `When I first walked through the DYP campus gates with my parent, my head was spinning with anxieties. Will I fit in? Will the lectures be impossible?

Here is what really happened in month 1:
1. The First Week is Pure Exploration: Everyone is in the same boat. Nobody knows where the physics lab is, and people will happily walk together to find classrooms.
2. The Induction Program is Fun: Don't skip it. It gave me my 3 closest friends whom I now study with daily.
3. Don't Hesitate to Ask Seniors: Seniors wearing event badges are genuinely happy to guide you.
4. Set Up a Routine Early: Engineering gives you independence, but keeping 2 hours every evening for revision prevents mid-term panic.`,
    takeaway: 'Be open to saying hello first. The college community is much warmer than you think!'
  },
  {
    id: 'story-2',
    category: 'Branch Guidance',
    readTime: '5 min read',
    title: 'Things to Know Before Choosing a Branch: CS vs IT vs AI/DS',
    author: 'Aditya Verma',
    authorRole: 'AI/DS • 2nd Year',
    date: 'Sep 2026',
    preview: 'A clear, unbiased breakdown of core syllabus differences and career trajectories to help you pick the right branch for your personality.',
    content: `Every admission season, aspirants agonize over CS vs IT vs AI/DS cutoffs.

Here is what you actually need to understand:
• Computer Science (CSE): Covers full computing theory. If you love understanding how operating systems, network protocols, compilers, and hardware abstractions work, choose CSE.
• Information Technology (IT): Slightly more focused on software applications, network security, web architecture, and cloud systems.
• AI & Data Science (AI/DS): Heavy focus on probability, linear algebra, Python ML algorithms, data pipelines, and NLP.

The Reality for Placements:
Over 90% of tech companies allow all three branches to sit for software engineer, full-stack, cloud, and ML roles. Choose what excites your intellectual curiosity!`,
    takeaway: 'Your skill in building projects matters far more than minor branch label differences.'
  },
  {
    id: 'story-3',
    category: 'Academic Life',
    readTime: '4 min read',
    title: 'A Day in the Life of a CSE Student: Classes, Labs & Coding',
    author: 'Rohan Kulkarni',
    authorRole: 'CSE • 4th Year',
    date: 'Sep 2026',
    preview: 'Step into a typical Thursday: morning theory lectures, afternoon hands-on compiler labs, evening library sprints, and club meetups.',
    content: `Curious what an engineering day looks like? Here is my typical day:
• 8:45 AM: Morning coffee at the campus canteen with teammates.
• 9:15 AM - 12:15 PM: Theory lectures (Data Structures, Theory of Computation).
• 12:15 PM - 1:15 PM: Lunch break and lawn hangout.
• 1:15 PM - 3:15 PM: Hands-on Lab in Lab 304. Implementing balanced binary trees in C++.
• 3:30 PM - 5:00 PM: ACM / GDSC open source workshop.
• 5:30 PM - 7:00 PM: Library reading room for quiet problem solving.

It is busy, but you never feel bored because you are creating real software every day!`,
    takeaway: 'Balance is key — study hard during labs so your weekends stay free for hackathons and fun.'
  },
  {
    id: 'story-4',
    category: 'Competitions',
    readTime: '6 min read',
    title: 'My First Hackathon Experience: From Nervous Beginner to Top 5',
    author: 'Sophia Ramirez',
    authorRole: 'CS Sophomore',
    date: 'Aug 2026',
    preview: 'How our freshman team built a smart campus navigation prototype in 36 hours with pizza, debugging tears, and unforgettable memories.',
    content: `In our first semester, our seniors nudged us to register for the 36-Hour Campus Hackathon. We almost backed out because we had only learned basic Python.

What happened next was magical:
• Hour 4: We finalized our idea: an automated Lost & Found matcher with image similarity.
• Hour 18: Nothing worked and we were surviving on canteen cold coffee.
• Hour 24: A senior mentor helped us fix our API endpoints in 10 minutes.
• Hour 34: Our prototype actually worked on mobile screens!

We finished in Top 5 out of 60 teams. Hackathons teach you resilience, teamwork, and fast problem solving like no classroom ever can.`,
    takeaway: 'Never wait until you feel "fully ready" to enter a competition. Dive in and learn on the fly.'
  },
  {
    id: 'story-5',
    category: 'Preparation',
    readTime: '5 min read',
    title: 'How to Prepare for College Life: Habits, Tech Stack & Mindset',
    author: 'Marcus Brody',
    authorRole: 'CS Senior',
    date: 'Aug 2026',
    preview: 'What you can do in the 2 months after 12th exams to get a massive head start in college without burning out your vacation.',
    content: `If you have finished your entrance exams and are waiting for CAP admissions, here is the ultimate low-stress preparation guide:
1. Master Touch Typing: Being able to type code at 60+ WPM without looking at the keyboard will double your productivity.
2. Install Linux or Learn Command Line: Basic terminal commands will give you instant confidence in semester 1 labs.
3. Pick One Language: Learn either Python or C++ syntax through interactive platforms like freeCodeCamp.
4. Work on Communication: Presentation skills are just as valuable as writing clean code.`,
    takeaway: 'Spend 1 hour a day learning practical skills, and spend the rest resting and enjoying your break!'
  },
  {
    id: 'story-6',
    category: 'Hostel & Life',
    readTime: '4 min read',
    title: 'What I Wish I Knew Before Joining College: 7 Honest Tips',
    author: 'Tanvi Deshmukh',
    authorRole: 'IT • 3rd Year',
    date: 'Jul 2026',
    preview: 'From keeping digital copies of all documents to building a good rapport with lab assistants, 7 practical tips nobody tells you.',
    content: `Looking back at my first year, here are 7 things I wish someone had told me on day one:
1. Keep your attendance above 75% early in the semester so you never have to stress before exams.
2. Lab assistants know the equipment inside out — be polite, listen carefully, and they will save your practical exams.
3. Make a GitHub profile in month one and upload every assignment.
4. Don't buy textbooks immediately; seniors pass down high-scoring reference notes.
5. Take care of your sleep cycle. Pulling all-nighters before math quizzes backfires.
6. Join at least one non-technical club (sports, drama, photography).
7. College is a marathon, not a sprint. Celebrate small wins!`,
    takeaway: 'Consistency beats last-minute cramming every single time.'
  }
];

const DEFAULT_CONVO_REQUESTS = [
  {
    id: 'req-c-1',
    aspirantName: 'Kavya Joshi',
    preferredBranch: 'AI & Data Science (AI/DS)',
    mentorName: 'Aditya Verma',
    question: 'Scored 93 percentile in CET. Want to know about the AI/DS lab hardware and math coursework difficulty.',
    preferredLang: 'English / Hindi Mixed',
    preferredTime: 'Weekend Morning (10 AM - 12 PM)',
    optionalMsg: 'Can connect over Google Meet or campus phone.',
    status: 'Accepted',
    createdAt: 'Yesterday'
  },
  {
    id: 'req-c-2',
    aspirantName: 'Pranav Shinde',
    preferredBranch: 'Computer Science (CSE)',
    mentorName: 'Rohan Kulkarni',
    question: 'Confused between DYP CSE and another Pune college. Want honest feedback about coding clubs and placement packages.',
    preferredLang: 'Marathi',
    preferredTime: 'Weekday Evening (6 PM - 8 PM)',
    optionalMsg: 'Interested in competitive coding culture.',
    status: 'Pending',
    createdAt: '3 hours ago'
  },
  {
    id: 'req-c-3',
    aspirantName: 'Zoya Khan',
    preferredBranch: 'Information Technology (IT)',
    mentorName: 'Tanvi Deshmukh',
    question: 'Inquiring about hostel security, night curfew timings, and room amenities for outstation girls.',
    preferredLang: 'English',
    preferredTime: 'Saturday Afternoon (2 PM - 5 PM)',
    optionalMsg: 'Coming from Ahmedabad.',
    status: 'Accepted',
    createdAt: '2 days ago'
  }
];

function loadPersistedMentors() {
  try {
    const raw = localStorage.getItem('dyp_campus_mentors');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) { console.warn(e); }
  return DEFAULT_CAMPUS_MENTORS;
}

function saveMentors(list) {
  try {
    localStorage.setItem('dyp_campus_mentors', JSON.stringify(list));
  } catch (e) { console.warn(e); }
}

function loadPersistedQA() {
  try {
    const raw = localStorage.getItem('dyp_campus_qa');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) { console.warn(e); }
  return DEFAULT_QA_QUESTIONS;
}

function saveQA(list) {
  try {
    localStorage.setItem('dyp_campus_qa', JSON.stringify(list));
  } catch (e) { console.warn(e); }
}

function loadPersistedStories() {
  try {
    const raw = localStorage.getItem('dyp_campus_stories');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) { console.warn(e); }
  return DEFAULT_STUDENT_STORIES;
}

function saveStories(list) {
  try {
    localStorage.setItem('dyp_campus_stories', JSON.stringify(list));
  } catch (e) { console.warn(e); }
}

function loadPersistedConvoRequests() {
  try {
    const raw = localStorage.getItem('dyp_campus_convo_requests');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) { console.warn(e); }
  return DEFAULT_CONVO_REQUESTS;
}

function saveConvoRequests(list) {
  try {
    localStorage.setItem('dyp_campus_convo_requests', JSON.stringify(list));
  } catch (e) { console.warn(e); }
}

function loadPersistedReports() {
  try {
    const raw = localStorage.getItem('dyp_campus_reports');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) { console.warn(e); }
  return [];
}

function saveReports(list) {
  try {
    localStorage.setItem('dyp_campus_reports', JSON.stringify(list));
  } catch (e) { console.warn(e); }
}

// Global Application State - DYP CAMPUS 360
const CollabUState = {
  activeTab: 'dashboard',
  helpRequests: loadPersistedRequests(),
  events: loadPersistedEvents(),
  teammates: loadPersistedTeammates(),
  locations: loadPersistedLocations(),
  lostItems: loadPersistedLostItems(),
  campusMentors: loadPersistedMentors(),
  campusQA: loadPersistedQA(),
  studentStories: loadPersistedStories(),
  convoRequests: loadPersistedConvoRequests(),
  campusReports: loadPersistedReports(),
  forms: CAMPUS_ACADEMIC_FORMS,
  officeTimings: CAMPUS_OFFICE_TIMINGS,
  departments: CAMPUS_DEPARTMENTS,
  portals: CAMPUS_PORTALS,

  // Filters
  connectFilters: {
    branch: 'all',
    year: 'all',
    language: 'all',
    topic: 'all',
    search: '',
    activeConnectTab: 'mentors',
    qaCategory: 'all'
  },
  navigatorFilters: {
    type: 'all',
    building: 'all',
    floor: 'all',
    search: ''
  },
  lostFilters: {
    status: 'all',
    category: 'all',
    search: ''
  },
  helpFilters: {
    category: 'all',
    type: 'all',
    search: '',
    sort: 'newest'
  },
  eventsFilters: {
    category: 'all',
    venue: 'all',
    search: '',
    sort: 'soonest'
  },
  teammatesFilters: {
    skill: 'all',
    status: 'all',
    search: '',
    sort: 'active'
  },

  // Announcements
  announcements: [
    {
      id: 'ann-1',
      title: 'Annual Campus 36-Hr Hackathon registrations close in 48 hours!',
      meta: 'Dean of Student Affairs • 2 hrs ago'
    },
    {
      id: 'ann-2',
      title: 'Central Library 24/7 hours extended for In-Semester Examinations',
      meta: 'Library Services Committee • Yesterday'
    },
    {
      id: 'ann-3',
      title: 'Free GitHub Student Developer Pack verification desk open in Lab 304',
      meta: 'Open Source Club • 2 days ago'
    }
  ],

  // Top Mentors
  mentors: [
    { name: 'Dev Patel', initials: 'DP', skill: 'Data Structures & C++', solved: '38 solved' },
    { name: 'Priya Nair', initials: 'PN', skill: 'Figma UI/UX & Tailwind', solved: '29 solved' },
    { name: 'Marcus Brody', initials: 'MB', skill: 'Docker, AWS & Backend', solved: '24 solved' }
  ]
};

// Expose state globally
window.CampusState = CollabUState;

// -------------------------------------------------------------
// 2. DOM Initialization
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initDashboard();
  initNavigator();
  initHelpHub();
  initEvents();
  initTeammates();
  initLostAndFound();
  initCampusHelp();
  initCampusConnect();
  initUnifiedSearch();
  initQuickActionModal();
  initPills();
  initDatabaseStatusModal();
  initEventDetailsModal();
  initSupabaseDataSync();
});

// -------------------------------------------------------------
// 3. Navigation Controller
// -------------------------------------------------------------
function initNavigation() {
  const navButtons = document.querySelectorAll('.nav-link');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  navButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabTarget = btn.getAttribute('data-tab');
      switchTab(tabTarget);
      if (navMenu && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // Delegated clicks for jumping between tabs
  document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('[data-goto-tab]');
    if (targetLink) {
      e.preventDefault();
      const tabTarget = targetLink.getAttribute('data-goto-tab');
      switchTab(tabTarget);
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }

    const statCardTarget = e.target.closest('.stat-card[data-target-tab]');
    if (statCardTarget) {
      const targetTab = statCardTarget.getAttribute('data-target-tab');
      switchTab(targetTab);
    }
  });

  const brandHomeLink = document.getElementById('brand-home-link');
  if (brandHomeLink) {
    brandHomeLink.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Handle URL hash on initial load & hash changes
  const validTabs = ['dashboard', 'navigator', 'events', 'campus-connect', 'teammates', 'help-hub', 'lost-found', 'campus-help'];
  const initialHash = (window.location.hash || '').replace('#', '');
  if (initialHash && validTabs.includes(initialHash)) {
    switchTab(initialHash);
  }

  window.addEventListener('hashchange', () => {
    const currentHash = (window.location.hash || '').replace('#', '');
    if (currentHash && validTabs.includes(currentHash)) {
      switchTab(currentHash);
    }
  });
}

function switchTab(tabName) {
  CollabUState.activeTab = tabName;

  document.querySelectorAll('.nav-link').forEach(btn => {
    if (btn.getAttribute('data-tab') === tabName) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  const sections = {
    'dashboard': document.getElementById('section-dashboard'),
    'navigator': document.getElementById('section-navigator'),
    'events': document.getElementById('section-events'),
    'campus-connect': document.getElementById('section-campus-connect'),
    'teammates': document.getElementById('section-teammates'),
    'help-hub': document.getElementById('section-help-hub'),
    'lost-found': document.getElementById('section-lost-found'),
    'campus-help': document.getElementById('section-campus-help')
  };

  Object.keys(sections).forEach(key => {
    const sec = sections[key];
    if (sec) {
      if (key === tabName) {
        sec.classList.remove('hidden');
        sec.classList.add('active');
      } else {
        sec.classList.add('hidden');
        sec.classList.remove('active');
      }
    }
  });

  if (tabName === 'navigator') {
    renderNavigator();
  } else if (tabName === 'events') {
    renderEvents();
  } else if (tabName === 'campus-connect') {
    renderCampusConnect();
  } else if (tabName === 'teammates') {
    renderTeammates();
  } else if (tabName === 'help-hub') {
    renderHelpHub();
  } else if (tabName === 'lost-found') {
    renderLostAndFound();
  } else if (tabName === 'campus-help') {
    renderCampusHelp();
  } else if (tabName === 'dashboard') {
    renderKPIs();
    renderDashboardHelpList();
    renderDashboardEventsList();
    renderCampusConnectHighlight();
    renderDashboardStories();
  }
}

// -------------------------------------------------------------
// 4. Campus Dashboard Renderer
// -------------------------------------------------------------
function initDashboard() {
  renderKPIs();
  renderDashboardHelpList();
  renderDashboardEventsList();
  renderAnnouncements();
  renderMentors();
  renderCampusConnectHighlight();
  renderDashboardStories();
}

function renderKPIs() {
  const kpiHelp = document.getElementById('kpi-help-count');
  const kpiEvent = document.getElementById('kpi-event-count');
  const kpiTeam = document.getElementById('kpi-teammate-count');
  const kpiNotes = document.getElementById('kpi-notes-count');
  const helpBadge = document.getElementById('help-badge');

  const activeHelpCount = CollabUState.helpRequests.length;
  const activeTeammateSpots = CollabUState.teammates.filter(t => t.status === 'hackathon').length * 3 + 3;

  if (kpiHelp) kpiHelp.textContent = activeHelpCount;
  if (helpBadge) helpBadge.textContent = activeHelpCount;
  if (kpiEvent) kpiEvent.textContent = CollabUState.events.length;
  if (kpiTeam) kpiTeam.textContent = activeTeammateSpots;
  if (kpiNotes) {
    kpiNotes.textContent = CollabUState.locations.length + '+';
    const statLabel = kpiNotes.parentElement ? kpiNotes.parentElement.querySelector('.stat-label') : null;
    if (statLabel) statLabel.textContent = 'Campus Facilities Tracked';
    const statMeta = kpiNotes.parentElement ? kpiNotes.parentElement.querySelector('.stat-meta') : null;
    if (statMeta) statMeta.textContent = 'Across 4 Academic Blocks';
  }
}

function renderDashboardHelpList() {
  const container = document.getElementById('dashboard-help-list');
  if (!container) return;

  const previewRequests = CollabUState.helpRequests.slice(0, 3);

  container.innerHTML = previewRequests.map(req => {
    const categoryClass = getCategoryClass(req.category);
    const isOffer = req.type === 'offer';

    return `
      <article class="item-card ${isOffer ? 'is-offer' : ''}" data-req-id="${req.id}">
        <div class="item-card-top">
          <div style="display:flex;align-items:center;gap:0.4rem;">
            <span class="tag-badge ${categoryClass}">${req.categoryLabel}</span>
            <span class="intent-pill ${isOffer ? 'intent-offer' : 'intent-request'}">
              ${isOffer ? '💡 Offered' : '🆘 Request'}
            </span>
            ${req.isUrgent ? '<span class="urgent-badge">🔥 Urgent</span>' : ''}
          </div>
          <span class="item-time">${req.timestamp}</span>
        </div>
        <h4 class="item-title">${escapeHTML(req.title)}</h4>
        <p class="item-desc">${escapeHTML(req.description)}</p>
        <div class="item-footer">
          <div class="item-author">
            <span class="author-mini-avatar">${req.initials}</span>
            <span>${escapeHTML(req.author)} • <small>${escapeHTML(req.department)}</small></span>
          </div>
          <button class="btn btn-outline btn-sm" onclick="openRespondModal('${req.id}')">
            ${isOffer ? 'Connect' : 'Respond'} (${req.responsesCount})
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function renderDashboardEventsList() {
  const container = document.getElementById('dashboard-events-list');
  if (!container) return;

  const previewEvents = CollabUState.events.slice(0, 2);

  container.innerHTML = previewEvents.map(evt => `
    <article class="event-preview-card" data-event-id="${evt.id}">
      <div class="event-date-box">
        <span class="event-month">${evt.month}</span>
        <span class="event-day">${evt.day}</span>
      </div>
      <div class="event-details">
        <div class="event-badge-row">
          <span class="event-tag">${evt.category}</span>
          <span class="event-loc">📍 ${escapeHTML(evt.location)}</span>
        </div>
        <h4 class="event-title">${escapeHTML(evt.title)}</h4>
        <p class="item-desc">${escapeHTML(evt.description)}</p>
        <div class="item-footer">
          <span class="item-time">⏰ ${evt.time} • <strong>${evt.registeredCount} registered</strong></span>
          <button class="btn ${evt.isRegistered ? 'btn-outline' : 'btn-primary'} btn-sm" onclick="handleEventRegistration('${evt.id}')">
            ${evt.isRegistered ? 'Registered ✓' : 'Register Now'}
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

function renderAnnouncements() {
  const container = document.getElementById('announcements-container');
  if (!container) return;

  container.innerHTML = CollabUState.announcements.map(ann => `
    <div class="announcement-item">
      <div class="announcement-title">${escapeHTML(ann.title)}</div>
      <div class="announcement-meta">${escapeHTML(ann.meta)}</div>
    </div>
  `).join('');
}

function renderMentors() {
  const container = document.getElementById('mentors-container');
  if (!container) return;

  container.innerHTML = CollabUState.mentors.map(m => `
    <div class="mentor-row">
      <div class="mentor-profile">
        <div class="mentor-avatar">${m.initials}</div>
        <div>
          <div class="mentor-name">${escapeHTML(m.name)}</div>
          <div class="mentor-skill">${escapeHTML(m.skill)}</div>
        </div>
      </div>
      <span class="mentor-stat">${m.solved}</span>
    </div>
  `).join('');
}

// -------------------------------------------------------------
// 5. STEP 2: STUDENT HELP HUB CONTROLLER
// -------------------------------------------------------------
function initHelpHub() {
  const catPills = document.querySelectorAll('.cat-pill[data-category]');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      CollabUState.helpFilters.category = pill.getAttribute('data-category');
      renderHelpHub();
    });
  });

  const helpSearchInput = document.getElementById('help-search-input');
  const clearSearchBtn = document.getElementById('btn-clear-help-search');

  if (helpSearchInput) {
    helpSearchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim().toLowerCase();
      CollabUState.helpFilters.search = val;
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', val.length === 0);
      }
      renderHelpHub();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (helpSearchInput) helpSearchInput.value = '';
      CollabUState.helpFilters.search = '';
      clearSearchBtn.classList.add('hidden');
      renderHelpHub();
    });
  }

  const typeFilter = document.getElementById('help-type-filter');
  if (typeFilter) {
    typeFilter.addEventListener('change', (e) => {
      CollabUState.helpFilters.type = e.target.value;
      renderHelpHub();
    });
  }

  const sortFilter = document.getElementById('help-sort-filter');
  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      CollabUState.helpFilters.sort = e.target.value;
      renderHelpHub();
    });
  }

  const resetBtn = document.getElementById('btn-reset-filters');
  const emptyClearBtn = document.getElementById('btn-empty-clear');

  const resetAllFilters = () => {
    CollabUState.helpFilters.category = 'all';
    CollabUState.helpFilters.type = 'all';
    CollabUState.helpFilters.search = '';
    CollabUState.helpFilters.sort = 'newest';

    if (helpSearchInput) helpSearchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
    if (typeFilter) typeFilter.value = 'all';
    if (sortFilter) sortFilter.value = 'newest';

    catPills.forEach(p => {
      if (p.getAttribute('data-category') === 'all') {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    renderHelpHub();
    showToast('Filters have been reset', 'info');
  };

  if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);
  if (emptyClearBtn) emptyClearBtn.addEventListener('click', resetAllFilters);

  bindHelpModals();
  renderHelpHub();
}

function renderHelpHub() {
  updateCategoryCounts();

  const grid = document.getElementById('help-cards-grid');
  const emptyState = document.getElementById('help-empty-state');
  const resultsText = document.getElementById('help-results-text');
  const resetLink = document.getElementById('btn-reset-filters');
  if (!grid) return;

  const { category, type, search, sort } = CollabUState.helpFilters;

  let filtered = CollabUState.helpRequests.filter(req => {
    if (category !== 'all' && req.category !== category) return false;
    if (type !== 'all' && req.type !== type) return false;
    if (search) {
      const matchText = `${req.title} ${req.description} ${req.courseTag || ''} ${req.author} ${req.department}`.toLowerCase();
      if (!matchText.includes(search)) return false;
    }
    return true;
  });

  filtered.sort((a, b) => {
    if (sort === 'urgent') {
      if (a.isUrgent && !b.isUrgent) return -1;
      if (!a.isUrgent && b.isUrgent) return 1;
    } else if (sort === 'responses') {
      return (b.responsesCount || 0) - (a.responsesCount || 0);
    }
    return (b.timestampMs || 0) - (a.timestampMs || 0);
  });

  const total = CollabUState.helpRequests.length;
  const isFiltered = category !== 'all' || type !== 'all' || search !== '';

  if (resultsText) {
    resultsText.textContent = isFiltered ? `Showing ${filtered.length} of ${total} posts` : `Showing all ${total} posts across all categories`;
  }

  if (resetLink) resetLink.classList.toggle('hidden', !isFiltered);

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  grid.innerHTML = filtered.map(req => {
    const isOffer = req.type === 'offer';
    const categoryClass = getCategoryClass(req.category);

    return `
      <article class="help-card-full ${isOffer ? 'is-offer' : ''} ${req.isUrgent ? 'is-urgent' : ''}" data-id="${req.id}">
        <div>
          <div class="card-top-badges">
            <div class="badges-left">
              <span class="tag-badge ${categoryClass}">${req.categoryLabel}</span>
              <span class="intent-pill ${isOffer ? 'intent-offer' : 'intent-request'}">
                ${isOffer ? '💡 Skill/Notes' : '🆘 Needs Help'}
              </span>
              ${req.isUrgent ? '<span class="urgent-badge">🔥 Urgent</span>' : ''}
            </div>
            <span class="item-time">${req.timestamp}</span>
          </div>

          <div style="margin-top: 0.65rem;">
            ${req.courseTag ? `<span class="card-course-pill">🏷️ ${escapeHTML(req.courseTag)}</span>` : ''}
            <h3 class="card-main-title">${escapeHTML(req.title)}</h3>
            <p class="card-main-desc">${escapeHTML(req.description)}</p>
          </div>

          ${req.contact ? `
            <div class="card-contact-hint">
              <span>📬 Reach out:</span>
              <strong>${escapeHTML(req.contact)}</strong>
            </div>
          ` : ''}
        </div>

        <div class="card-bottom-footer">
          <div class="author-chip-box">
            <div class="author-avatar-circle">${req.initials}</div>
            <div class="author-meta-info">
              <span class="author-name-text">${escapeHTML(req.author)}</span>
              <span class="author-dept-text">${escapeHTML(req.department)}</span>
            </div>
          </div>
          <button class="btn ${isOffer ? 'btn-outline' : 'btn-primary'} btn-sm" onclick="openRespondModal('${req.id}')">
            ${isOffer ? 'Connect' : 'Offer Help'} (${req.responsesCount})
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function updateCategoryCounts() {
  const reqs = CollabUState.helpRequests;
  const countAll = document.getElementById('count-all');
  const countCoding = document.getElementById('count-coding');
  const countAcademic = document.getElementById('count-academic');
  const countHackathon = document.getElementById('count-hackathon');
  const countNotes = document.getElementById('count-notes');
  const countGeneral = document.getElementById('count-general');

  if (countAll) countAll.textContent = reqs.length;
  if (countCoding) countCoding.textContent = reqs.filter(r => r.category === 'coding').length;
  if (countAcademic) countAcademic.textContent = reqs.filter(r => r.category === 'academic').length;
  if (countHackathon) countHackathon.textContent = reqs.filter(r => r.category === 'hackathon').length;
  if (countNotes) countNotes.textContent = reqs.filter(r => r.category === 'notes').length;
  if (countGeneral) countGeneral.textContent = reqs.filter(r => r.category === 'general').length;
}

function bindHelpModals() {
  const postModal = document.getElementById('modal-post-help');
  const btnClosePost = document.getElementById('btn-close-post-help');
  const btnCancelPost = document.getElementById('btn-cancel-post-help');
  const btnCreateHelp = document.getElementById('btn-create-help-request');
  const btnOfferSkills = document.getElementById('btn-offer-skills-top');
  const formPostHelp = document.getElementById('form-post-help');

  const openPostModal = (defaultType = 'request') => {
    if (!postModal) return;
    const typeRadio = postModal.querySelector(`input[name="postType"][value="${defaultType}"]`);
    if (typeRadio) typeRadio.checked = true;

    const heading = document.getElementById('help-modal-heading');
    if (heading) {
      heading.textContent = defaultType === 'offer' ? 'Offer Skills or Share Notes' : 'Post to Help Hub';
    }
    postModal.classList.add('active');
  };

  if (btnCreateHelp) btnCreateHelp.addEventListener('click', () => openPostModal('request'));
  if (btnOfferSkills) btnOfferSkills.addEventListener('click', () => openPostModal('offer'));

  const closePostModal = () => {
    if (postModal) postModal.classList.remove('active');
  };

  if (btnClosePost) btnClosePost.addEventListener('click', closePostModal);
  if (btnCancelPost) btnCancelPost.addEventListener('click', closePostModal);

  if (postModal) {
    postModal.addEventListener('click', (e) => {
      if (e.target === postModal) closePostModal();
    });
  }

  if (formPostHelp) {
    formPostHelp.addEventListener('submit', (e) => {
      e.preventDefault();

      const postType = formPostHelp.querySelector('input[name="postType"]:checked').value;
      const category = document.getElementById('post-category').value;
      const courseTag = document.getElementById('post-course').value.trim();
      const title = document.getElementById('post-title').value.trim();
      const desc = document.getElementById('post-desc').value.trim();
      const author = document.getElementById('post-author').value.trim() || 'Alex Chen';
      const dept = document.getElementById('post-dept').value.trim() || 'Computer Science';
      const contact = document.getElementById('post-contact').value.trim();
      const isUrgent = document.getElementById('post-urgent').checked;

      if (!title || !desc) {
        showToast('Please fill in the title and description.', 'info');
        return;
      }

      const parts = author.split(' ');
      const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : author.substring(0, 2).toUpperCase();

      const newPost = {
        id: 'req-' + Date.now(),
        type: postType,
        title: title,
        description: desc,
        category: category,
        categoryLabel: getCategoryLabel(category),
        courseTag: courseTag,
        isUrgent: isUrgent,
        author: author,
        initials: initials,
        department: dept,
        contact: contact,
        timestamp: 'Just now',
        timestampMs: Date.now(),
        responsesCount: 0,
        status: 'open'
      };

      const submitBtn = formPostHelp.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Publishing...';
      }

      const publishHelpAsync = async () => {
        let savedToCloud = false;
        if (window.CampusSupabase && window.CampusSupabase.isConfigured()) {
          try {
            const dbReq = await window.CampusSupabase.postHelpRequest(newPost);
            if (dbReq && dbReq.id) newPost.id = dbReq.id;
            savedToCloud = true;
          } catch (err) {
            console.warn('[Campus 360] Supabase postHelpRequest failed, saving locally:', err);
          }
        }

        CollabUState.helpRequests.unshift(newPost);
        saveRequests(CollabUState.helpRequests);

        formPostHelp.reset();
        closePostModal();

        renderHelpHub();
        renderDashboardHelpList();
        renderKPIs();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Publish Post';
        }

        if (savedToCloud) {
          showToast(`Help request published to Supabase Cloud!`, 'success');
        } else {
          showToast(`Successfully published: "${title.substring(0, 32)}..."`, 'success');
        }
      };

      publishHelpAsync();
    });
  }

  // Response Modal Handling
  const respondModal = document.getElementById('modal-respond-help');
  const btnCloseRespond = document.getElementById('btn-close-respond-help');
  const btnCancelRespond = document.getElementById('btn-cancel-respond');
  const formRespond = document.getElementById('form-respond-help');

  const closeRespondModal = () => {
    if (respondModal) respondModal.classList.remove('active');
  };

  if (btnCloseRespond) btnCloseRespond.addEventListener('click', closeRespondModal);
  if (btnCancelRespond) btnCancelRespond.addEventListener('click', closeRespondModal);

  if (respondModal) {
    respondModal.addEventListener('click', (e) => {
      if (e.target === respondModal) closeRespondModal();
    });
  }

  if (formRespond) {
    formRespond.addEventListener('submit', (e) => {
      e.preventDefault();
      const reqId = document.getElementById('respond-request-id').value;
      const contact = document.getElementById('respond-contact').value.trim();

      const targetPost = CollabUState.helpRequests.find(r => r.id === reqId);
      if (targetPost) {
        if (window.CampusSupabase && window.CampusSupabase.isConfigured()) {
          window.CampusSupabase.incrementHelpResponse(reqId, targetPost.responsesCount);
        }

        targetPost.responsesCount = (targetPost.responsesCount || 0) + 1;
        saveRequests(CollabUState.helpRequests);

        renderHelpHub();
        renderDashboardHelpList();

        closeRespondModal();
        formRespond.reset();

        showToast(`Response sent to ${targetPost.author}! They will contact you at: ${contact}`, 'success');
      }
    });
  }
}

window.openRespondModal = function(reqId) {
  const post = CollabUState.helpRequests.find(r => r.id === reqId);
  if (!post) return;

  const modal = document.getElementById('modal-respond-help');
  const targetSummary = document.getElementById('respond-target-summary');
  const reqIdInput = document.getElementById('respond-request-id');
  const modalSubtitle = document.getElementById('respond-modal-subtitle');

  if (reqIdInput) reqIdInput.value = reqId;
  if (modalSubtitle) {
    modalSubtitle.textContent = post.type === 'offer' ? `Connect with ${post.author}` : `Respond to ${post.author}'s request`;
  }

  if (targetSummary) {
    targetSummary.innerHTML = `
      <span class="target-badge ${getCategoryClass(post.category)}">${post.categoryLabel}</span>
      <h4 class="target-title">${escapeHTML(post.title)}</h4>
      <div class="target-author">Posted by ${escapeHTML(post.author)} (${escapeHTML(post.department)}) • ${post.timestamp}</div>
    `;
  }

  if (modal) modal.classList.add('active');
};

// -------------------------------------------------------------
// 6. STEP 3: CAMPUS EVENT DISCOVERY CONTROLLER
// -------------------------------------------------------------
function initEvents() {
  const catPills = document.querySelectorAll('.cat-pill[data-event-category]');
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      CollabUState.eventsFilters.category = pill.getAttribute('data-event-category');
      renderEvents();
    });
  });

  const btnShowReg = document.getElementById('btn-show-registered-events');
  if (btnShowReg) {
    btnShowReg.addEventListener('click', () => {
      catPills.forEach(p => {
        if (p.getAttribute('data-event-category') === 'registered') {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
      CollabUState.eventsFilters.category = 'registered';
      renderEvents();
      window.scrollTo({ top: 380, behavior: 'smooth' });
    });
  }

  const eventsSearchInput = document.getElementById('events-search-input');
  const clearSearchBtn = document.getElementById('btn-clear-events-search');

  if (eventsSearchInput) {
    eventsSearchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim().toLowerCase();
      CollabUState.eventsFilters.search = val;
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', val.length === 0);
      }
      renderEvents();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (eventsSearchInput) eventsSearchInput.value = '';
      CollabUState.eventsFilters.search = '';
      clearSearchBtn.classList.add('hidden');
      renderEvents();
    });
  }

  const venueFilter = document.getElementById('events-venue-filter');
  if (venueFilter) {
    venueFilter.addEventListener('change', (e) => {
      CollabUState.eventsFilters.venue = e.target.value;
      renderEvents();
    });
  }

  const sortFilter = document.getElementById('events-sort-filter');
  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      CollabUState.eventsFilters.sort = e.target.value;
      renderEvents();
    });
  }

  const resetBtn = document.getElementById('btn-reset-events-filters');
  const emptyClearBtn = document.getElementById('btn-events-empty-clear');

  const resetAllEventFilters = () => {
    CollabUState.eventsFilters.category = 'all';
    CollabUState.eventsFilters.venue = 'all';
    CollabUState.eventsFilters.search = '';
    CollabUState.eventsFilters.sort = 'soonest';

    if (eventsSearchInput) eventsSearchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
    if (venueFilter) venueFilter.value = 'all';
    if (sortFilter) sortFilter.value = 'soonest';

    catPills.forEach(p => {
      if (p.getAttribute('data-event-category') === 'all') {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    renderEvents();
    showToast('Event filters have been reset', 'info');
  };

  if (resetBtn) resetBtn.addEventListener('click', resetAllEventFilters);
  if (emptyClearBtn) emptyClearBtn.addEventListener('click', resetAllEventFilters);

  bindEventSubmitModal();
  renderEvents();
}

function renderEvents() {
  updateEventCategoryCounts();

  const grid = document.getElementById('events-cards-grid');
  const emptyState = document.getElementById('events-empty-state');
  const emptyTitle = document.getElementById('events-empty-title');
  const emptyDesc = document.getElementById('events-empty-desc');
  const resultsText = document.getElementById('events-results-text');
  const resetLink = document.getElementById('btn-reset-events-filters');
  if (!grid) return;

  const { category, venue, search, sort } = CollabUState.eventsFilters;

  let filtered = CollabUState.events.filter(evt => {
    const catLower = (evt.category || '').toLowerCase();
    if (category === 'registered') {
      if (!evt.isRegistered) return false;
    } else if (category === 'hackathon') {
      if (catLower !== 'hackathon') return false;
    } else if (category === 'workshop') {
      if (catLower !== 'workshop') return false;
    } else if (category === 'competition') {
      if (catLower !== 'competition') return false;
    } else if (category === 'cultural') {
      if (catLower !== 'cultural') return false;
    } else if (category === 'seminar') {
      if (catLower !== 'seminar' && catLower !== 'tech talk' && catLower !== 'career meetup') return false;
    } else if (category === 'club') {
      if (catLower !== 'club activity' && catLower !== 'club') return false;
    }

    if (venue === 'in-person' && evt.venueType === 'virtual') return false;
    if (venue === 'virtual' && evt.venueType === 'in-person') return false;

    if (search) {
      const matchText = `${evt.title} ${evt.description} ${evt.location} ${evt.host || ''} ${evt.category}`.toLowerCase();
      if (!matchText.includes(search)) return false;
    }

    return true;
  });

  filtered.sort((a, b) => {
    if (sort === 'popular') {
      return (b.registeredCount || 0) - (a.registeredCount || 0);
    }
    return (a.dateIso || '').localeCompare(b.dateIso || '');
  });

  const total = CollabUState.events.length;
  const isFiltered = category !== 'all' || venue !== 'all' || search !== '';

  if (resultsText) {
    if (category === 'registered') {
      resultsText.textContent = `Showing ${filtered.length} event(s) you have registered for`;
    } else if (isFiltered) {
      resultsText.textContent = `Showing ${filtered.length} of ${total} campus events`;
    } else {
      resultsText.textContent = `Showing all ${total} upcoming campus events`;
    }
  }

  if (resetLink) resetLink.classList.toggle('hidden', !isFiltered);

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) {
      emptyState.classList.remove('hidden');
      if (category === 'registered') {
        if (emptyTitle) emptyTitle.textContent = "You haven't registered for any events yet";
        if (emptyDesc) emptyDesc.textContent = "Browse upcoming campus hackathons and tech workshops, and click 'Register Now' to reserve your spot!";
      } else {
        if (emptyTitle) emptyTitle.textContent = "No matching events found";
        if (emptyDesc) emptyDesc.textContent = "Try clearing your filters or search keywords.";
      }
    }
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  grid.innerHTML = filtered.map(evt => {
    const isReg = evt.isRegistered;
    const capacityPercent = Math.min(100, Math.round(((evt.registeredCount || 0) / (evt.capacity || 100)) * 100));
    const isNearlyFull = capacityPercent >= 85;

    let venueIcon = '🏛️';
    if (evt.venueType === 'virtual') venueIcon = '🌐 Virtual';
    else if (evt.venueType === 'hybrid') venueIcon = '⚡ Hybrid';
    else venueIcon = '🏛️ Campus';

    return `
      <article class="event-full-card ${isReg ? 'is-registered' : ''}" data-event-id="${evt.id}">
        <div>
          <div class="event-card-top-row">
            <div class="event-cal-chip">
              <span class="cal-month">${evt.month}</span>
              <span class="cal-day">${evt.day}</span>
              <span class="cal-time">${evt.time.split(' - ')[0] || ''}</span>
            </div>

            <div class="event-card-info">
              <div class="event-tags-row">
                <span class="event-tag">${evt.category}</span>
                <span class="venue-tag">${venueIcon}</span>
                <span class="reg-status-badge ${isReg ? 'badge-is-reg' : 'badge-open-reg'}">
                  ${isReg ? '✓ Registered' : 'Open Registration'}
                </span>
              </div>
              <h3 class="event-card-title">${escapeHTML(evt.title)}</h3>
              ${evt.host ? `<div class="event-host-badge">🏛️ Hosted by ${escapeHTML(evt.host)}</div>` : ''}
            </div>
          </div>

          <p class="event-card-desc">${escapeHTML(evt.description)}</p>

          <div class="event-meta-chips">
            <div class="event-meta-line">
              <span>📍 Location:</span> ${escapeHTML(evt.location)}
            </div>
            <div class="event-meta-line">
              <span>⏰ Schedule:</span> ${escapeHTML(evt.time)}
            </div>
          </div>

          <div class="capacity-box">
            <div class="capacity-labels">
              <span>Attendance Capacity</span>
              <strong>${evt.registeredCount} / ${evt.capacity || 100} (${capacityPercent}%)</strong>
            </div>
            <div class="capacity-track">
              <div class="capacity-fill ${isNearlyFull ? 'capacity-fill-high' : ''}" style="width: ${capacityPercent}%;"></div>
            </div>
          </div>
        </div>

        <div class="event-card-actions">
          <span class="item-time">
            ${isReg ? '🎟️ Spot Confirmed' : (isNearlyFull ? '🔥 Filling Fast' : 'Seats Available')}
          </span>
          <div style="display:flex; gap:0.5rem; align-items:center;">
            <button class="btn btn-outline btn-sm" onclick="openEventDetailsModal('${evt.id}')">
              Details &amp; Agenda
            </button>
            <button class="btn ${isReg ? 'btn-registered-state' : 'btn-primary'} btn-sm" onclick="handleEventRegistration('${evt.id}')">
              ${isReg ? 'Registered ✓' : 'Register Now'}
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function updateEventCategoryCounts() {
  const evts = CollabUState.events;
  const countAll = document.getElementById('count-events-all');
  const countHackathon = document.getElementById('count-events-hackathon');
  const countWorkshop = document.getElementById('count-events-workshop');
  const countCompetition = document.getElementById('count-events-competition');
  const countCultural = document.getElementById('count-events-cultural');
  const countSeminar = document.getElementById('count-events-seminar');
  const countClub = document.getElementById('count-events-club');
  const countRegistered = document.getElementById('count-events-registered');
  const btnRegCount = document.getElementById('btn-reg-count');

  const registeredCount = evts.filter(e => e.isRegistered).length;

  if (countAll) countAll.textContent = evts.length;
  if (countHackathon) countHackathon.textContent = evts.filter(e => (e.category || '').toLowerCase() === 'hackathon').length;
  if (countWorkshop) countWorkshop.textContent = evts.filter(e => (e.category || '').toLowerCase() === 'workshop').length;
  if (countCompetition) countCompetition.textContent = evts.filter(e => (e.category || '').toLowerCase() === 'competition').length;
  if (countCultural) countCultural.textContent = evts.filter(e => (e.category || '').toLowerCase() === 'cultural').length;
  if (countSeminar) countSeminar.textContent = evts.filter(e => {
    const c = (e.category || '').toLowerCase();
    return c === 'seminar' || c === 'tech talk' || c === 'career meetup';
  }).length;
  if (countClub) countClub.textContent = evts.filter(e => (e.category || '').toLowerCase() === 'club activity').length;
  if (countRegistered) countRegistered.textContent = registeredCount;
  if (btnRegCount) btnRegCount.textContent = registeredCount;
}

window.handleEventRegistration = async function(evtId, studentData = null) {
  const event = CollabUState.events.find(e => e.id === evtId);
  if (!event) return;

  event.isRegistered = !event.isRegistered;
  event.registeredCount += event.isRegistered ? 1 : -1;
  saveEvents(CollabUState.events);

  renderEvents();
  renderDashboardEventsList();
  renderKPIs();

  if (event.isRegistered) {
    let cloudSynced = false;
    if (window.CampusSupabase && window.CampusSupabase.isConfigured()) {
      try {
        const studentName = studentData?.name || 'Alex Chen';
        const studentEmail = studentData?.email || 'alex.chen@campus.edu';
        const studentBranch = studentData?.branch || 'TE Computer Engineering';

        await window.CampusSupabase.registerForEvent({
          eventId: event.id,
          studentName,
          studentEmail,
          studentBranch,
          currentCount: event.registeredCount
        });
        cloudSynced = true;
      } catch (err) {
        console.warn('[Campus 360] Supabase event registration failed, saved locally:', err);
      }
    }

    if (cloudSynced) {
      showToast(`Spot confirmed for "${event.title}" & saved to Supabase!`, 'success');
    } else {
      showToast(`You are registered for "${event.title}"! Added to your schedule.`, 'success');
    }
  } else {
    showToast(`Cancelled registration for "${event.title}".`, 'info');
  }
};

function bindEventSubmitModal() {
  const modal = document.getElementById('modal-create-event-dialog');
  const btnOpen = document.getElementById('btn-create-event');
  const btnClose = document.getElementById('btn-close-create-event');
  const btnCancel = document.getElementById('btn-cancel-create-event');
  const form = document.getElementById('form-create-event');

  const openModal = () => { if (modal) modal.classList.add('active'); };
  const closeModal = () => { if (modal) modal.classList.remove('active'); };

  if (btnOpen) btnOpen.addEventListener('click', openModal);
  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('event-title').value.trim();
      const category = document.getElementById('event-category').value;
      const dateStr = document.getElementById('event-date').value;
      const time = document.getElementById('event-time').value.trim();
      const location = document.getElementById('event-location').value.trim();
      const venueType = document.getElementById('event-venue-type').value;
      const host = document.getElementById('event-host').value.trim();
      const capacity = parseInt(document.getElementById('event-capacity').value, 10) || 100;
      const desc = document.getElementById('event-desc').value.trim();

      if (!title || !dateStr || !desc) {
        showToast('Please fill in all required fields.', 'info');
        return;
      }

      const dateObj = new Date(dateStr);
      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
      const month = !isNaN(dateObj.getMonth()) ? months[dateObj.getMonth()] : 'NOV';
      const day = !isNaN(dateObj.getDate()) ? String(dateObj.getDate()).padStart(2, '0') : '15';

      const newEvent = {
        id: 'evt-' + Date.now(),
        title: title,
        category: category,
        month: month,
        day: day,
        dateIso: dateStr,
        time: time,
        location: location,
        venueType: venueType,
        host: host,
        capacity: capacity,
        registeredCount: 1,
        isRegistered: true,
        description: desc
      };

      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Saving event...';
      }

      const saveEventAsync = async () => {
        let savedToCloud = false;
        if (window.CampusSupabase && window.CampusSupabase.isConfigured()) {
          try {
            const dbEvent = await window.CampusSupabase.createEvent(newEvent);
            if (dbEvent && dbEvent.id) newEvent.id = dbEvent.id;
            savedToCloud = true;
          } catch (err) {
            console.warn('[Campus 360] Supabase createEvent failed, saving locally:', err);
          }
        }

        CollabUState.events.unshift(newEvent);
        saveEvents(CollabUState.events);

        form.reset();
        closeModal();

        renderEvents();
        renderDashboardEventsList();
        renderKPIs();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Publish Event';
        }

        if (savedToCloud) {
          showToast(`Event published to Supabase Cloud: "${title.substring(0, 30)}..."`, 'success');
        } else {
          showToast(`Event published: "${title.substring(0, 30)}..." (saved locally)`, 'success');
        }
      };

      saveEventAsync();
    });
  }
}

// -------------------------------------------------------------
// 7. STEP 4: STUDENT COLLABORATION & TEAMMATES CONTROLLER
// -------------------------------------------------------------
function initTeammates() {
  const skillPills = document.querySelectorAll('#teammates-skill-tabs .cat-pill');
  skillPills.forEach(pill => {
    pill.addEventListener('click', () => {
      skillPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      CollabUState.teammatesFilters.skill = pill.getAttribute('data-skill');
      renderTeammates();
    });
  });

  // Shortcut header button: Quick filter for hackathons
  const btnQuickHackathon = document.getElementById('btn-quick-filter-hackathon');
  if (btnQuickHackathon) {
    btnQuickHackathon.addEventListener('click', () => {
      const statusSelect = document.getElementById('teammates-status-filter');
      if (statusSelect) statusSelect.value = 'hackathon';
      CollabUState.teammatesFilters.status = 'hackathon';
      renderTeammates();
      showToast('Filtered: Students actively recruiting for hackathon teams!', 'info');
      window.scrollTo({ top: 380, behavior: 'smooth' });
    });
  }

  // Search input filter
  const searchInput = document.getElementById('teammates-search-input');
  const clearSearchBtn = document.getElementById('btn-clear-teammates-search');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim().toLowerCase();
      CollabUState.teammatesFilters.search = val;
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', val.length === 0);
      }
      renderTeammates();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      CollabUState.teammatesFilters.search = '';
      clearSearchBtn.classList.add('hidden');
      renderTeammates();
    });
  }

  // Status Filter
  const statusFilter = document.getElementById('teammates-status-filter');
  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      CollabUState.teammatesFilters.status = e.target.value;
      renderTeammates();
    });
  }

  // Sort Filter
  const sortFilter = document.getElementById('teammates-sort-filter');
  if (sortFilter) {
    sortFilter.addEventListener('change', (e) => {
      CollabUState.teammatesFilters.sort = e.target.value;
      renderTeammates();
    });
  }

  // Reset filters buttons
  const resetBtn = document.getElementById('btn-reset-teammates-filters');
  const emptyClearBtn = document.getElementById('btn-teammates-empty-clear');

  const resetAllTeammatesFilters = () => {
    CollabUState.teammatesFilters.skill = 'all';
    CollabUState.teammatesFilters.status = 'all';
    CollabUState.teammatesFilters.search = '';
    CollabUState.teammatesFilters.sort = 'active';

    if (searchInput) searchInput.value = '';
    if (clearSearchBtn) clearSearchBtn.classList.add('hidden');
    if (statusFilter) statusFilter.value = 'all';
    if (sortFilter) sortFilter.value = 'active';

    skillPills.forEach(p => {
      if (p.getAttribute('data-skill') === 'all') {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    renderTeammates();
    showToast('Teammate filters have been reset', 'info');
  };

  if (resetBtn) resetBtn.addEventListener('click', resetAllTeammatesFilters);
  if (emptyClearBtn) emptyClearBtn.addEventListener('click', resetAllTeammatesFilters);

  bindTeammateModals();
  renderTeammates();
}

function renderTeammates() {
  updateTeammateSkillCounts();

  const grid = document.getElementById('teammates-cards-grid');
  const emptyState = document.getElementById('teammates-empty-state');
  const resultsText = document.getElementById('teammates-results-text');
  const resetLink = document.getElementById('btn-reset-teammates-filters');
  if (!grid) return;

  const { skill, status, search, sort } = CollabUState.teammatesFilters;

  let filtered = CollabUState.teammates.filter(tm => {
    // Skill match
    if (skill !== 'all') {
      const hasSkill = (tm.skills || []).some(s => s.toLowerCase() === skill.toLowerCase());
      if (!hasSkill) return false;
    }

    // Status match
    if (status !== 'all') {
      if (tm.status !== status) return false;
    }

    // Search query match
    if (search) {
      const skillsStr = (tm.skills || []).join(' ');
      const matchText = `${tm.name} ${tm.department} ${tm.bio} ${skillsStr} ${tm.github || ''}`.toLowerCase();
      if (!matchText.includes(search)) return false;
    }

    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    if (sort === 'alpha') {
      return a.name.localeCompare(b.name);
    }
    // Default active by invites count
    return (b.invitesCount || 0) - (a.invitesCount || 0);
  });

  const total = CollabUState.teammates.length;
  const isFiltered = skill !== 'all' || status !== 'all' || search !== '';

  if (resultsText) {
    if (isFiltered) {
      resultsText.textContent = `Showing ${filtered.length} of ${total} student profiles`;
    } else {
      resultsText.textContent = `Showing all ${total} registered student profiles`;
    }
  }

  if (resetLink) resetLink.classList.toggle('hidden', !isFiltered);

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  grid.innerHTML = filtered.map(tm => {
    let statusClass = 'status-hackathon';
    if (tm.status === 'capstone') statusClass = 'status-capstone';
    if (tm.status === 'mentor') statusClass = 'status-mentor';

    return `
      <article class="teammate-profile-card" data-student-id="${tm.id}">
        <div>
          <div class="teammate-top-row">
            <div class="teammate-user-info">
              <div class="teammate-avatar-wrap">
                <div class="teammate-avatar">${tm.initials}</div>
                <span class="active-dot-status" title="Active student"></span>
              </div>
              <div class="teammate-meta">
                <h3 class="teammate-name">${escapeHTML(tm.name)}</h3>
                <span class="teammate-dept">${escapeHTML(tm.department)} • ${escapeHTML(tm.year)}</span>
              </div>
            </div>
            <span class="teammate-status-pill ${statusClass}">${tm.statusLabel}</span>
          </div>

          <p class="teammate-bio-text" style="margin-top: 0.75rem;">${escapeHTML(tm.bio)}</p>

          <div style="margin-top: 0.65rem;">
            <div class="skills-tags-cluster">
              ${(tm.skills || []).map(sk => `
                <button class="skill-tag-badge" onclick="filterBySkillTag('${sk}')">
                  ${escapeHTML(sk)}
                </button>
              `).join('')}
            </div>
          </div>

          <div class="teammate-links-row">
            ${tm.github ? `<span class="link-chip">🔗 ${escapeHTML(tm.github)}</span>` : ''}
            <span class="link-chip">📬 ${escapeHTML(tm.contact)}</span>
          </div>
        </div>

        <div class="card-bottom-footer">
          <span class="item-time">
            <strong>${tm.invitesCount || 0}</strong> collaboration invites
          </span>
          <button class="btn btn-primary btn-sm" onclick="openInviteModal('${tm.id}')">
            Connect / Invite →
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function updateTeammateSkillCounts() {
  const tms = CollabUState.teammates;
  const countAll = document.getElementById('count-skill-all');
  const countWeb = document.getElementById('count-skill-web');
  const countPython = document.getElementById('count-skill-python');
  const countUIUX = document.getElementById('count-skill-uiux');
  const countData = document.getElementById('count-skill-data');
  const countSpeaking = document.getElementById('count-skill-speaking');
  const countCloud = document.getElementById('count-skill-cloud');

  const countBySkill = (target) => tms.filter(t => (t.skills || []).some(s => s.toLowerCase() === target.toLowerCase())).length;

  if (countAll) countAll.textContent = tms.length;
  if (countWeb) countWeb.textContent = countBySkill('Web Development');
  if (countPython) countPython.textContent = countBySkill('Python');
  if (countUIUX) countUIUX.textContent = countBySkill('UI/UX Design');
  if (countData) countData.textContent = countBySkill('Data Science');
  if (countSpeaking) countSpeaking.textContent = countBySkill('Public Speaking');
  if (countCloud) countCloud.textContent = countBySkill('Cloud & DevOps');
}

window.filterBySkillTag = function(skillName) {
  const skillPills = document.querySelectorAll('#teammates-skill-tabs .cat-pill');
  skillPills.forEach(p => {
    if (p.getAttribute('data-skill') === skillName) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  CollabUState.teammatesFilters.skill = skillName;
  renderTeammates();
  showToast(`Filtered students skilled in: ${skillName}`, 'info');
};

function bindTeammateModals() {
  // 1. Create/Edit Profile Modal
  const profileModal = document.getElementById('modal-create-profile-dialog');
  const btnOpenProfile = document.getElementById('btn-create-profile');
  const btnCloseProfile = document.getElementById('btn-close-create-profile');
  const btnCancelProfile = document.getElementById('btn-cancel-create-profile');
  const formProfile = document.getElementById('form-create-profile');

  const openProfileModal = () => { if (profileModal) profileModal.classList.add('active'); };
  const closeProfileModal = () => { if (profileModal) profileModal.classList.remove('active'); };

  if (btnOpenProfile) btnOpenProfile.addEventListener('click', openProfileModal);
  if (btnCloseProfile) btnCloseProfile.addEventListener('click', closeProfileModal);
  if (btnCancelProfile) btnCancelProfile.addEventListener('click', closeProfileModal);

  if (profileModal) {
    profileModal.addEventListener('click', (e) => {
      if (e.target === profileModal) closeProfileModal();
    });
  }

  if (formProfile) {
    formProfile.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('profile-name').value.trim();
      const major = document.getElementById('profile-major').value.trim();
      const year = document.getElementById('profile-year').value;
      const status = document.getElementById('profile-status').value;
      const bio = document.getElementById('profile-bio').value.trim();
      const contact = document.getElementById('profile-contact').value.trim();
      const github = document.getElementById('profile-github').value.trim();

      // Gather checked skills
      const checkedBoxes = formProfile.querySelectorAll('input[name="profileSkills"]:checked');
      const skills = Array.from(checkedBoxes).map(cb => cb.value);

      if (!name || !major || !bio || skills.length === 0) {
        showToast('Please fill in all profile details and select at least 1 skill.', 'info');
        return;
      }

      let statusLabel = '🚀 Looking for Hackathon Team';
      if (status === 'capstone') statusLabel = '🎓 Capstone & Projects';
      if (status === 'mentor') statusLabel = '💡 Peer Mentoring';

      const parts = name.split(' ');
      const initials = parts.length > 1 ? (parts[0][0] + parts[1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();

      // Check if existing profile exists for this name or add new
      const existingIdx = CollabUState.teammates.findIndex(t => t.name.toLowerCase() === name.toLowerCase());

      const profileObj = {
        id: existingIdx >= 0 ? CollabUState.teammates[existingIdx].id : 'tm-' + Date.now(),
        name: name,
        initials: initials,
        department: major,
        year: year,
        status: status,
        statusLabel: statusLabel,
        skills: skills,
        bio: bio,
        contact: contact,
        github: github,
        invitesCount: existingIdx >= 0 ? CollabUState.teammates[existingIdx].invitesCount : 0
      };

      if (existingIdx >= 0) {
        CollabUState.teammates[existingIdx] = profileObj;
      } else {
        CollabUState.teammates.unshift(profileObj);
      }

      saveTeammates(CollabUState.teammates);
      closeProfileModal();

      renderTeammates();
      renderKPIs();

      showToast(`Profile saved for ${name}! You are now visible to campus recruiters.`, 'success');
    });
  }

  // 2. Invite Teammate Modal
  const inviteModal = document.getElementById('modal-invite-teammate-dialog');
  const btnCloseInvite = document.getElementById('btn-close-invite-teammate');
  const btnCancelInvite = document.getElementById('btn-cancel-invite');
  const formInvite = document.getElementById('form-invite-teammate');

  const closeInviteModal = () => { if (inviteModal) inviteModal.classList.remove('active'); };

  if (btnCloseInvite) btnCloseInvite.addEventListener('click', closeInviteModal);
  if (btnCancelInvite) btnCancelInvite.addEventListener('click', closeInviteModal);

  if (inviteModal) {
    inviteModal.addEventListener('click', (e) => {
      if (e.target === inviteModal) closeInviteModal();
    });
  }

  if (formInvite) {
    formInvite.addEventListener('submit', (e) => {
      e.preventDefault();

      const studentId = document.getElementById('invite-student-id').value;
      const project = document.getElementById('invite-project').value.trim();
      const role = document.getElementById('invite-role').value.trim();
      const msg = document.getElementById('invite-msg').value.trim();
      const contact = document.getElementById('invite-contact').value.trim();

      const student = CollabUState.teammates.find(t => t.id === studentId);
      if (student) {
        student.invitesCount = (student.invitesCount || 0) + 1;
        saveTeammates(CollabUState.teammates);

        renderTeammates();
        closeInviteModal();
        formInvite.reset();

        showToast(`Collaboration invite sent to ${student.name} for "${project}"! Notification sent via ${contact}`, 'success');
      }
    });
  }
}

window.openInviteModal = function(studentId) {
  const student = CollabUState.teammates.find(t => t.id === studentId);
  if (!student) return;

  const modal = document.getElementById('modal-invite-teammate-dialog');
  const targetSummary = document.getElementById('invite-target-summary');
  const studentIdInput = document.getElementById('invite-student-id');
  const subtitle = document.getElementById('invite-modal-subtitle');

  if (studentIdInput) studentIdInput.value = studentId;
  if (subtitle) subtitle.textContent = `Invite ${student.name} (${student.department}) to your team`;

  if (targetSummary) {
    targetSummary.innerHTML = `
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.35rem;">
        <strong>👤 ${escapeHTML(student.name)}</strong>
        <span class="pill-label">${escapeHTML(student.year)}</span>
      </div>
      <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:0.35rem;">${escapeHTML(student.department)}</div>
      <div style="display:flex;flex-wrap:wrap;gap:0.3rem;">
        ${(student.skills || []).map(s => `<span class="badge-counter">${escapeHTML(s)}</span>`).join('')}
      </div>
    `;
  }

  if (modal) modal.classList.add('active');
};

// -------------------------------------------------------------
// 8. SMART CAMPUS NAVIGATOR CONTROLLER
// -------------------------------------------------------------
function initNavigator() {
  const navTabs = document.querySelectorAll('#navigator-category-tabs .cat-pill');
  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      navTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      CollabUState.navigatorFilters.type = tab.getAttribute('data-nav-type') || 'all';
      renderNavigator();
    });
  });

  const searchInput = document.getElementById('navigator-search-input');
  const clearBtn = document.getElementById('btn-clear-navigator-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim().toLowerCase();
      CollabUState.navigatorFilters.search = val;
      if (clearBtn) clearBtn.classList.toggle('hidden', val.length === 0);
      renderNavigator();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      CollabUState.navigatorFilters.search = '';
      clearBtn.classList.add('hidden');
      renderNavigator();
    });
  }

  const buildingFilter = document.getElementById('navigator-building-filter');
  if (buildingFilter) {
    buildingFilter.addEventListener('change', (e) => {
      CollabUState.navigatorFilters.building = e.target.value;
      renderNavigator();
    });
  }

  const floorFilter = document.getElementById('navigator-floor-filter');
  if (floorFilter) {
    floorFilter.addEventListener('change', (e) => {
      CollabUState.navigatorFilters.floor = e.target.value;
      renderNavigator();
    });
  }

  const resetBtn = document.getElementById('btn-reset-navigator-filters');
  const emptyClearBtn = document.getElementById('btn-navigator-empty-clear');
  const resetNavigatorFilters = () => {
    CollabUState.navigatorFilters.type = 'all';
    CollabUState.navigatorFilters.building = 'all';
    CollabUState.navigatorFilters.floor = 'all';
    CollabUState.navigatorFilters.search = '';

    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.classList.add('hidden');
    if (buildingFilter) buildingFilter.value = 'all';
    if (floorFilter) floorFilter.value = 'all';

    navTabs.forEach(t => {
      if (t.getAttribute('data-nav-type') === 'all') t.classList.add('active');
      else t.classList.remove('active');
    });

    renderNavigator();
    showToast('Campus navigator filters reset', 'info');
  };

  if (resetBtn) resetBtn.addEventListener('click', resetNavigatorFilters);
  if (emptyClearBtn) emptyClearBtn.addEventListener('click', resetNavigatorFilters);

  // Find My Next Class Assistant Bindings
  initFindMyNextClass();

  // Initial render
  renderNavigator();
}

function renderNavigator() {
  updateNavigatorCategoryCounts();

  const grid = document.getElementById('navigator-cards-grid');
  const emptyState = document.getElementById('navigator-empty-state');
  const resultsText = document.getElementById('navigator-results-text');
  const resetLink = document.getElementById('btn-reset-navigator-filters');
  if (!grid) return;

  const { type, building, floor, search } = CollabUState.navigatorFilters;

  let filtered = CollabUState.locations.filter(loc => {
    if (type !== 'all' && loc.type !== type) return false;
    if (building !== 'all' && loc.building !== building) return false;
    if (floor !== 'all' && loc.floor !== floor) return false;

    if (search) {
      const matchText = `${loc.name} ${loc.room} ${loc.building} ${loc.floor} ${loc.department} ${loc.landmark} ${loc.directions} ${loc.equipment || ''}`.toLowerCase();
      if (!matchText.includes(search)) return false;
    }

    return true;
  });

  const total = CollabUState.locations.length;
  const isFiltered = type !== 'all' || building !== 'all' || floor !== 'all' || search !== '';

  if (resultsText) {
    if (isFiltered) {
      resultsText.textContent = `Showing ${filtered.length} of ${total} verified campus locations`;
    } else {
      resultsText.textContent = `Showing all ${total} campus locations (DYP Campus Blocks A, B, C & Amenities)`;
    }
  }

  if (resetLink) resetLink.classList.toggle('hidden', !isFiltered);

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  grid.innerHTML = filtered.map(loc => {
    let tagClass = 'loc-tag-classroom';
    if (loc.type === 'lab') tagClass = 'loc-tag-lab';
    else if (loc.type === 'office') tagClass = 'loc-tag-office';
    else if (loc.type === 'amenity') tagClass = 'loc-tag-amenity';

    return `
      <article class="location-card" id="location-card-${loc.id}" data-loc-id="${loc.id}">
        <div class="location-card-top">
          <span class="location-type-tag ${tagClass}">${loc.typeLabel}</span>
          <span class="location-room-pill">Room ${escapeHTML(loc.room)}</span>
        </div>

        <h3 class="location-name">${escapeHTML(loc.name)}</h3>
        
        <div class="location-building-row">
          <span>🏛️ ${escapeHTML(loc.building)}</span>
          <span>•</span>
          <span>📍 ${escapeHTML(loc.floor)}</span>
        </div>

        <div class="location-details-list">
          <div class="location-detail-line">
            <strong>Dept / Wing:</strong>
            <span>${escapeHTML(loc.department)}</span>
          </div>
          <div class="location-detail-line">
            <strong>Landmark:</strong>
            <span>${escapeHTML(loc.landmark)}</span>
          </div>
          <div class="location-detail-line">
            <strong>Active Hours:</strong>
            <span>${escapeHTML(loc.timings)}</span>
          </div>
          ${loc.equipment ? `
            <div class="location-detail-line">
              <strong>Facilities:</strong>
              <span>${escapeHTML(loc.equipment)}</span>
            </div>
          ` : ''}
        </div>

        <div class="location-directions-box">
          <strong>🚶 Step-by-Step Route:</strong>
          <span>${escapeHTML(loc.directions)}</span>
        </div>
      </article>
    `;
  }).join('');
}

function updateNavigatorCategoryCounts() {
  const locs = CollabUState.locations;
  const countAll = document.getElementById('count-nav-all');
  const countClass = document.getElementById('count-nav-classrooms');
  const countLab = document.getElementById('count-nav-labs');
  const countOffice = document.getElementById('count-nav-offices');
  const countAmenity = document.getElementById('count-nav-amenities');

  if (countAll) countAll.textContent = locs.length;
  if (countClass) countClass.textContent = locs.filter(l => l.type === 'classroom').length;
  if (countLab) countLab.textContent = locs.filter(l => l.type === 'lab').length;
  if (countOffice) countOffice.textContent = locs.filter(l => l.type === 'office').length;
  if (countAmenity) countAmenity.textContent = locs.filter(l => l.type === 'amenity').length;
}

// -------------------------------------------------------------
// 9. "FIND MY NEXT CLASS" ASSISTANT CONTROLLER
// -------------------------------------------------------------
function initFindMyNextClass() {
  const btnRun = document.getElementById('btn-run-find-class');
  const btnJump = document.getElementById('btn-jump-find-class');
  const resultCard = document.getElementById('find-class-result');

  if (btnJump) {
    btnJump.addEventListener('click', () => {
      const widget = document.getElementById('find-class-anchor');
      if (widget) {
        widget.scrollIntoView({ behavior: 'smooth', block: 'center' });
        widget.style.outline = '3px solid #38bdf8';
        setTimeout(() => { widget.style.outline = 'none'; }, 2000);
      }
    });
  }

  if (btnRun && resultCard) {
    btnRun.addEventListener('click', () => {
      const dept = document.getElementById('find-class-dept').value;
      const year = document.getElementById('find-class-year').value;
      const slot = document.getElementById('find-class-slot').value;

      // Realistic timetable schedule mapping
      const scheduleMatrix = {
        'CS': {
          'SE': { subject: 'Data Structures & Algorithms', room: '101', locId: 'loc-1', faculty: 'Prof. K. R. Patil', time: '10:00 AM - 11:30 AM', type: 'Theory Lecture' },
          'TE': { subject: 'Cloud Computing & Distributed Systems', room: '304', locId: 'loc-4', faculty: 'Dr. A. P. Shinde', time: '1:15 PM - 3:15 PM', type: 'Hands-on Lab' },
          'BE': { subject: 'High Performance Computing & Capstone', room: '302', locId: 'loc-3', faculty: 'Prof. M. S. Joshi', time: '11:45 AM - 1:00 PM', type: 'Project Review' },
          'FE': { subject: 'Engineering Physics & Fundamentals', room: '101', locId: 'loc-1', faculty: 'Dr. N. T. Pawar', time: '9:30 AM - 11:00 AM', type: 'Core Lecture' }
        },
        'IT': {
          'SE': { subject: 'Object Oriented Programming with Java', room: '204', locId: 'loc-2', faculty: 'Prof. S. D. Wagh', time: '11:15 AM - 12:45 PM', type: 'Theory Lecture' },
          'TE': { subject: 'Full-Stack Web Architectures', room: '204', locId: 'loc-2', faculty: 'Dr. R. S. Kulkarni', time: '1:15 PM - 3:15 PM', type: 'Practical Lab' },
          'BE': { subject: 'Cyber Security & Cryptography', room: '302', locId: 'loc-3', faculty: 'Prof. V. A. Shah', time: '9:30 AM - 11:00 AM', type: 'Specialized Elective' },
          'FE': { subject: 'Basic Electronics & Workshop', room: '215', locId: 'loc-7', faculty: 'Prof. P. V. Deshpande', time: '1:15 PM - 3:15 PM', type: 'Electronics Lab' }
        },
        'AIDS': {
          'SE': { subject: 'Statistics & Probability for Machine Learning', room: '302', locId: 'loc-3', faculty: 'Prof. G. N. Sharma', time: '10:00 AM - 11:30 AM', type: 'Theory Class' },
          'TE': { subject: 'Computer Vision & Deep Learning', room: '2B', locId: 'loc-5', faculty: 'Dr. P. M. Jadhav', time: '1:15 PM - 4:15 PM', type: 'GPU Lab Session' },
          'BE': { subject: 'Natural Language Processing & LLMs', room: '304', locId: 'loc-4', faculty: 'Dr. A. P. Shinde', time: '11:45 AM - 1:00 PM', type: 'AI Lab' },
          'FE': { subject: 'Python Programming Essentials', room: '304', locId: 'loc-4', faculty: 'Prof. K. R. Patil', time: '9:30 AM - 11:00 AM', type: 'Computing Lab' }
        },
        'MECH': {
          'SE': { subject: 'Thermodynamics & Fluid Dynamics', room: '101', locId: 'loc-1', faculty: 'Prof. H. B. Jagtap', time: '9:30 AM - 11:00 AM', type: 'Core Theory' },
          'TE': { subject: 'CAD/CAM SolidWorks 3D Modeling', room: '112', locId: 'loc-6', faculty: 'Dr. S. B. More', time: '1:15 PM - 3:30 PM', type: 'Design Lab' },
          'BE': { subject: 'Automobile Dynamics & Electric Vehicles', room: '204', locId: 'loc-2', faculty: 'Prof. R. T. Mane', time: '11:15 AM - 12:45 PM', type: 'Elective' },
          'FE': { subject: 'Engineering Graphics & Drawing', room: '112', locId: 'loc-6', faculty: 'Prof. D. K. Shinde', time: '1:15 PM - 3:15 PM', type: 'Drawing Hall' }
        },
        'ENTC': {
          'SE': { subject: 'Digital Circuit Design & Microprocessors', room: '215', locId: 'loc-7', faculty: 'Prof. S. R. Kale', time: '10:00 AM - 11:30 AM', type: 'Circuits Lab' },
          'TE': { subject: 'VLSI Systems & Embedded Firmware', room: '215', locId: 'loc-7', faculty: 'Dr. M. D. Gaikwad', time: '1:15 PM - 3:15 PM', type: 'FPGA Lab' },
          'BE': { subject: 'Wireless & Optical Satellite Communications', room: '204', locId: 'loc-2', faculty: 'Prof. T. V. Rao', time: '11:15 AM - 12:45 PM', type: 'Telecom Lecture' },
          'FE': { subject: 'Basic Electrical Engineering', room: '215', locId: 'loc-7', faculty: 'Prof. S. R. Kale', time: '9:30 AM - 11:00 AM', type: 'Lab Session' }
        },
        'CIVIL': {
          'SE': { subject: 'Surveying & Structural Analysis', room: '101', locId: 'loc-1', faculty: 'Prof. B. S. Kadam', time: '10:00 AM - 11:30 AM', type: 'Civil Classroom' },
          'TE': { subject: 'Geotechnical Engineering & Concrete Tech', room: '101', locId: 'loc-1', faculty: 'Dr. R. D. Chavan', time: '1:15 PM - 3:15 PM', type: 'Testing Lab' },
          'BE': { subject: 'Transportation & Environmental Systems', room: '204', locId: 'loc-2', faculty: 'Prof. A. S. Patil', time: '11:15 AM - 12:45 PM', type: 'Theory Lecture' },
          'FE': { subject: 'Engineering Mechanics', room: '101', locId: 'loc-1', faculty: 'Prof. B. S. Kadam', time: '9:30 AM - 11:00 AM', type: 'Core Class' }
        }
      };

      const deptData = scheduleMatrix[dept] || scheduleMatrix['CS'];
      const slotClass = deptData[year] || deptData['TE'];
      const targetLoc = CollabUState.locations.find(l => l.id === slotClass.locId) || CollabUState.locations[0];

      resultCard.style.display = 'flex';
      resultCard.innerHTML = `
        <div class="class-result-info">
          <div class="class-room-badge">
            <span>Room</span>
            ${escapeHTML(slotClass.room)}
          </div>
          <div>
            <div style="font-size:0.75rem; text-transform:uppercase; letter-spacing:0.06em; color:#7dd3fc; font-weight:700;">
              ⚡ ${escapeHTML(slotClass.type)} • Next Scheduled Class
            </div>
            <h4 style="font-size:1.1rem; font-weight:800; margin:0.2rem 0; color:white;">
              ${escapeHTML(slotClass.subject)}
            </h4>
            <div style="font-size:0.82rem; color:#e0e7ff;">
              <span>👨‍🏫 ${escapeHTML(slotClass.faculty)}</span> • 
              <span>⏰ ${escapeHTML(slotClass.time)}</span> • 
              <span>🏛️ ${escapeHTML(targetLoc.building)} (${escapeHTML(targetLoc.floor)})</span>
            </div>
            <div style="font-size:0.78rem; color:#bae6fd; margin-top:0.35rem;">
              🚶 <strong>Directions:</strong> ${escapeHTML(targetLoc.directions)}
            </div>
          </div>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.5rem; align-items:flex-end;">
          <button class="class-route-btn" onclick="highlightLocationInDirectory('${targetLoc.id}')">
            Show Location Card ↓
          </button>
        </div>
      `;

      showToast(`Located next class: ${slotClass.subject} in Room ${slotClass.room}!`, 'success');
    });
  }
}

window.highlightLocationInDirectory = function(locId) {
  const card = document.getElementById(`location-card-${locId}`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    card.style.borderColor = 'var(--primary)';
    card.style.boxShadow = '0 0 0 3px var(--primary-glow)';
    setTimeout(() => {
      card.style.borderColor = '';
      card.style.boxShadow = '';
    }, 3000);
  }
};

// -------------------------------------------------------------
// 10. LOST & FOUND CONTROLLER
// -------------------------------------------------------------
function initLostAndFound() {
  const statusTabs = document.querySelectorAll('#lost-category-tabs .cat-pill');
  statusTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      statusTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      CollabUState.lostFilters.status = tab.getAttribute('data-lost-status') || 'all';
      renderLostAndFound();
    });
  });

  const searchInput = document.getElementById('lost-search-input');
  const clearBtn = document.getElementById('btn-clear-lost-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value.trim().toLowerCase();
      CollabUState.lostFilters.search = val;
      if (clearBtn) clearBtn.classList.toggle('hidden', val.length === 0);
      renderLostAndFound();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      CollabUState.lostFilters.search = '';
      clearBtn.classList.add('hidden');
      renderLostAndFound();
    });
  }

  const categoryFilter = document.getElementById('lost-category-filter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      CollabUState.lostFilters.category = e.target.value;
      renderLostAndFound();
    });
  }

  const resetBtn = document.getElementById('btn-reset-lost-filters');
  const emptyClearBtn = document.getElementById('btn-lost-empty-clear');
  const resetLostFilters = () => {
    CollabUState.lostFilters.status = 'all';
    CollabUState.lostFilters.category = 'all';
    CollabUState.lostFilters.search = '';

    if (searchInput) searchInput.value = '';
    if (clearBtn) clearBtn.classList.add('hidden');
    if (categoryFilter) categoryFilter.value = 'all';

    statusTabs.forEach(t => {
      if (t.getAttribute('data-lost-status') === 'all') t.classList.add('active');
      else t.classList.remove('active');
    });

    renderLostAndFound();
    showToast('Lost & Found filters reset', 'info');
  };

  if (resetBtn) resetBtn.addEventListener('click', resetLostFilters);
  if (emptyClearBtn) emptyClearBtn.addEventListener('click', resetLostFilters);

  bindLostFoundModal();
  renderLostAndFound();
}

function renderLostAndFound() {
  updateLostCategoryCounts();

  const grid = document.getElementById('lost-cards-grid');
  const emptyState = document.getElementById('lost-empty-state');
  const resultsText = document.getElementById('lost-results-text');
  const resetLink = document.getElementById('btn-reset-lost-filters');
  if (!grid) return;

  const { status, category, search } = CollabUState.lostFilters;

  let filtered = CollabUState.lostItems.filter(item => {
    if (status !== 'all' && item.status !== status) return false;
    if (category !== 'all' && item.category !== category) return false;

    if (search) {
      const matchText = `${item.title} ${item.description} ${item.location} ${item.reporter}`.toLowerCase();
      if (!matchText.includes(search)) return false;
    }

    return true;
  });

  const total = CollabUState.lostItems.length;
  const isFiltered = status !== 'all' || category !== 'all' || search !== '';

  if (resultsText) {
    if (isFiltered) {
      resultsText.textContent = `Showing ${filtered.length} of ${total} lost & found listings`;
    } else {
      resultsText.textContent = `Showing all ${total} campus lost & found listings`;
    }
  }

  if (resetLink) resetLink.classList.toggle('hidden', !isFiltered);

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  } else {
    if (emptyState) emptyState.classList.add('hidden');
  }

  grid.innerHTML = filtered.map(item => {
    const isLost = item.type === 'lost' && !item.isClaimed;
    const isFound = item.type === 'found' && !item.isClaimed;
    const isClaimed = item.isClaimed || item.status === 'claimed';

    let badgeMarkup = '';
    if (isClaimed) {
      badgeMarkup = '<span class="status-badge-claimed">✅ Claimed / Resolved</span>';
    } else if (isLost) {
      badgeMarkup = '<span class="status-badge-lost">🔍 Lost Item</span>';
    } else {
      badgeMarkup = '<span class="status-badge-found">🎒 Found Item</span>';
    }

    return `
      <article class="lost-card" data-item-id="${item.id}">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.75rem;">
          <div style="display:flex; align-items:center; gap:0.4rem;">
            ${badgeMarkup}
            <span class="tag-badge tag-general">${item.categoryLabel || item.category}</span>
          </div>
          <span style="font-size:0.75rem; color:var(--text-muted);">📅 ${item.date}</span>
        </div>

        <h3 style="font-size:1.05rem; font-weight:700; color:var(--text-main); margin-bottom:0.35rem;">
          ${escapeHTML(item.title)}
        </h3>

        <div style="font-size:0.82rem; color:var(--primary); font-weight:600; margin-bottom:0.6rem;">
          📍 ${escapeHTML(item.location)}
        </div>

        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:1rem; flex:1;">
          ${escapeHTML(item.description)}
        </p>

        <div class="privacy-shield-notice">
          <span>🛡️</span>
          <span>Reporter: <strong>${escapeHTML(item.reporter)}</strong> (Handle: ${escapeHTML(item.contact)})</span>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.85rem; padding-top:0.75rem; border-top:1px solid var(--border-light);">
          <span style="font-size:0.75rem; color:var(--text-muted);">
            ${isClaimed ? 'Item recovered' : 'Active listing'}
          </span>
          <button class="btn ${isClaimed ? 'btn-outline' : 'btn-primary'} btn-sm" onclick="handleClaimItem('${item.id}')">
            ${isClaimed ? 'Re-open Listing' : (isLost ? 'Found / Return Item' : 'Claim This Item')}
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function updateLostCategoryCounts() {
  const items = CollabUState.lostItems;
  const countAll = document.getElementById('count-lost-all');
  const countLost = document.getElementById('count-lost-items');
  const countFound = document.getElementById('count-found-items');
  const countClaimed = document.getElementById('count-claimed-items');

  if (countAll) countAll.textContent = items.length;
  if (countLost) countLost.textContent = items.filter(i => i.type === 'lost' && !i.isClaimed).length;
  if (countFound) countFound.textContent = items.filter(i => i.type === 'found' && !i.isClaimed).length;
  if (countClaimed) countClaimed.textContent = items.filter(i => i.isClaimed || i.status === 'claimed').length;
}

window.handleClaimItem = function(itemId) {
  const item = CollabUState.lostItems.find(i => i.id === itemId);
  if (!item) return;

  item.isClaimed = !item.isClaimed;
  item.status = item.isClaimed ? 'claimed' : item.type;
  saveLostItems(CollabUState.lostItems);

  renderLostAndFound();

  if (item.isClaimed) {
    showToast(`Listing marked as claimed/resolved! Item returned to owner.`, 'success');
  } else {
    showToast(`Listing re-opened as active in campus directory.`, 'info');
  }
};

function bindLostFoundModal() {
  const modal = document.getElementById('modal-report-lost-found');
  const btnLostTop = document.getElementById('btn-report-lost-top');
  const btnFoundTop = document.getElementById('btn-report-found-top');
  const btnClose = document.getElementById('btn-close-report-lost');
  const btnCancel = document.getElementById('btn-cancel-report-lost');
  const form = document.getElementById('form-report-lost-found');

  const openModal = (reportType = 'lost') => {
    if (modal) {
      modal.classList.add('active');
      const radio = modal.querySelector(`input[name="lostReportType"][value="${reportType}"]`);
      if (radio) radio.checked = true;
      const dateInput = document.getElementById('lost-item-date');
      if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
    }
  };

  const closeModal = () => { if (modal) modal.classList.remove('active'); };

  if (btnLostTop) btnLostTop.addEventListener('click', () => openModal('lost'));
  if (btnFoundTop) btnFoundTop.addEventListener('click', () => openModal('found'));
  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnCancel) btnCancel.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const typeRadio = form.querySelector('input[name="lostReportType"]:checked');
      const type = typeRadio ? typeRadio.value : 'lost';
      const name = document.getElementById('lost-item-name').value.trim();
      const category = document.getElementById('lost-item-category').value;
      const location = document.getElementById('lost-item-location').value.trim();
      const date = document.getElementById('lost-item-date').value;
      const desc = document.getElementById('lost-item-desc').value.trim();
      const reporter = document.getElementById('lost-item-reporter').value.trim();
      const contact = document.getElementById('lost-item-contact').value.trim();

      if (!name || !location || !desc) {
        showToast('Please fill in all required fields.', 'info');
        return;
      }

      let categoryLabel = '🎒 Other Personal';
      if (category === 'electronics') categoryLabel = '📱 Electronics';
      else if (category === 'cards') categoryLabel = '💳 ID & Wallets';
      else if (category === 'books') categoryLabel = '📚 Books & Notes';
      else if (category === 'keys') categoryLabel = '🔑 Keys & Badges';

      const newItem = {
        id: 'lost-' + Date.now(),
        title: name,
        type: type,
        category: category,
        categoryLabel: categoryLabel,
        location: location,
        date: date || new Date().toISOString().split('T')[0],
        description: desc,
        reporter: reporter,
        contact: contact,
        status: type,
        isClaimed: false
      };

      CollabUState.lostItems.unshift(newItem);
      saveLostItems(CollabUState.lostItems);

      form.reset();
      closeModal();
      renderLostAndFound();

      showToast(`Listing published: "${name}" registered on campus board!`, 'success');
    });
  }
}

// -------------------------------------------------------------
// 11. CAMPUS QUICK HELP CONTROLLER
// -------------------------------------------------------------
function initCampusHelp() {
  renderCampusHelp();
}

function renderCampusHelp() {
  const formsGrid = document.getElementById('forms-grid-container');
  const timingsGrid = document.getElementById('timings-grid-container');
  const deptsGrid = document.getElementById('depts-grid-container');
  const portalsGrid = document.getElementById('portals-grid-container');

  if (formsGrid) {
    formsGrid.innerHTML = CollabUState.forms.map(form => `
      <article class="form-card">
        <div class="form-card-icon">📄</div>
        <div style="font-size:0.7rem; font-weight:800; color:var(--primary); text-transform:uppercase;">
          Code: ${form.code}
        </div>
        <h4 class="form-card-title">${escapeHTML(form.title)}</h4>
        <p class="form-card-desc">${escapeHTML(form.desc)}</p>
        
        <div style="font-size:0.75rem; color:var(--text-muted); margin-bottom:0.75rem;">
          <div>⏱️ Turnaround: <strong>${form.time}</strong></div>
          <div>🏛️ Submission: <strong>${form.office}</strong></div>
          <div>💰 Fee: <strong>${form.fee}</strong></div>
        </div>

        <div class="form-card-footer">
          <span style="color:var(--accent-emerald); font-weight:700;">Verified Template</span>
          <button class="btn btn-outline btn-sm" onclick="downloadFormSimulation('${form.code}')">
            Download PDF ↓
          </button>
        </div>
      </article>
    `).join('');
  }

  if (timingsGrid) {
    timingsGrid.innerHTML = CollabUState.officeTimings.map(t => `
      <div class="timing-card">
        <div class="timing-header">
          <span class="timing-dept">${escapeHTML(t.name)}</span>
          <span class="timing-status-open">${t.status}</span>
        </div>
        <div class="timing-hours">
          <span>⏰</span>
          <span>${escapeHTML(t.hours)}</span>
        </div>
        <div class="timing-loc">
          <span>📍 ${escapeHTML(t.location)} (${escapeHTML(t.days)})</span>
        </div>
        <div style="font-size:0.75rem; color:var(--text-muted); margin-top:0.35rem;">
          Faculty In-Charge: <strong>${escapeHTML(t.inCharge)}</strong>
        </div>
      </div>
    `).join('');
  }

  if (deptsGrid) {
    deptsGrid.innerHTML = CollabUState.departments.map(d => `
      <div class="timing-card">
        <div class="timing-header">
          <span class="timing-dept">${escapeHTML(d.name)}</span>
          <span class="pill-label">Academic Wing</span>
        </div>
        <div style="font-size:0.84rem; color:var(--text-main); font-weight:600; margin-bottom:0.25rem;">
          HOD: ${escapeHTML(d.hod)}
        </div>
        <div class="timing-loc" style="margin-bottom:0.35rem;">
          <span>📍 ${escapeHTML(d.room)}</span>
        </div>
        <div style="font-size:0.78rem; color:var(--text-muted); display:flex; justify-content:space-between;">
          <a href="mailto:${d.email}" style="color:var(--primary); font-weight:600; text-decoration:none;">${d.email}</a>
          <span>${d.phone}</span>
        </div>
      </div>
    `).join('');
  }

  if (portalsGrid) {
    portalsGrid.innerHTML = CollabUState.portals.map(p => `
      <a href="${p.url}" target="_blank" rel="noopener noreferrer" class="portal-link-card">
        <div class="portal-icon">${p.icon}</div>
        <div>
          <div class="portal-title">${escapeHTML(p.title)} ↗</div>
          <div class="portal-sub">${escapeHTML(p.desc)}</div>
        </div>
      </a>
    `).join('');
  }
}

window.downloadFormSimulation = function(formCode) {
  const form = CollabUState.forms.find(f => f.code === formCode);
  const title = form ? form.title : formCode;
  showToast(`Simulated download: "${formCode} - ${title}.pdf" saved to your downloads folder. Submit at ${form ? form.office : 'Student Section'}.`, 'success');
};

// -------------------------------------------------------------
// 12. UNIFIED SMART SEARCH CONTROLLER (Across 5 Modules)
// -------------------------------------------------------------
function initUnifiedSearch() {
  const searchInput = document.getElementById('global-search-input');
  const searchBtn = document.getElementById('btn-global-search');
  const dropdown = document.getElementById('unified-search-dropdown');

  if (!searchInput) return;

  function runUnifiedSearch(query) {
    const q = (query || '').trim().toLowerCase();
    if (!dropdown) return;

    if (q.length < 2) {
      dropdown.classList.remove('active');
      dropdown.innerHTML = '';
      return;
    }

    // 1. Locations
    const locMatches = CollabUState.locations.filter(l => 
      `${l.name} ${l.room} ${l.building} ${l.department} ${l.landmark}`.toLowerCase().includes(q)
    ).slice(0, 3);

    // 2. Events
    const eventMatches = CollabUState.events.filter(e => 
      `${e.title} ${e.category} ${e.location} ${e.host || ''}`.toLowerCase().includes(q)
    ).slice(0, 3);

    // 3. Teammates
    const teamMatches = CollabUState.teammates.filter(t => 
      `${t.name} ${t.department} ${(t.skills || []).join(' ')}`.toLowerCase().includes(q)
    ).slice(0, 2);

    // 4. Lost & Found
    const lostMatches = CollabUState.lostItems.filter(i => 
      `${i.title} ${i.location} ${i.description}`.toLowerCase().includes(q)
    ).slice(0, 2);

    // 5. Help Requests
    const helpMatches = CollabUState.helpRequests.filter(h => 
      `${h.title} ${h.description} ${h.courseTag || ''}`.toLowerCase().includes(q)
    ).slice(0, 2);

    // 6. Campus Connect Mentors
    const mentorMatches = (CollabUState.campusMentors || []).filter(m =>
      `${m.name} ${m.branch} ${m.bio} ${(m.topics || []).join(' ')} ${(m.languages || []).join(' ')}`.toLowerCase().includes(q)
    ).slice(0, 2);

    // 7. Campus Connect Q&A
    const qaMatches = (CollabUState.campusQA || []).filter(item =>
      `${item.question} ${item.category} ${item.askerBranch || ''}`.toLowerCase().includes(q)
    ).slice(0, 2);

    const totalMatches = locMatches.length + eventMatches.length + teamMatches.length + lostMatches.length + helpMatches.length + mentorMatches.length + qaMatches.length;

    if (totalMatches === 0) {
      dropdown.innerHTML = `
        <div class="search-empty-notice">
          🔍 No direct matches found for "<strong>${escapeHTML(q)}</strong>".<br>
          <small>Try keywords like "Lab 304", "Hackathon", "Seniors", "Placement", "Python", "Calculator", or "Bonafide".</small>
        </div>
      `;
      dropdown.classList.add('active');
      return;
    }

    let html = '';

    if (mentorMatches.length > 0) {
      html += `<div class="search-group-header">🎓 Campus Connect Mentors (${mentorMatches.length})</div>`;
      mentorMatches.forEach(m => {
        html += `
          <div class="search-result-item" onclick="jumpToSearchResult('campus-connect', '${escapeHTML(m.name)}')">
            <div class="search-result-main">
              <div class="search-result-icon">🎓</div>
              <div class="search-result-text">
                <span class="search-result-title">${escapeHTML(m.name)} • ${escapeHTML(m.branch)} (${escapeHTML(m.year)})</span>
                <span class="search-result-sub">Topics: ${(m.topics || []).slice(0, 3).join(', ')}</span>
              </div>
            </div>
            <span class="search-result-badge">Senior →</span>
          </div>
        `;
      });
    }

    if (qaMatches.length > 0) {
      html += `<div class="search-group-header">💬 Senior Q&A (${qaMatches.length})</div>`;
      qaMatches.forEach(item => {
        html += `
          <div class="search-result-item" onclick="jumpToSearchResult('campus-connect', '${escapeHTML(item.category)}')">
            <div class="search-result-main">
              <div class="search-result-icon">❓</div>
              <div class="search-result-text">
                <span class="search-result-title">${escapeHTML(item.question)}</span>
                <span class="search-result-sub">${escapeHTML(item.category)} • ${(item.answers || []).length} answers</span>
              </div>
            </div>
            <span class="search-result-badge">Q&A →</span>
          </div>
        `;
      });
    }

    if (locMatches.length > 0) {
      html += `<div class="search-group-header">🧭 Campus Navigator (${locMatches.length})</div>`;
      locMatches.forEach(l => {
        html += `
          <div class="search-result-item" onclick="jumpToSearchResult('navigator', '${escapeHTML(l.room)}')">
            <div class="search-result-main">
              <div class="search-result-icon">📍</div>
              <div class="search-result-text">
                <span class="search-result-title">${escapeHTML(l.name)}</span>
                <span class="search-result-sub">${escapeHTML(l.building)} • Room ${escapeHTML(l.room)} (${escapeHTML(l.floor)})</span>
              </div>
            </div>
            <span class="search-result-badge">Navigator →</span>
          </div>
        `;
      });
    }

    if (eventMatches.length > 0) {
      html += `<div class="search-group-header">📅 Campus Events (${eventMatches.length})</div>`;
      eventMatches.forEach(e => {
        html += `
          <div class="search-result-item" onclick="jumpToSearchResult('events', '${escapeHTML(e.title)}')">
            <div class="search-result-main">
              <div class="search-result-icon">🎟️</div>
              <div class="search-result-text">
                <span class="search-result-title">${escapeHTML(e.title)}</span>
                <span class="search-result-sub">${e.month} ${e.day} • ${escapeHTML(e.location)}</span>
              </div>
            </div>
            <span class="search-result-badge">${e.category} →</span>
          </div>
        `;
      });
    }

    if (teamMatches.length > 0) {
      html += `<div class="search-group-header">👥 Student Collaboration (${teamMatches.length})</div>`;
      teamMatches.forEach(t => {
        html += `
          <div class="search-result-item" onclick="jumpToSearchResult('teammates', '${escapeHTML(t.name)}')">
            <div class="search-result-main">
              <div class="search-result-icon">👤</div>
              <div class="search-result-text">
                <span class="search-result-title">${escapeHTML(t.name)} (${escapeHTML(t.department)})</span>
                <span class="search-result-sub">Skills: ${(t.skills || []).slice(0, 3).join(', ')}</span>
              </div>
            </div>
            <span class="search-result-badge">Profile →</span>
          </div>
        `;
      });
    }

    if (lostMatches.length > 0) {
      html += `<div class="search-group-header">🔍 Lost & Found Listings (${lostMatches.length})</div>`;
      lostMatches.forEach(i => {
        html += `
          <div class="search-result-item" onclick="jumpToSearchResult('lost-found', '${escapeHTML(i.title)}')">
            <div class="search-result-main">
              <div class="search-result-icon">${i.type === 'lost' ? '🔍' : '🎒'}</div>
              <div class="search-result-text">
                <span class="search-result-title">${escapeHTML(i.title)}</span>
                <span class="search-result-sub">${i.type === 'lost' ? 'Lost at' : 'Found at'} ${escapeHTML(i.location)}</span>
              </div>
            </div>
            <span class="search-result-badge">${i.type} →</span>
          </div>
        `;
      });
    }

    if (helpMatches.length > 0) {
      html += `<div class="search-group-header">🆘 Student Help & Notes (${helpMatches.length})</div>`;
      helpMatches.forEach(h => {
        html += `
          <div class="search-result-item" onclick="jumpToSearchResult('help-hub', '${escapeHTML(h.title)}')">
            <div class="search-result-main">
              <div class="search-result-icon">📚</div>
              <div class="search-result-text">
                <span class="search-result-title">${escapeHTML(h.title)}</span>
                <span class="search-result-sub">${escapeHTML(h.courseTag || '')} • ${escapeHTML(h.author)}</span>
              </div>
            </div>
            <span class="search-result-badge">Help Hub →</span>
          </div>
        `;
      });
    }

    dropdown.innerHTML = html;
    dropdown.classList.add('active');
  }

  searchInput.addEventListener('input', (e) => {
    runUnifiedSearch(e.target.value);
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (dropdown && !dropdown.contains(e.target) && e.target !== searchInput) {
      dropdown.classList.remove('active');
    }
  });

  const performSubmitSearch = () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      showToast('Please type a search query (e.g. Lab 304, Hackathon, Bonafide)', 'info');
      return;
    }

    if (dropdown) dropdown.classList.remove('active');

    if (query.includes('senior') || query.includes('mentor') || query.includes('connect') || query.includes('admission') || query.includes('hostel') || query.includes('placement') || query.includes('advice') || query.includes('experience')) {
      jumpToSearchResult('campus-connect', query);
    } else if (query.includes('room') || query.includes('lab') || query.includes('class') || query.includes('hall') || query.includes('block') || query.includes('audi') || query.includes('canteen')) {
      jumpToSearchResult('navigator', query);
    } else if (query.includes('lost') || query.includes('found') || query.includes('calculator') || query.includes('wallet') || query.includes('keys')) {
      jumpToSearchResult('lost-found', query);
    } else if (query.includes('form') || query.includes('bonafide') || query.includes('concession') || query.includes('timing') || query.includes('portal') || query.includes('hod')) {
      jumpToSearchResult('campus-help', query);
    } else if (query.includes('hackathon') || query.includes('workshop') || query.includes('competition') || query.includes('event')) {
      jumpToSearchResult('events', query);
    } else if (query.includes('team') || query.includes('partner') || query.includes('developer') || query.includes('designer')) {
      jumpToSearchResult('teammates', query);
    } else {
      jumpToSearchResult('help-hub', query);
    }
  };

  if (searchBtn) searchBtn.addEventListener('click', performSubmitSearch);
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') performSubmitSearch();
  });
}

window.jumpToSearchResult = function(tabName, query) {
  const dropdown = document.getElementById('unified-search-dropdown');
  if (dropdown) dropdown.classList.remove('active');

  switchTab(tabName);

  if (tabName === 'campus-connect') {
    const input = document.getElementById('connect-search-input');
    if (input) {
      input.value = query;
      CollabUState.connectFilters.search = query.toLowerCase();
      renderMentorsList();
    }
  } else if (tabName === 'navigator') {
    const input = document.getElementById('navigator-search-input');
    if (input) {
      input.value = query;
      CollabUState.navigatorFilters.search = query.toLowerCase();
      renderNavigator();
    }
  } else if (tabName === 'events') {
    const input = document.getElementById('events-search-input');
    if (input) {
      input.value = query;
      CollabUState.eventsFilters.search = query.toLowerCase();
      renderEvents();
    }
  } else if (tabName === 'teammates') {
    const input = document.getElementById('teammates-search-input');
    if (input) {
      input.value = query;
      CollabUState.teammatesFilters.search = query.toLowerCase();
      renderTeammates();
    }
  } else if (tabName === 'lost-found') {
    const input = document.getElementById('lost-search-input');
    if (input) {
      input.value = query;
      CollabUState.lostFilters.search = query.toLowerCase();
      renderLostAndFound();
    }
  } else if (tabName === 'help-hub') {
    const input = document.getElementById('help-search-input');
    if (input) {
      input.value = query;
      CollabUState.helpFilters.search = query.toLowerCase();
      renderHelpHub();
    }
  }

  showToast(`Navigated to ${tabName.toUpperCase()} for "${query}"`, 'info');
  window.scrollTo({ top: 400, behavior: 'smooth' });
};

// -------------------------------------------------------------
// 13. EVENT DETAILS & REGISTRATION MODAL
// -------------------------------------------------------------
function initEventDetailsModal() {
  const modal = document.getElementById('modal-event-details-dialog');
  const btnClose = document.getElementById('btn-close-event-details');

  const closeModal = () => { if (modal) modal.classList.remove('active'); };

  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
}

window.openEventDetailsModal = function(evtId) {
  const event = CollabUState.events.find(e => e.id === evtId);
  if (!event) return;

  const modal = document.getElementById('modal-event-details-dialog');
  const modalBody = document.getElementById('event-modal-body');
  const modalTitle = document.getElementById('event-modal-title');
  const modalSubtitle = document.getElementById('event-modal-subtitle');
  if (!modal || !modalBody) return;

  if (modalTitle) modalTitle.textContent = event.title;
  if (modalSubtitle) modalSubtitle.textContent = `${event.category} • Hosted by ${event.host || 'Campus Committee'}`;

  const capacityPercent = Math.min(100, Math.round(((event.registeredCount || 0) / (event.capacity || 100)) * 100));

  modalBody.innerHTML = `
    <div class="event-details-layout">
      
      <div class="event-details-header-banner">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
          <span class="reg-status-badge ${event.isRegistered ? 'badge-is-reg' : 'badge-open-reg'}">
            ${event.isRegistered ? '✓ Spot Confirmed' : 'Registration Open'}
          </span>
          <span style="font-size:0.85rem; font-weight:700; background:rgba(255,255,255,0.2); padding:0.25rem 0.65rem; border-radius:var(--radius-full);">
            📅 ${event.month} ${event.day}, 2026
          </span>
        </div>
        <h3 style="font-size:1.4rem; font-weight:800; line-height:1.25; margin-bottom:0.5rem;">${escapeHTML(event.title)}</h3>
        <p style="font-size:0.9rem; color:#e0e7ff; line-height:1.5;">${escapeHTML(event.description)}</p>
      </div>

      <div class="event-details-grid">
        
        <div>
          <h4 style="font-size:1rem; font-weight:700; margin-bottom:0.6rem; color:var(--text-main);">Event Schedule & Highlights</h4>
          <ul style="margin-left:1.25rem; font-size:0.85rem; color:var(--text-muted); line-height:1.6; margin-bottom:1.25rem;">
            <li><strong>Official Venue:</strong> ${escapeHTML(event.location)} (Format: ${event.venueType})</li>
            <li><strong>Session Timings:</strong> ${escapeHTML(event.time)}</li>
            <li><strong>Organizer:</strong> ${escapeHTML(event.host || 'Student Academic Council')}</li>
            <li><strong>Certification:</strong> Official Participation E-Certificate provided to all attendees.</li>
          </ul>

          <div class="capacity-box" style="margin-bottom:1.25rem;">
            <div class="capacity-labels">
              <span>Current Seat Reservations</span>
              <strong>${event.registeredCount} / ${event.capacity || 100} (${capacityPercent}%)</strong>
            </div>
            <div class="capacity-track">
              <div class="capacity-fill" style="width: ${capacityPercent}%;"></div>
            </div>
          </div>
        </div>

        <div class="event-info-box">
          <h4 style="font-size:0.95rem; font-weight:700; color:var(--text-main);">Quick Registration</h4>
          <p style="font-size:0.78rem; color:var(--text-muted);">Confirm your seat. Institutional ID verified.</p>
          
          <form id="form-event-rsvp" onsubmit="handleEventRsvpSubmit(event, '${event.id}')">
            <div style="margin-bottom:0.65rem;">
              <label style="display:block; font-size:0.75rem; font-weight:700; margin-bottom:0.25rem;">Student Name</label>
              <input type="text" id="rsvp-student-name" class="form-input" value="Alex Chen" required>
            </div>
            <div style="margin-bottom:0.65rem;">
              <label style="display:block; font-size:0.75rem; font-weight:700; margin-bottom:0.25rem;">Campus Email / Roll</label>
              <input type="email" id="rsvp-student-email" class="form-input" value="alex.chen@campus.edu" required>
            </div>
            <div style="margin-bottom:1rem;">
              <label style="display:block; font-size:0.75rem; font-weight:700; margin-bottom:0.25rem;">Year & Branch</label>
              <input type="text" id="rsvp-student-branch" class="form-input" value="TE Computer Engineering" required>
            </div>

            <button type="submit" class="btn ${event.isRegistered ? 'btn-outline' : 'btn-primary'} btn-sm" style="width:100%;">
              ${event.isRegistered ? 'Cancel Registration' : 'Confirm Registration →'}
            </button>
          </form>
        </div>

      </div>

    </div>
  `;

  modal.classList.add('active');
};

window.handleEventRsvpSubmit = async function(e, evtId) {
  e.preventDefault();
  const name = document.getElementById('rsvp-student-name')?.value.trim() || 'Alex Chen';
  const email = document.getElementById('rsvp-student-email')?.value.trim() || 'alex.chen@campus.edu';
  const branch = document.getElementById('rsvp-student-branch')?.value.trim() || 'TE Computer Engineering';

  const submitBtn = e.target.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = 'Registering...';
  }

  await handleEventRegistration(evtId, { name, email, branch });

  const modal = document.getElementById('modal-event-details-dialog');
  if (modal) modal.classList.remove('active');
};

// -------------------------------------------------------------
// 14. DATABASE ARCHITECTURE & SUPABASE STATUS CONTROLLER
// -------------------------------------------------------------
function initDatabaseStatusModal() {
  const btnNavStatus = document.getElementById('btn-db-status');
  const btnFooterStatus = document.getElementById('footer-db-status');
  const modal = document.getElementById('modal-database-status');
  const btnClose = document.getElementById('btn-close-db-status');
  const btnDismiss = document.getElementById('btn-dismiss-db-modal');

  const openModal = () => { 
    if (modal) {
      modal.classList.add('active');
      updateDatabaseStatusUI();
    }
  };
  const closeModal = () => { if (modal) modal.classList.remove('active'); };

  if (btnNavStatus) btnNavStatus.addEventListener('click', openModal);
  if (btnFooterStatus) btnFooterStatus.addEventListener('click', openModal);
  if (btnClose) btnClose.addEventListener('click', closeModal);
  if (btnDismiss) btnDismiss.addEventListener('click', closeModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  updateDatabaseStatusUI();
}

function updateDatabaseStatusUI() {
  if (!window.CampusSupabase) return;
  const status = window.CampusSupabase.getStatus();

  const navLabel = document.getElementById('nav-db-label');
  const footerText = document.getElementById('footer-db-text');
  const modalLabel = document.getElementById('modal-db-pill-label');
  const descEl = document.getElementById('supabase-status-desc');

  if (navLabel) {
    navLabel.textContent = status.mode === 'cloud' ? 'Supabase' : 'Local DB';
  }
  if (footerText) {
    footerText.textContent = `Database: ${status.mode === 'cloud' ? 'Supabase Connected' : 'Local Mode (Supabase Ready)'}`;
  }
  if (modalLabel) {
    modalLabel.textContent = status.badge;
  }
  if (descEl) {
    descEl.textContent = status.description;
  }

  // Populate config input fields if modal is open
  const urlInput = document.getElementById('cfg-supabase-url');
  const keyInput = document.getElementById('cfg-supabase-key');
  const creds = window.CampusSupabase.getCredentials();
  if (urlInput && !urlInput.value && creds.url && !creds.url.includes('your-project.supabase.co')) {
    urlInput.value = creds.url;
  }
  if (keyInput && !keyInput.value && creds.anonKey && !creds.anonKey.includes('your-anon-publishable-key')) {
    keyInput.value = creds.anonKey;
  }
}

window.handleSaveSupabaseConfig = async function(e) {
  e.preventDefault();
  const url = document.getElementById('cfg-supabase-url').value.trim();
  const key = document.getElementById('cfg-supabase-key').value.trim();
  const feedback = document.getElementById('supabase-test-feedback');
  const btn = document.getElementById('btn-save-supabase-cfg');

  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Testing connection...';
  }
  if (feedback) {
    feedback.style.display = 'block';
    feedback.style.color = 'var(--text-muted)';
    feedback.textContent = 'Saving credentials and testing connection with Supabase...';
  }

  window.CampusSupabase.saveCredentials(url, key);
  const result = await window.CampusSupabase.testConnection();

  if (btn) {
    btn.disabled = false;
    btn.textContent = '⚡ Save & Test Connection';
  }

  if (result.success) {
    if (feedback) {
      feedback.style.color = '#059669';
      feedback.textContent = '✓ ' + result.message;
    }
    showToast('Successfully connected to Supabase Cloud Database!', 'success');
    await initSupabaseDataSync();
  } else {
    if (feedback) {
      feedback.style.color = '#e11d48';
      feedback.textContent = '⚠ ' + result.message;
    }
    showToast('Supabase connection warning: ' + result.message, 'info');
  }

  updateDatabaseStatusUI();
};

window.handleClearSupabaseConfig = function() {
  window.CampusSupabase.clearCredentials();
  const urlInput = document.getElementById('cfg-supabase-url');
  const keyInput = document.getElementById('cfg-supabase-key');
  const feedback = document.getElementById('supabase-test-feedback');
  if (urlInput) urlInput.value = '';
  if (keyInput) keyInput.value = '';
  if (feedback) {
    feedback.style.display = 'block';
    feedback.style.color = '#0284c7';
    feedback.textContent = 'Credentials cleared. Switched to high-performance Local Storage mode.';
  }
  showToast('Switched to Local Storage mode', 'info');
  updateDatabaseStatusUI();
};

async function initSupabaseDataSync() {
  if (!window.CampusSupabase || !window.CampusSupabase.isConfigured()) {
    updateDatabaseStatusUI();
    return;
  }

  updateDatabaseStatusUI();

  try {
    // 1. Fetch Events from Supabase
    const events = await window.CampusSupabase.fetchEvents();
    if (events && events.length > 0) {
      CollabUState.events = events;
      saveEvents(events);
      renderEvents();
      renderDashboardEventsList();
      renderKPIs();
    }

    // 2. Fetch Questions & Answers from Supabase
    const questions = await window.CampusSupabase.fetchQuestions();
    if (questions && questions.length > 0) {
      CollabUState.campusQA = questions;
      saveQA(questions);
      renderQAQuestions();
      renderCampusConnectHighlight();
    }

    // 3. Fetch Help Requests from Supabase
    const helpRequests = await window.CampusSupabase.fetchHelpRequests();
    if (helpRequests && helpRequests.length > 0) {
      CollabUState.helpRequests = helpRequests;
      saveRequests(helpRequests);
      renderHelpHub();
      renderDashboardHelpList();
      renderKPIs();
    }

    updateDatabaseStatusUI();
  } catch (err) {
    console.warn('[Campus 360] Supabase data sync fallback to local storage:', err);
  }
}

// -------------------------------------------------------------
// 15. Trending Quick Action Filter Pills
// -------------------------------------------------------------
function initPills() {
  const pills = document.querySelectorAll('.quick-pill');
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const query = pill.getAttribute('data-query');
      if (query === 'FindClass') {
        switchTab('navigator');
        const runBtn = document.getElementById('btn-run-find-class');
        if (runBtn) runBtn.click();
        window.scrollTo({ top: 380, behavior: 'smooth' });
      } else if (query === 'Lost & Found') {
        switchTab('lost-found');
        window.scrollTo({ top: 380, behavior: 'smooth' });
      } else if (query === 'Bonafide') {
        switchTab('campus-help');
        window.scrollTo({ top: 380, behavior: 'smooth' });
      } else {
        const searchInput = document.getElementById('global-search-input');
        if (searchInput) {
          searchInput.value = query;
          const searchBtn = document.getElementById('btn-global-search');
          if (searchBtn) searchBtn.click();
        }
      }
    });
  });
}

// -------------------------------------------------------------
// 16. Quick Action Modal & Shortcuts
// -------------------------------------------------------------
function initQuickActionModal() {
  const quickPostBtn = document.getElementById('btn-quick-post');
  const modalOverlay = document.getElementById('quick-modal-overlay');
  const modalClose = document.getElementById('modal-close-btn');

  if (quickPostBtn && modalOverlay) {
    quickPostBtn.addEventListener('click', () => {
      modalOverlay.classList.add('active');
    });
  }

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }

  const choices = document.querySelectorAll('.choice-card');
  choices.forEach(card => {
    card.addEventListener('click', () => {
      const action = card.getAttribute('data-action');
      if (modalOverlay) modalOverlay.classList.remove('active');

      if (action === 'new-help') {
        switchTab('help-hub');
        const postModal = document.getElementById('modal-post-help');
        if (postModal) postModal.classList.add('active');
      } else if (action === 'new-teammate') {
        switchTab('teammates');
        const profileModal = document.getElementById('modal-create-profile-dialog');
        if (profileModal) profileModal.classList.add('active');
      } else if (action === 'new-event') {
        switchTab('events');
        const eventModal = document.getElementById('modal-create-event-dialog');
        if (eventModal) eventModal.classList.add('active');
      } else if (action === 'new-lost-found') {
        switchTab('lost-found');
        const lostModal = document.getElementById('modal-report-lost-found');
        if (lostModal) lostModal.classList.add('active');
      }
    });
  });
}

// -------------------------------------------------------------
// 17. Utility Functions
// -------------------------------------------------------------
function getCategoryClass(category) {
  switch (category) {
    case 'academic': return 'tag-academic';
    case 'coding': return 'tag-coding';
    case 'hackathon': return 'tag-hackathon';
    case 'notes': return 'tag-notes';
    default: return 'tag-general';
  }
}

function getCategoryLabel(category) {
  switch (category) {
    case 'academic': return 'Academics';
    case 'coding': return 'Coding Help';
    case 'hackathon': return 'Hackathon Partner';
    case 'notes': return 'Study Notes';
    default: return 'General Help';
  }
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : 'ℹ'}</span>
    <span>${escapeHTML(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// -------------------------------------------------------------
// 18. Campus360 Student Session Integration
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  try {
    const activeUser = JSON.parse(localStorage.getItem('smartCampusCurrentUser') || 'null');
    const profileChip = document.getElementById('user-profile-chip');

    if (profileChip) {
      if (activeUser && activeUser.fullName) {
        const nameEl = profileChip.querySelector('.user-name');
        const roleEl = profileChip.querySelector('.user-role');
        const avatarEl = profileChip.querySelector('.user-avatar span');

        if (nameEl) nameEl.textContent = activeUser.fullName;
        if (roleEl) {
          const yearShort = activeUser.year ? activeUser.year.replace(' Year', '') : 'CS';
          roleEl.textContent = `${activeUser.branch || 'Campus'} (${yearShort})`;
        }
        if (avatarEl) {
          const initials = activeUser.fullName
            .split(' ')
            .map(n => n[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
          avatarEl.textContent = initials;
        }
        profileChip.title = `Logged in as ${activeUser.fullName} (${activeUser.email}). Click to switch account or log out.`;
      }

      profileChip.style.cursor = 'pointer';
      profileChip.addEventListener('click', (e) => {
        const confirmLogout = confirm(
          activeUser 
            ? `Logged in as ${activeUser.fullName} (${activeUser.email}).\n\nWould you like to switch account or go to the Campus360 Login & Registration portal?`
            : "Go to Campus360 Login & Registration Portal?"
        );
        if (confirmLogout) {
          window.location.href = 'login.html';
        }
      });
    }
  } catch (err) {
    console.error("Campus360 auth integration error:", err);
  }
});

// =============================================================
// 19. Theme Controller (Light / Dark Mode Support)
// =============================================================
function initTheme() {
  const toggleBtn = document.getElementById('btn-theme-toggle');
  const savedTheme = localStorage.getItem('dyp_theme') || 'light';

  const applyTheme = (theme) => {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (toggleBtn) toggleBtn.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (toggleBtn) toggleBtn.textContent = '🌙';
    }
  };

  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const nextTheme = isDark ? 'light' : 'dark';
      applyTheme(nextTheme);
      localStorage.setItem('dyp_theme', nextTheme);
      showToast(`Switched to ${nextTheme.toUpperCase()} theme`, 'info');
    });
  }
}

// =============================================================
// 20. Campus Connect — Aspirant & Senior Community Controller
// =============================================================
function initCampusConnect() {
  // Sub-tabs navigation
  const tabBtns = document.querySelectorAll('.connect-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-connect-tab');
      CollabUState.connectFilters.activeConnectTab = tab;

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const panels = {
        'mentors': document.getElementById('panel-connect-mentors'),
        'qa': document.getElementById('panel-connect-qa'),
        'stories': document.getElementById('panel-connect-stories'),
        'requests': document.getElementById('panel-connect-requests')
      };

      Object.keys(panels).forEach(k => {
        const p = panels[k];
        if (p) {
          if (k === tab) p.classList.remove('hidden');
          else p.classList.add('hidden');
        }
      });

      if (tab === 'mentors') renderMentorsList();
      else if (tab === 'qa') renderQAQuestions();
      else if (tab === 'stories') renderStudentStories();
      else if (tab === 'requests') renderConversationRequests();
    });
  });

  // Mentors filters
  const branchFilter = document.getElementById('mentor-filter-branch');
  const yearFilter = document.getElementById('mentor-filter-year');
  const langFilter = document.getElementById('mentor-filter-language');
  const topicFilter = document.getElementById('mentor-filter-topic');
  const searchInput = document.getElementById('mentor-search-input');

  if (branchFilter) {
    branchFilter.addEventListener('change', (e) => {
      CollabUState.connectFilters.branch = e.target.value;
      renderMentorsList();
    });
  }
  if (yearFilter) {
    yearFilter.addEventListener('change', (e) => {
      CollabUState.connectFilters.year = e.target.value;
      renderMentorsList();
    });
  }
  if (langFilter) {
    langFilter.addEventListener('change', (e) => {
      CollabUState.connectFilters.language = e.target.value;
      renderMentorsList();
    });
  }
  if (topicFilter) {
    topicFilter.addEventListener('change', (e) => {
      CollabUState.connectFilters.topic = e.target.value;
      renderMentorsList();
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      CollabUState.connectFilters.search = e.target.value.toLowerCase().trim();
      renderMentorsList();
    });
  }

  // Q&A Category Pills
  const qaPills = document.querySelectorAll('.qa-pill-btn');
  qaPills.forEach(pill => {
    pill.addEventListener('click', () => {
      qaPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      CollabUState.connectFilters.qaCategory = pill.getAttribute('data-qa-cat');
      renderQAQuestions();
    });
  });

  // Modal Triggers: Ask a Senior
  const btnOpenAsk = document.getElementById('btn-open-ask-senior');
  const btnOpenAskTab = document.getElementById('btn-ask-senior-inside-tab');
  const btnBannerQA = document.getElementById('btn-banner-browse-qa');

  const openAskModal = () => {
    const modal = document.getElementById('modal-ask-senior');
    if (modal) modal.classList.add('active');
  };
  if (btnOpenAsk) btnOpenAsk.addEventListener('click', openAskModal);
  if (btnOpenAskTab) btnOpenAskTab.addEventListener('click', openAskModal);
  if (btnBannerQA) {
    btnBannerQA.addEventListener('click', () => {
      const qaTabBtn = document.getElementById('connect-tab-btn-qa');
      if (qaTabBtn) qaTabBtn.click();
      window.scrollTo({ top: 780, behavior: 'smooth' });
    });
  }

  // Modal Triggers: Request Conversation
  const btnOpenConvo = document.getElementById('btn-open-request-convo');
  const btnOpenConvoTab = document.getElementById('btn-request-convo-inside-tab');
  const openConvoModal = () => {
    populateMentorOptions();
    const modal = document.getElementById('modal-request-convo');
    if (modal) modal.classList.add('active');
  };
  if (btnOpenConvo) btnOpenConvo.addEventListener('click', openConvoModal);
  if (btnOpenConvoTab) btnOpenConvoTab.addEventListener('click', openConvoModal);

  // Modal Triggers: Become a Mentor
  const btnBecomeMentor = document.getElementById('btn-open-become-mentor');
  const btnBannerBecome = document.getElementById('btn-banner-become-mentor');
  const btnCalloutBecome = document.getElementById('btn-callout-become-mentor');
  const openBecomeModal = () => {
    const modal = document.getElementById('modal-become-mentor');
    if (modal) modal.classList.add('active');
  };
  if (btnBecomeMentor) btnBecomeMentor.addEventListener('click', openBecomeModal);
  if (btnBannerBecome) btnBannerBecome.addEventListener('click', openBecomeModal);
  if (btnCalloutBecome) btnCalloutBecome.addEventListener('click', openBecomeModal);

  // Modal Triggers: Submit Story
  const btnOpenStory = document.getElementById('btn-open-submit-story');
  if (btnOpenStory) {
    btnOpenStory.addEventListener('click', () => {
      const modal = document.getElementById('modal-submit-story');
      if (modal) modal.classList.add('active');
    });
  }

  // Modal Trigger: Report from Guidelines
  const btnReportGuidelines = document.getElementById('btn-trigger-report-guidelines');
  if (btnReportGuidelines) {
    btnReportGuidelines.addEventListener('click', () => {
      openReportModal('community', 'general', 'Community Guidelines Concern');
    });
  }

  // Banner: Browse Mentors Button
  const btnBannerBrowseMentors = document.getElementById('btn-banner-browse-mentors');
  if (btnBannerBrowseMentors) {
    btnBannerBrowseMentors.addEventListener('click', () => {
      const mentorsTabBtn = document.getElementById('connect-tab-btn-mentors');
      if (mentorsTabBtn) mentorsTabBtn.click();
      window.scrollTo({ top: 780, behavior: 'smooth' });
    });
  }

  // Modal Close Buttons
  setupModalClose('modal-ask-senior', 'btn-close-ask-senior', 'btn-cancel-ask-senior');
  setupModalClose('modal-submit-answer', 'btn-close-submit-answer', 'btn-cancel-submit-answer');
  setupModalClose('modal-request-convo', 'btn-close-request-convo', 'btn-cancel-request-convo');
  setupModalClose('modal-become-mentor', 'btn-close-become-mentor', 'btn-cancel-become-mentor');
  setupModalClose('modal-read-story', 'btn-close-read-story', 'btn-dismiss-read-story');
  setupModalClose('modal-submit-story', 'btn-close-submit-story', 'btn-cancel-submit-story');
  setupModalClose('modal-report-content', 'btn-close-report-content', 'btn-cancel-report-content');
  setupModalClose('modal-mentor-profile', 'btn-close-mentor-profile', null);

  // Form Handlers
  initCampusConnectForms();

  // Initial renders
  renderCampusConnect();
}

function setupModalClose(modalId, closeBtnId, cancelBtnId) {
  const modal = document.getElementById(modalId);
  const closeBtn = document.getElementById(closeBtnId);
  const cancelBtn = cancelBtnId ? document.getElementById(cancelBtnId) : null;

  const hide = () => { if (modal) modal.classList.remove('active'); };
  if (closeBtn) closeBtn.addEventListener('click', hide);
  if (cancelBtn) cancelBtn.addEventListener('click', hide);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) hide();
    });
  }
}

function populateMentorOptions() {
  const select = document.getElementById('convo-preferred-mentor');
  if (!select) return;
  const mentors = CollabUState.campusMentors;
  let html = '<option value="Any Available Senior">Any Available Senior Volunteer</option>';
  mentors.forEach(m => {
    html += `<option value="${escapeHTML(m.name)}">${escapeHTML(m.name)} (${m.branch} • ${m.year})</option>`;
  });
  select.innerHTML = html;
}

function initCampusConnectForms() {
  // 1. Submit Question Form
  const formAsk = document.getElementById('form-ask-senior');
  if (formAsk) {
    formAsk.addEventListener('submit', (e) => {
      e.preventDefault();
      const askerName = (document.getElementById('ask-student-name') || document.getElementById('ask-senior-name'))?.value.trim() || 'College Aspirant';
      const targetBranch = (document.getElementById('ask-target-branch') || document.getElementById('ask-senior-target-branch'))?.value || 'General DYP Campus';
      const category = (document.getElementById('ask-category') || document.getElementById('ask-senior-category'))?.value || 'Admission Guidance';
      const title = (document.getElementById('ask-title') || document.getElementById('ask-senior-question'))?.value.trim() || '';
      const details = (document.getElementById('ask-details') || document.getElementById('ask-senior-question'))?.value.trim() || title;

      if (!title) {
        showToast('Please enter your question.', 'info');
        return;
      }

      const submitBtn = formAsk.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Posting to Supabase...';
      }

      const newQ = {
        id: 'qa-' + Date.now(),
        category,
        targetBranch,
        title,
        details,
        asker: askerName,
        timestamp: 'Just now',
        answers: []
      };

      const postQuestionAsync = async () => {
        let savedToCloud = false;
        if (window.CampusSupabase && window.CampusSupabase.isConfigured()) {
          try {
            const dbQ = await window.CampusSupabase.askQuestion(newQ);
            if (dbQ && dbQ.id) newQ.id = dbQ.id;
            savedToCloud = true;
          } catch (err) {
            console.warn('[Campus 360] Supabase askQuestion failed, saving locally:', err);
          }
        }

        CollabUState.campusQA.unshift(newQ);
        saveQA(CollabUState.campusQA);

        renderQAQuestions();
        renderCampusConnectHighlight();

        const modal = document.getElementById('modal-ask-senior');
        if (modal) modal.classList.remove('active');
        formAsk.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Question';
        }

        if (savedToCloud) {
          showToast('Question published to Supabase Cloud! Mentors will answer shortly.', 'success');
        } else {
          showToast('Your question has been posted! (Saved locally)', 'success');
        }

        const qaTab = document.getElementById('connect-tab-btn-qa');
        if (qaTab) qaTab.click();
      };

      postQuestionAsync();
    });
  }

  // 2. Submit Answer Form
  const formAnswer = document.getElementById('form-submit-answer');
  if (formAnswer) {
    formAnswer.addEventListener('submit', (e) => {
      e.preventDefault();
      const qId = (document.getElementById('answer-question-id') || document.getElementById('answer-target-qid'))?.value;
      const seniorName = document.getElementById('answer-senior-name').value.trim();
      const seniorRole = (document.getElementById('answer-senior-role') || document.getElementById('answer-senior-branch'))?.value.trim() || 'Senior Student';
      const classification = formAnswer.querySelector('input[name="answerClassification"]:checked')?.value || document.getElementById('answer-category-type')?.value || 'Personal Student Experience';
      const answerText = (document.getElementById('answer-text') || document.getElementById('answer-body-input'))?.value.trim();

      if (!answerText) {
        showToast('Please provide your answer and advice.', 'info');
        return;
      }

      const question = CollabUState.campusQA.find(q => q.id === qId);
      if (!question) return;

      const submitBtn = formAnswer.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Publishing to Supabase...';
      }

      const newAns = {
        id: 'ans-' + Date.now(),
        author: seniorName,
        role: seniorRole,
        type: classification,
        text: answerText,
        helpfulCount: 1
      };

      const submitAnswerAsync = async () => {
        let savedToCloud = false;
        if (window.CampusSupabase && window.CampusSupabase.isConfigured()) {
          try {
            await window.CampusSupabase.submitAnswer({
              questionId: qId,
              author: seniorName,
              role: seniorRole,
              type: classification,
              text: answerText
            });
            savedToCloud = true;
          } catch (err) {
            console.warn('[Campus 360] Supabase submitAnswer failed, saving locally:', err);
          }
        }

        if (!question.answers) question.answers = [];
        question.answers.push(newAns);

        saveQA(CollabUState.campusQA);
        renderQAQuestions();
        renderCampusConnectHighlight();

        const modal = document.getElementById('modal-submit-answer');
        if (modal) modal.classList.remove('active');
        formAnswer.reset();

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Publish Answer';
        }

        if (savedToCloud) {
          showToast('Answer published to Supabase Cloud! Thank you for mentoring.', 'success');
        } else {
          showToast('Your answer has been published. (Saved locally)', 'success');
        }
      };

      submitAnswerAsync();
    });
  }

  // 3. Request Conversation Form
  const formConvo = document.getElementById('form-request-convo');
  if (formConvo) {
    formConvo.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('convo-aspirant-name-input').value.trim();
      const branch = document.getElementById('convo-preferred-branch').value;
      const mentor = document.getElementById('convo-preferred-mentor').value;
      const lang = document.getElementById('convo-preferred-lang').value;
      const time = document.getElementById('convo-preferred-time').value;
      const reason = document.getElementById('convo-reason-input').value.trim();
      const msg = document.getElementById('convo-optional-msg').value.trim();

      const newReq = {
        id: 'req-c-' + Date.now(),
        aspirantName: name,
        preferredBranch: branch,
        mentorName: mentor,
        preferredLang: lang,
        preferredTime: time,
        question: reason,
        optionalMsg: msg,
        status: 'Pending',
        createdAt: 'Just now'
      };

      CollabUState.convoRequests.unshift(newReq);
      saveConvoRequests(CollabUState.convoRequests);

      renderConversationRequests();

      document.getElementById('modal-request-convo').classList.remove('active');
      formConvo.reset();
      showToast('Conversation request submitted! Track your status in the Requests tab.', 'success');

      const reqTab = document.getElementById('connect-tab-btn-requests');
      if (reqTab) reqTab.click();
    });
  }

  // 4. Become Mentor Form
  const formMentor = document.getElementById('form-become-mentor');
  if (formMentor) {
    formMentor.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('mentor-fullname').value.trim();
      const branch = document.getElementById('mentor-branch').value;
      const year = document.getElementById('mentor-year').value;
      const languages = document.getElementById('mentor-languages').value.split(',').map(s => s.trim()).filter(Boolean);
      const topics = document.getElementById('mentor-topics').value.split(',').map(s => s.trim()).filter(Boolean);
      const experience = document.getElementById('mentor-experience-areas').value.trim();
      const bio = document.getElementById('mentor-intro-bio').value.trim();

      const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'ST';

      const newMentor = {
        id: 'mentor-' + Date.now(),
        name,
        initials,
        branch,
        year,
        languages: languages.length ? languages : ['English', 'Hindi'],
        topics: topics.length ? topics : ['Academics', 'Branch Selection'],
        helpAreas: experience,
        bio,
        isVerifiedVolunteer: true,
        isDemo: false,
        rating: '5.0 ★',
        sessionsCount: 0
      };

      CollabUState.campusMentors.unshift(newMentor);
      saveMentors(CollabUState.campusMentors);

      renderMentorsList();
      renderCampusConnectHighlight();

      document.getElementById('modal-become-mentor').classList.remove('active');
      formMentor.reset();
      showToast(`Welcome ${name}! Your mentor application has been registered & verified.`, 'success');

      const mentorsTab = document.getElementById('connect-tab-btn-mentors');
      if (mentorsTab) mentorsTab.click();
    });
  }

  // 5. Submit Story Form
  const formStory = document.getElementById('form-submit-story');
  if (formStory) {
    formStory.addEventListener('submit', (e) => {
      e.preventDefault();
      const author = document.getElementById('story-author-input').value.trim();
      const role = document.getElementById('story-branch-input').value.trim();
      const title = document.getElementById('story-title-input').value.trim();
      const readTime = document.getElementById('story-readtime-input').value.trim();
      const preview = document.getElementById('story-preview-input').value.trim();
      const content = document.getElementById('story-full-text').value.trim();
      const takeaway = document.getElementById('story-takeaway-input').value.trim();

      const newStory = {
        id: 'story-' + Date.now(),
        category: 'Student Advice',
        readTime: readTime || '4 min read',
        title,
        author,
        authorRole: role,
        date: 'Just now',
        preview,
        content,
        takeaway
      };

      CollabUState.studentStories.unshift(newStory);
      saveStories(CollabUState.studentStories);

      renderStudentStories();
      renderDashboardStories();

      document.getElementById('modal-submit-story').classList.remove('active');
      formStory.reset();
      showToast('Your story has been published! Thank you for sharing your experience.', 'success');
    });
  }

  // 6. Report Content Form
  const formReport = document.getElementById('form-report-content');
  if (formReport) {
    formReport.addEventListener('submit', (e) => {
      e.preventDefault();
      const targetId = document.getElementById('report-target-id').value;
      const targetType = document.getElementById('report-target-type').value;
      const reason = document.getElementById('report-reason').value;
      const details = document.getElementById('report-details').value.trim();

      const newReport = {
        id: 'rep-' + Date.now(),
        targetId,
        targetType,
        reason,
        details,
        timestamp: new Date().toISOString()
      };

      CollabUState.campusReports.push(newReport);
      saveReports(CollabUState.campusReports);

      document.getElementById('modal-report-content').classList.remove('active');
      formReport.reset();
      showToast('Report received. Our student moderation team will inspect this item within 24 hours.', 'success');
    });
  }
}

function renderCampusConnect() {
  renderMentorsList();
  renderQAQuestions();
  renderStudentStories();
  renderConversationRequests();
}

function renderMentorsList() {
  const container = document.getElementById('mentors-directory-grid');
  const countBadge = document.getElementById('mentors-badge-count');
  if (!container) return;

  const filters = CollabUState.connectFilters;
  let list = CollabUState.campusMentors;

  if (filters.branch !== 'all') {
    list = list.filter(m => m.branch.toLowerCase().includes(filters.branch.toLowerCase()) || filters.branch.toLowerCase().includes(m.branch.toLowerCase()));
  }
  if (filters.year !== 'all') {
    list = list.filter(m => m.year.toLowerCase().includes(filters.year.toLowerCase()));
  }
  if (filters.language !== 'all') {
    list = list.filter(m => m.languages.some(l => l.toLowerCase() === filters.language.toLowerCase()));
  }
  if (filters.topic !== 'all') {
    list = list.filter(m => m.topics.some(t => t.toLowerCase() === filters.topic.toLowerCase()) || m.helpAreas.toLowerCase().includes(filters.topic.toLowerCase()));
  }
  if (filters.search) {
    list = list.filter(m => 
      m.name.toLowerCase().includes(filters.search) ||
      m.bio.toLowerCase().includes(filters.search) ||
      m.helpAreas.toLowerCase().includes(filters.search) ||
      m.branch.toLowerCase().includes(filters.search)
    );
  }

  if (countBadge) countBadge.textContent = list.length;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-light);">
        <span style="font-size: 2.2rem;">🔍</span>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-top: 0.5rem;">No mentors matching your filters</h3>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.35rem;">Try resetting your branch or language filters to browse all verified volunteers.</p>
        <button class="btn btn-outline btn-sm" onclick="resetMentorFilters()" style="margin-top: 1rem;">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(m => `
    <div class="mentor-card feature-card">
      <div class="mentor-card-top">
        <div class="mentor-avatar">${escapeHTML(m.initials)}</div>
        <div class="mentor-header-info">
          <h4 class="mentor-name">${escapeHTML(m.name)}</h4>
          <span class="mentor-branch-year">${escapeHTML(m.branch)} • ${escapeHTML(m.year)}</span>
          <div>
            <span class="mentor-badge-verified">
              <span>✓</span>
              <span>${m.isDemo ? 'Verified Volunteer • Demo Profile' : 'Verified Student Volunteer'}</span>
            </span>
          </div>
        </div>
      </div>

      <p class="mentor-intro">${escapeHTML(m.bio)}</p>

      <div class="mentor-meta-box">
        <div class="mentor-meta-row">
          <span class="mentor-meta-label">Can Help With:</span>
          <div class="mentor-tag-chips">
            ${m.topics.map(t => `<span class="mentor-chip">✦ ${escapeHTML(t)}</span>`).join('')}
          </div>
        </div>
        <div class="mentor-meta-row">
          <span class="mentor-meta-label">Languages:</span>
          <span style="font-weight: 600; color: var(--text-main); font-size: 0.78rem;">
            ${escapeHTML(m.languages.join(', '))}
          </span>
        </div>
        <div class="mentor-meta-row">
          <span class="mentor-meta-label">Experience:</span>
          <span style="color: var(--text-muted); font-size: 0.78rem;">
            ${escapeHTML(m.helpAreas)}
          </span>
        </div>
      </div>

      <div class="mentor-card-actions">
        <button class="btn btn-outline btn-sm" onclick="openAskSeniorForMentor('${escapeHTML(m.name)}')">
          <span>❓</span>
          <span>Ask Question</span>
        </button>
        <button class="btn btn-primary btn-sm" onclick="openRequestConvoForMentor('${escapeHTML(m.name)}')">
          <span>💬</span>
          <span>Request Chat</span>
        </button>
        <button class="btn btn-ghost btn-sm mentor-profile-view-btn" onclick="openMentorProfile('${m.id}')">
          View Full Profile & Experience →
        </button>
      </div>
    </div>
  `).join('');
}

window.resetMentorFilters = function() {
  CollabUState.connectFilters.branch = 'all';
  CollabUState.connectFilters.year = 'all';
  CollabUState.connectFilters.language = 'all';
  CollabUState.connectFilters.topic = 'all';
  CollabUState.connectFilters.search = '';

  const b = document.getElementById('mentor-filter-branch');
  const y = document.getElementById('mentor-filter-year');
  const l = document.getElementById('mentor-filter-language');
  const t = document.getElementById('mentor-filter-topic');
  const s = document.getElementById('mentor-search-input');
  if (b) b.value = 'all';
  if (y) y.value = 'all';
  if (l) l.value = 'all';
  if (t) t.value = 'all';
  if (s) s.value = '';

  renderMentorsList();
};

function renderQAQuestions() {
  const container = document.getElementById('qa-questions-list');
  const badgeCount = document.getElementById('qa-badge-count');
  if (!container) return;

  const activeCategory = CollabUState.connectFilters.qaCategory || 'all';
  let list = CollabUState.campusQA;

  if (activeCategory !== 'all') {
    list = list.filter(q => q.category.toLowerCase() === activeCategory.toLowerCase());
  }

  if (badgeCount) badgeCount.textContent = list.length;

  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1.5rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-light);">
        <span style="font-size: 2rem;">❓</span>
        <h3 style="font-size: 1.15rem; font-weight: 700; color: var(--text-main); margin-top: 0.5rem;">No questions in this category yet</h3>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-top: 0.35rem;">Be the first college aspirant to ask about ${escapeHTML(activeCategory)}!</p>
        <button class="btn btn-primary btn-sm" onclick="document.getElementById('btn-open-ask-senior').click()" style="margin-top: 1rem;">Ask This Question</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(q => `
    <div class="qa-question-card feature-card">
      <div class="qa-header-row">
        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
          <span class="qa-badge-category">${escapeHTML(q.category)}</span>
          <span class="sparkle-badge sparkle-badge-purple" style="font-size: 0.7rem;">Target: ${escapeHTML(q.targetBranch)}</span>
        </div>
        <button class="btn btn-ghost btn-sm" onclick="reportItem('question', '${q.id}', '${escapeHTML(q.title)}')" style="font-size: 0.75rem; color: var(--text-subtle);">
          🚩 Report
        </button>
      </div>

      <h4 class="qa-question-title">${escapeHTML(q.title)}</h4>
      <p class="qa-question-desc">${escapeHTML(q.details)}</p>

      <div class="qa-author-bar">
        <span>Asked by <strong>${escapeHTML(q.asker)}</strong> • ${escapeHTML(q.timestamp)}</span>
        <button class="btn btn-outline btn-sm" onclick="openAnswerQuestionModal('${q.id}')">
          <span>✍️</span> Answer Question
        </button>
      </div>

      <div class="qa-answers-container">
        ${q.answers && q.answers.length > 0 ? q.answers.map((ans, idx) => `
          <div class="qa-answer-box">
            <div class="qa-answer-header">
              <div class="qa-answer-author">
                <span>🎓 ${escapeHTML(ans.author)}</span>
                <span style="font-size: 0.75rem; font-weight: 500; color: var(--primary);">(${escapeHTML(ans.role)})</span>
              </div>
              <div>
                ${ans.type === 'experience' 
                  ? `<span class="qa-badge-experience">🌟 Personal Student Experience</span>` 
                  : `<span class="qa-badge-official">📋 College General Info</span>`}
              </div>
            </div>
            <p class="qa-answer-text">${escapeHTML(ans.text)}</p>
            <div class="qa-answer-footer">
              <span style="color: var(--text-subtle); font-size: 0.72rem;">Verified Student Contribution</span>
              <button class="btn btn-ghost btn-sm" onclick="toggleHelpfulReaction('${q.id}', ${idx})" style="font-size: 0.75rem;">
                👍 Helpful (${ans.helpfulCount || 1})
              </button>
            </div>
          </div>
        `).join('') : `
          <div style="padding: 0.85rem; background: var(--bg-surface-alt); border-radius: var(--radius-md); font-size: 0.82rem; color: var(--text-muted); display: flex; justify-content: space-between; align-items: center;">
            <span>Awaiting responses from student mentors...</span>
            <button class="btn btn-outline btn-sm" onclick="openAnswerQuestionModal('${q.id}')">Add First Answer</button>
          </div>
        `}
      </div>
    </div>
  `).join('');
}

window.toggleHelpfulReaction = function(qId, ansIdx) {
  const question = CollabUState.campusQA.find(q => q.id === qId);
  if (question && question.answers && question.answers[ansIdx]) {
    question.answers[ansIdx].helpfulCount = (question.answers[ansIdx].helpfulCount || 0) + 1;
    saveQA(CollabUState.campusQA);
    renderQAQuestions();
    showToast('Marked as helpful! Thank you for the feedback.', 'success');
  }
};

function renderStudentStories() {
  const container = document.getElementById('stories-directory-grid');
  const countBadge = document.getElementById('stories-badge-count');
  if (!container) return;

  const stories = CollabUState.studentStories;
  if (countBadge) countBadge.textContent = stories.length;

  container.innerHTML = stories.map(s => `
    <div class="story-card feature-card" onclick="readStudentStory('${s.id}')">
      <div class="story-card-top">
        <span class="sparkle-badge sparkle-badge-purple">${escapeHTML(s.category)}</span>
        <span class="story-read-time">⏱ ${escapeHTML(s.readTime)}</span>
      </div>

      <h4 class="story-title">${escapeHTML(s.title)}</h4>
      <p class="story-preview">${escapeHTML(s.preview)}</p>

      <div class="story-author-row">
        <div class="story-author-avatar">
          ${escapeHTML(s.author.substring(0, 2).toUpperCase())}
        </div>
        <div class="story-author-info">
          <span class="story-author-name">${escapeHTML(s.author)}</span>
          <span class="story-author-meta">${escapeHTML(s.authorRole)} • ${escapeHTML(s.date)}</span>
        </div>
        <span style="margin-left: auto; color: var(--primary); font-weight: 700; font-size: 0.82rem;">Read →</span>
      </div>
    </div>
  `).join('');
}

window.readStudentStory = function(storyId) {
  const story = CollabUState.studentStories.find(s => s.id === storyId);
  if (!story) return;

  const modal = document.getElementById('modal-read-story');
  const title = document.getElementById('story-modal-title');
  const meta = document.getElementById('story-modal-meta');
  const category = document.getElementById('story-modal-category');
  const body = document.getElementById('story-modal-body');
  const takeaway = document.getElementById('story-modal-takeaway');

  if (title) title.textContent = story.title;
  if (meta) meta.textContent = `By ${story.author} (${story.authorRole}) • Published ${story.date} • ${story.readTime}`;
  if (category) category.textContent = story.category;
  if (body) body.textContent = story.content;
  if (takeaway) takeaway.textContent = story.takeaway || 'Have questions for this senior? You can connect with them in the Senior Mentors directory.';

  if (modal) modal.classList.add('active');
};

function renderConversationRequests() {
  const container = document.getElementById('convo-requests-list');
  if (!container) return;

  const requests = CollabUState.convoRequests;

  if (requests.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.5rem; background: var(--bg-surface); border-radius: var(--radius-lg); border: 1px dashed var(--border-light);">
        <span style="font-size: 2rem;">💬</span>
        <h4 style="font-size: 1.05rem; font-weight: 700; color: var(--text-main); margin-top: 0.5rem;">No conversation requests yet</h4>
        <p style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem;">College aspirants can request safe, 1-on-1 guidance chats with DYP student mentors.</p>
        <button class="btn btn-teal btn-sm" onclick="document.getElementById('btn-open-request-convo').click()" style="margin-top: 1rem;">Submit a Request</button>
      </div>
    `;
    return;
  }

  container.innerHTML = requests.map(r => {
    let statusBadge = '';
    if (r.status === 'Accepted') {
      statusBadge = `<span class="status-badge-accepted">✓ Accepted by Senior</span>`;
    } else if (r.status === 'Declined') {
      statusBadge = `<span class="status-badge-declined">✕ Reschedule Requested</span>`;
    } else {
      statusBadge = `<span class="status-badge-pending">⏳ Pending Review</span>`;
    }

    return `
      <div class="convo-card feature-card">
        <div class="convo-details">
          <div class="convo-header-row">
            <span class="convo-aspirant-name">${escapeHTML(r.aspirantName)}</span>
            ${statusBadge}
          </div>
          <p class="convo-reason">${escapeHTML(r.question)}</p>
          <div class="convo-meta-chips">
            <span>🎯 <strong>Branch:</strong> ${escapeHTML(r.preferredBranch)}</span>
            <span>👤 <strong>Assigned Mentor:</strong> ${escapeHTML(r.mentorName || 'General Volunteer')}</span>
            <span>🗣️ <strong>Language:</strong> ${escapeHTML(r.preferredLang)}</span>
            <span>⏱️ <strong>Preferred Time:</strong> ${escapeHTML(r.preferredTime)}</span>
            <span>📅 ${escapeHTML(r.createdAt)}</span>
          </div>
          ${r.optionalMsg ? `<div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.4rem;">Note: <em>${escapeHTML(r.optionalMsg)}</em></div>` : ''}
        </div>

        <div class="convo-actions">
          <button class="btn btn-outline btn-sm" onclick="toggleConversationStatus('${r.id}', 'Accepted')" title="Volunteer simulation: Accept this request">
            Accept
          </button>
          <button class="btn btn-outline btn-sm" onclick="toggleConversationStatus('${r.id}', 'Declined')" title="Volunteer simulation: Decline or suggest alternative time">
            Decline
          </button>
          <button class="btn btn-ghost btn-sm" onclick="toggleConversationStatus('${r.id}', 'Pending')" title="Reset to Pending">
            Reset
          </button>
        </div>
      </div>
    `;
  }).join('');
}

window.toggleConversationStatus = function(reqId, newStatus) {
  const req = CollabUState.convoRequests.find(r => r.id === reqId);
  if (req) {
    req.status = newStatus;
    saveConvoRequests(CollabUState.convoRequests);
    renderConversationRequests();
    showToast(`Request status updated to "${newStatus}"`, 'info');
  }
};

function renderCampusConnectHighlight() {
  const mentorsContainer = document.getElementById('dash-mentors-preview');
  const qaContainer = document.getElementById('dash-questions-preview');
  if (!mentorsContainer) return;

  const topMentors = CollabUState.campusMentors.slice(0, 3);
  mentorsContainer.innerHTML = topMentors.map(m => `
    <div style="background: var(--bg-surface); border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 1rem; display: flex; align-items: center; gap: 0.85rem; box-shadow: var(--shadow-xs);">
      <div class="mentor-avatar" style="width: 44px; height: 44px; font-size: 1rem;">${escapeHTML(m.initials)}</div>
      <div style="flex: 1; overflow: hidden;">
        <h5 style="font-size: 0.92rem; font-weight: 700; color: var(--text-main); line-height: 1.2;">${escapeHTML(m.name)}</h5>
        <span style="font-size: 0.75rem; color: var(--primary); font-weight: 600;">${escapeHTML(m.branch)} • ${escapeHTML(m.year)}</span>
        <div style="font-size: 0.72rem; color: var(--text-muted); text-overflow: ellipsis; white-space: nowrap; overflow: hidden; margin-top: 0.15rem;">
          ${escapeHTML(m.helpAreas)}
        </div>
      </div>
      <button class="btn btn-outline btn-sm" onclick="openAskSeniorForMentor('${escapeHTML(m.name)}')" style="padding: 0.3rem 0.65rem; font-size: 0.75rem;">
        Ask
      </button>
    </div>
  `).join('');

  if (qaContainer) {
    const topQA = CollabUState.campusQA.slice(0, 2);
    qaContainer.innerHTML = topQA.map(q => `
      <div style="border-bottom: 1px solid var(--border-light); padding-bottom: 0.5rem; cursor: pointer;" onclick="switchTab('campus-connect'); const btn = document.getElementById('connect-tab-btn-qa'); if (btn) btn.click();">
        <span style="font-size: 0.72rem; font-weight: 700; color: var(--primary);">${escapeHTML(q.category)}</span>
        <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-main); margin-top: 0.1rem;">${escapeHTML(q.title)}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.15rem;">
          ${q.answers && q.answers.length > 0 ? `💬 ${q.answers.length} verified response (${escapeHTML(q.answers[0].author)})` : 'Awaiting mentor answer'}
        </div>
      </div>
    `).join('');
  }
}

function renderDashboardStories() {
  const container = document.getElementById('dashboard-stories-list');
  if (!container) return;

  const topStories = CollabUState.studentStories.slice(0, 3);
  container.innerHTML = topStories.map(s => `
    <div class="card-item" onclick="readStudentStory('${s.id}')" style="cursor: pointer;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
        <span class="sparkle-badge sparkle-badge-teal" style="font-size: 0.68rem; padding: 0.15rem 0.5rem;">${escapeHTML(s.category)}</span>
        <span style="font-size: 0.72rem; color: var(--text-subtle);">⏱ ${escapeHTML(s.readTime)}</span>
      </div>
      <h4 style="font-size: 0.95rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.3rem;">${escapeHTML(s.title)}</h4>
      <p style="font-size: 0.8rem; color: var(--text-muted); line-height: 1.45; margin-bottom: 0.4rem;">${escapeHTML(s.preview)}</p>
      <div style="font-size: 0.74rem; color: var(--primary); font-weight: 600;">
        By ${escapeHTML(s.author)} (${escapeHTML(s.authorRole)}) • Read Story →
      </div>
    </div>
  `).join('');
}

window.openAskSeniorForMentor = function(mentorName) {
  const modal = document.getElementById('modal-ask-senior');
  const details = document.getElementById('ask-details');
  if (details && mentorName) {
    details.placeholder = `Specifically asking for ${mentorName}'s perspective on your admission, branch, or coursework questions...`;
  }
  if (modal) modal.classList.add('active');
};

window.openRequestConvoForMentor = function(mentorName) {
  populateMentorOptions();
  const modal = document.getElementById('modal-request-convo');
  const mentorSelect = document.getElementById('convo-preferred-mentor');
  if (mentorSelect && mentorName) {
    for (let i = 0; i < mentorSelect.options.length; i++) {
      if (mentorSelect.options[i].value.includes(mentorName)) {
        mentorSelect.selectedIndex = i;
        break;
      }
    }
  }
  if (modal) modal.classList.add('active');
};

window.openAnswerQuestionModal = function(qId) {
  const question = CollabUState.campusQA.find(q => q.id === qId);
  if (!question) return;

  const modal = document.getElementById('modal-submit-answer');
  const catEl = document.getElementById('answer-modal-category');
  const titleEl = document.getElementById('answer-modal-question-title');
  const idEl = document.getElementById('answer-question-id');

  if (catEl) catEl.textContent = question.category;
  if (titleEl) titleEl.textContent = question.title;
  if (idEl) idEl.value = question.id;

  if (modal) modal.classList.add('active');
};

window.openMentorProfile = function(mentorId) {
  const mentor = CollabUState.campusMentors.find(m => m.id === mentorId);
  if (!mentor) return;

  const modal = document.getElementById('modal-mentor-profile');
  const title = document.getElementById('mentor-profile-title');
  const branch = document.getElementById('mentor-profile-branch');
  const content = document.getElementById('mentor-profile-content');

  if (title) title.textContent = mentor.name;
  if (branch) branch.textContent = `${mentor.branch} • ${mentor.year}`;

  if (content) {
    content.innerHTML = `
      <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.25rem;">
        <div class="mentor-avatar" style="width: 64px; height: 64px; font-size: 1.4rem;">${escapeHTML(mentor.initials)}</div>
        <div>
          <h4 style="font-size: 1.2rem; font-weight: 800; color: var(--text-main);">${escapeHTML(mentor.name)}</h4>
          <span style="font-size: 0.85rem; color: var(--primary); font-weight: 600;">${escapeHTML(mentor.branch)} Engineering (${escapeHTML(mentor.year)})</span>
          <div style="margin-top: 0.25rem;">
            <span class="mentor-badge-verified">
              <span>✓</span>
              <span>${mentor.isDemo ? 'Verified Volunteer • Demo Profile' : 'Verified Student Volunteer'}</span>
            </span>
          </div>
        </div>
      </div>

      <div style="background: var(--bg-surface-alt); border-radius: var(--radius-md); padding: 1.15rem; margin-bottom: 1.25rem; font-size: 0.88rem; line-height: 1.6; color: var(--text-main);">
        <strong>About ${escapeHTML(mentor.name)}:</strong>
        <p style="margin-top: 0.35rem; color: var(--text-muted);">${escapeHTML(mentor.bio)}</p>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.6rem; font-size: 0.84rem; margin-bottom: 1.5rem;">
        <div><strong>Key Topics:</strong> ${mentor.topics.map(t => `<span class="mentor-chip">✦ ${escapeHTML(t)}</span>`).join(' ')}</div>
        <div><strong>Spoken Languages:</strong> ${escapeHTML(mentor.languages.join(', '))}</div>
        <div><strong>Campus Activities:</strong> ${escapeHTML(mentor.helpAreas)}</div>
      </div>

      <div style="display: flex; gap: 0.75rem;">
        <button class="btn btn-outline" style="flex: 1;" onclick="document.getElementById('modal-mentor-profile').classList.remove('active'); openAskSeniorForMentor('${escapeHTML(mentor.name)}')">
          ❓ Ask a Question
        </button>
        <button class="btn btn-primary" style="flex: 1;" onclick="document.getElementById('modal-mentor-profile').classList.remove('active'); openRequestConvoForMentor('${escapeHTML(mentor.name)}')">
          💬 Request Chat
        </button>
      </div>
    `;
  }

  if (modal) modal.classList.add('active');
};

window.openReportModal = function(type, id, title) {
  const modal = document.getElementById('modal-report-content');
  const targetId = document.getElementById('report-target-id');
  const targetType = document.getElementById('report-target-type');
  const targetTitle = document.getElementById('report-target-title');

  if (targetId) targetId.value = id;
  if (targetType) targetType.value = type;
  if (targetTitle) targetTitle.textContent = title || 'Community Item';

  if (modal) modal.classList.add('active');
};

window.reportItem = function(type, id, title) {
  openReportModal(type, id, title);
};


