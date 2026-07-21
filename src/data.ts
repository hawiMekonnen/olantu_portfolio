import { Education, WorkExperience, Skill, Language, Artifact } from './types';

export const personalInfo = {
  name: "Olantu Mekonnen Gutema",
  title: "Lecturer & Instructional Designer",
  subtitle: "Bridging Healthcare Education, Clinical Pedagogy & Educational Technology",
  location: "Bishoftu, Ethiopia",
  email: "olaniigutema@gmail.com",
  phone: "+251921063002",
  github: "https://github.com/olantu-gutema", // Placeholder that can be customized
  linkedin: "https://linkedin.com/in/olantu-mekonnen-gutema", // Placeholder that can be customized
  profileImage: "/src/assets/images/olantu_profile_1784459066848.jpg",
  bio: "Dedicated educator with extensive expertise in curriculum design, clinical simulation, and pedagogical strategies. Proficient in MS Office, digital learning platforms, and instructional media design. Possesses strong capabilities in lecture preparation, interactive teaching material development, and clinical research. Actively engaged in peer review, mentoring final-year healthcare projects, and internship supervision. Committed to advancing educational methodologies and fostering academic excellence in the field of educational technology and clinical learning.",
  philosophy: "I believe that effective education, particularly in critical clinical disciplines like nursing and midwifery, is deeply rooted in experiential learning and interactive pedagogical design. By applying rigorous cognitive theories (like Gagne's Events of Instruction) and visual-spatial clarity (like the CARP design principles), we can design interactive digital simulations and modules that bridge the gap between classroom theory and real-world clinical action, saving lives through design."
};

export const educationHistory: Education[] = [
  {
    degree: "Master of Science in Pediatric Health Nursing",
    institution: "Addis Ababa University",
    period: "2017 - 2019",
    description: "Advanced research-focused study on pediatric clinical interventions, pedagogical theory in nursing instruction, and development of pediatric healthcare training protocols."
  },
  {
    degree: "Bachelor of Science in Midwifery",
    institution: "Mizan-Tepi University",
    period: "2012 - 2015",
    description: "Comprehensive training in maternal and newborn clinical health, community nursing, and clinical classroom instruction methods."
  }
];

export const workExperienceHistory: WorkExperience[] = [
  {
    role: "Lecturer",
    organization: "Ethiopian Defence University",
    period: "2023 - Present",
    location: "Ethiopia",
    bullets: [
      "Mentored nursing and healthcare students during their final-year clinical research and capstone projects, ensuring 100% successful and high-quality completions.",
      "Coordinated with interdisciplinary faculty members to design innovative, integrated health sciences curricula that align with national standards and digital learning tools.",
      "Participated actively in institutional faculty training and capacity-building programs to enhance active learning and instructional technology methodologies."
    ]
  },
  {
    role: "Lecturer",
    organization: "Mizan-Tepi University",
    period: "Jul 2019 - Mar 2023",
    location: "Mizan Tepe, Ethiopia",
    bullets: [
      "Contributed significantly to departmental curriculum planning meetings and academic committees to drive strategic decision-making and quality assurance.",
      "Collaborated with senior lecturers and clinical instructors to share best practices in modern pedagogical design and classroom-to-clinical instruction methodologies.",
      "Fostered a highly stimulating, psychological-safe clinical learning environment through interactive discussions, case-study review, and reflective practice.",
      "Advised over 150+ academic and medical students on progress, clinical placements, and career advancement to ensure high retention and success rates.",
      "Graded periodic assessments and exams, designing comprehensive rubrics and logging constructive feedback onto computerized learning management platforms."
    ]
  },
  {
    role: "Assistant Lecturer and Graduate Assistant II",
    organization: "Mizan-Tepi University",
    period: "2015 - 2017",
    location: "Mizan Tepe, Ethiopia",
    bullets: [
      "Supported senior professors in lecture delivery, laboratory preparation, and grading clinical competency exams.",
      "Co-supervised clinical internships at affiliated medical centers, guiding students through practical newborn and pediatric care cycles.",
      "Served a transition period of one year as Assistant Lecturer following a highly successful initial year as Graduate Assistant II due to exceptional teaching evaluations."
    ]
  }
];

export const skillsList: Skill[] = [
  // Instructional Design
  { name: "Curriculum & Syllabus Design", level: "Expert", category: "Instructional Design" },
  { name: "Clinical Scenario Simulation", level: "Expert", category: "Instructional Design" },
  { name: "Active Learning Methodologies", level: "Expert", category: "Instructional Design" },
  { name: "Gagne's Nine Events of Instruction", level: "Advanced", category: "Instructional Design" },
  { name: "CARP Design Principles", level: "Advanced", category: "Instructional Design" },

  // Pedagogy & Training
  { name: "Clinical Mentoring & Coaching", level: "Expert", category: "Pedagogy & Training" },
  { name: "Peer-Review & Quality Auditing", level: "Expert", category: "Pedagogy & Training" },
  { name: "Classroom Management", level: "Expert", category: "Pedagogy & Training" },
  { name: "Internship & Residency Supervision", level: "Expert", category: "Pedagogy & Training" },

  // Technical Tools
  { name: "MS Office Suite Proficiency", level: "Expert", category: "Technical Tools" },
  { name: "Learning Management Systems (LMS)", level: "Advanced", category: "Technical Tools" },
  { name: "Interactive Media & E-Learning Platforms", level: "Advanced", category: "Technical Tools" },
  { name: "Digital Curricula Authoring", level: "Advanced", category: "Technical Tools" },

  // Professional Skills
  { name: "Teamwork & Collaborative Leadership", level: "Expert", category: "Professional Skills" },
  { name: "Effective Clinical Communication", level: "Expert", category: "Professional Skills" },
  { name: "Analytical & Critical Thinking", level: "Expert", category: "Professional Skills" },
  { name: "Professional Time Management", level: "Expert", category: "Professional Skills" }
];

export const languagesList: Language[] = [
  { name: "English", proficiency: "Advanced (Academic Instruction & Writing)" },
  { name: "Amharic", proficiency: "Fluent (Native/Bilingual)" },
  { name: "Afan Oromo", proficiency: "Fluent (Native/Bilingual)" }
];

export const artifactsData: Artifact[] = [
  {
    id: "pediatric-cpr-sim",
    title: "Pediatric CPR Virtual Simulation Scenario",
    category: "Interactive Clinical Simulation",
    shortDescription: "An interactive, branching-path decision-making simulation designed for nursing students to practice clinical CPR sequencing.",
    fullDescription: "This interactive learning artifact demonstrates scenario-based learning theory. Nursing students are presented with a clinical pediatric emergency. At each step, they must analyze the patient's vitals (heart rate, respiration) and make critical, time-sensitive decisions. Choosing incorrect paths triggers simulated real-time physiological feedback and explains the correct physiological response. It incorporates visual CARP principles by maintaining strict alignment of telemetry monitors, contrasting emergency alert headers, and proximity-based tooltips for equipment.",
    learningTheory: "Scenario-Based Learning & Experiential Learning Theory (Kolb)",
    targetAudience: "Undergraduate Pediatric Nursing Students & Midwifery Interns",
    tags: ["Clinical Simulation", "Branching Scenario", "Pediatric Nursing"],
    interactiveType: "simulation"
  },
  {
    id: "clinical-competency-rubric",
    title: "Clinical Competency Assessment Rubric",
    category: "Instructional Tool",
    shortDescription: "An interactive rubric builder designed to standardize midwifery clinical skills assessments and reduce grading bias.",
    fullDescription: "To overcome grading inconsistency across clinical rotations, this interactive assessment tool translates qualitative clinical midwifery skills (e.g., active management of the third stage of labor) into concrete, aligned performance indicators. Instructors can tap through different scoring domains (Safety, Technique, Communication, Efficiency) to dynamically compute an overall competency grade. The artifact showcases repetition of visual indicators (color-coded progress stages) and high contrast for accessibility.",
    learningTheory: "Criterion-Referenced Assessment & Constructive Alignment (Biggs)",
    targetAudience: "Nursing Lecturers, Clinical Preceptors & Peer Evaluators",
    tags: ["Assessment Design", "Midwifery Training", "Interactive Rubric"],
    interactiveType: "rubric"
  },
  {
    id: "pediatric-nursing-curriculum",
    title: "12-Week Pediatric Health Curriculum Grid",
    category: "Curriculum Blueprint",
    shortDescription: "A hybrid curriculum grid mapping course objectives, interactive instructional media, and assessments using UDL principles.",
    fullDescription: "This structured curriculum blueprint maps out a 12-week hybrid module in Advanced Pediatric Health Nursing. It illustrates the alignment between weekly terminal learning objectives, digital educational technologies (such as online discussion boards and video walk-throughs), and corresponding diagnostic, formative, and summative assessments. Visual alignment and proximity-based layouts make it simple for other instructors to adopt and adapt this course framework.",
    learningTheory: "Universal Design for Learning (UDL) & Backward Design (Wiggins & McTighe)",
    targetAudience: "Curriculum Planners, University Academic Boards & Faculty Lecturers",
    tags: ["Curriculum Mapping", "Hybrid Learning", "Course Blueprint"],
    interactiveType: "curriculum"
  }
];

export const reflectiveNarrativeTemplate = {
  challenge: "The biggest design challenge in creating this website was translating complex, multi-layered clinical knowledge and pedagogical protocols into lightweight, engaging, and accessible digital formats. Medical training traditionally relies on heavy, text-dense reference manuals. Translating this into a digital portfolio required meticulous visual hierarchy and interactive segmenting. To overcome this, I leveraged Gagne's Events of Instruction to scaffold complex topics (like Pediatric CPR) into clear, step-by-step interactive flows. I also applied CARP design principles, utilizing high-contrast alerts to highlight critical clinical decision points, aligning nested menus for immediate readability, repeating consistent semantic color styling across categories, and grouping clinical data with close visual proximity so that users can mentally digest information without cognitive overload.",
  influence: "Learning about visual literacy and instructional design principles dramatically altered my approach to constructing learning content. Previously, I viewed layout as secondary to information. Now, I understand that design *is* the medium of instruction. For instance, applying the 'Contrast' rule helped me ensure that emergency protocols are immediately distinguished from normal values. Utilizing 'Alignment' has made my syllabi and study guides much easier for students to scan during intense clinical review. 'Repetition' establishes a predictable rhythm that builds student trust and confidence, while 'Proximity' ensures that diagnostic readings are visually coupled with their corresponding actions, mirroring actual clinical workflows.",
  futureUse: "In the future, I plan to utilize this website as a dynamic educational hub and a living digital portfolio. I will share it with academic recruiters, hospital training coordinators, and international research colleagues to showcase my dual expertise as a healthcare lecturer and an innovative digital learning designer. Additionally, I intend to expand the 'Instructional Design Artifacts' section, turning it into an open-access repository where my actual students can preview pediatric nursing simulation cards, download standardized clinical rubrics, and participate in online peer-evaluations, thereby directly integrating my design work into my ongoing teaching practice."
};
