import { useState, FormEvent, useEffect } from 'react';
import { 
  User, 
  FileText, 
  Settings, 
  Layers, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  CheckCircle, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  Activity,
  Send,
  Sparkles,
  Check
} from 'lucide-react';
import { 
  personalInfo, 
  educationHistory, 
  workExperienceHistory, 
  skillsList, 
  languagesList, 
  artifactsData 
} from './data';
import { 
  CprSimulation, 
  RubricBuilder, 
  CurriculumBlueprint 
} from './components/InteractiveArtifacts';

// Profile image path — use Vite module import so it works in production build
import profileImg from './assets/images/olantu_profile_1784459066848.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'cv' | 'sandbox'>('home');
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>('pediatric-cpr-sim');
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('All');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Counter animation
  const [studentsCount, setStudentsCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [artifactsCount, setArtifactsCount] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const steps = 24;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setStudentsCount(Math.floor(progress * 150));
      setYearsCount(Math.floor(progress * 9));
      setArtifactsCount(Math.floor(progress * 12));

      if (step >= steps) {
        setStudentsCount(150);
        setYearsCount(9);
        setArtifactsCount(12);
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  const skillCategories = ['All', 'Instructional Design', 'Pedagogy & Training', 'Technical Tools', 'Professional Skills'];

  const filteredSkills = selectedSkillCategory === 'All' 
    ? skillsList 
    : skillsList.filter(s => s.category === selectedSkillCategory);

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900" id="portfolio-root">
      
      {/* CLEAN TOP HEADER & NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs" id="portfolio-header">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo & Identity */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm shrink-0">
              OM
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-900 flex items-center gap-2" id="brand-name">
                {personalInfo.name}
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full">
                  M.Sc Pediatric Nursing
                </span>
              </h1>
              <p className="text-xs text-blue-600 font-mono font-medium tracking-wide mt-0.5">
                Clinical Pedagogy & Learning Design
              </p>
            </div>
          </div>
          
          {/* Clean Navigation Tabs */}
          <nav className="flex items-center gap-1 p-1 bg-slate-100/80 border border-slate-200/80 rounded-xl" id="nav-tabs">
            <button
              id="tab-home-btn"
              onClick={() => setActiveTab('home')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
              }`}
            >
              <User className="h-4 w-4" />
              <span>Overview</span>
            </button>

            <button
              id="tab-cv-btn"
              onClick={() => setActiveTab('cv')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'cv'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Interactive CV</span>
            </button>

            <button
              id="tab-sandbox-btn"
              onClick={() => setActiveTab('sandbox')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'sandbox'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-600 hover:bg-white/60'
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>EdTech Sandbox</span>
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 py-8" id="portfolio-main">
        
        {/* ==================== TAB A: OVERVIEW ==================== */}
        {activeTab === 'home' && (
          <div className="space-y-10 animate-fade-in" id="home-view">
            
            {/* HERO SECTION CARD */}
            <section className="card-clean card-gradient-hero p-6 sm:p-10 relative overflow-hidden" id="hero-section">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                
                {/* Profile Avatar */}
                <div className="md:col-span-4 flex justify-center">
                  <div className="relative">
                    <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden border-4 border-white shadow-md">
                      <img
                        src={profileImg}
                        alt={personalInfo.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                        id="profile-avatar"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white text-[11px] font-bold font-mono px-3 py-1 rounded-full shadow-sm border-2 border-white">
                      DEFENCE FACULTY
                    </div>
                  </div>
                </div>

                {/* Hero Info */}
                <div className="md:col-span-8 space-y-4 text-center md:text-left">
                  <span className="inline-block px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-full uppercase tracking-wider font-mono">
                    Lecturer & Instructional Designer
                  </span>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {personalInfo.name}
                  </h2>

                  <p className="text-base sm:text-lg font-medium text-slate-700 leading-relaxed max-w-2xl">
                    {personalInfo.subtitle}
                  </p>

                  <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                    Academic lecturer at Ethiopian Defence University with extensive expertise in pediatric healthcare instruction, clinical simulation sandboxes, and outcome-based curriculum design.
                  </p>

                  {/* Contact Badges */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-1 text-slate-600 text-xs font-medium">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      <span>{personalInfo.location}</span>
                    </div>

                    <button 
                      onClick={handleCopyEmail}
                      className="flex items-center gap-1.5 hover:text-blue-700 cursor-pointer group"
                      title="Click to copy email"
                    >
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="underline underline-offset-2 text-blue-600">{personalInfo.email}</span>
                      {copiedEmail && <span className="text-[10px] text-emerald-600 font-bold ml-1">Copied!</span>}
                    </button>

                    <div className="flex items-center gap-1.5">
                      <Phone className="h-4 w-4 text-blue-600" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  </div>

                  {/* Hero Action Buttons */}
                  <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-3">
                    <button
                      id="hero-go-cv-btn"
                      onClick={() => setActiveTab('cv')}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                    >
                      <span>View Interactive CV</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    <button
                      id="hero-go-sandbox-btn"
                      onClick={() => setActiveTab('sandbox')}
                      className="px-5 py-2.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Layers className="h-4 w-4 text-blue-600" />
                      <span>Explore EdTech Sandbox</span>
                    </button>
                  </div>

                </div>

              </div>
            </section>

            {/* IMPACT NUMBERS / METRICS */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6" id="stats-section">
              <div className="card-clean p-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3 border border-blue-100">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-mono">{studentsCount}+</div>
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wider mt-1">Students Advised</div>
                <p className="text-xs text-slate-500 mt-1">Medical research capstones & internship supervision</p>
              </div>

              <div className="card-clean p-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-3 border border-indigo-100">
                  <Briefcase className="h-5 w-5" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-mono">{yearsCount}+ Years</div>
                <div className="text-xs font-bold text-indigo-700 uppercase tracking-wider mt-1">Teaching Experience</div>
                <p className="text-xs text-slate-500 mt-1">Ethiopian Defence University & Mizan-Tepi University</p>
              </div>

              <div className="card-clean p-6 text-center">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3 border border-sky-100">
                  <Activity className="h-5 w-5" />
                </div>
                <div className="text-3xl font-extrabold text-slate-900 font-mono">{artifactsCount}+</div>
                <div className="text-xs font-bold text-sky-700 uppercase tracking-wider mt-1">Instructional Modules</div>
                <p className="text-xs text-slate-500 mt-1">Clinical scenario simulations, rubrics & UDL blueprints</p>
              </div>
            </section>

            {/* BIOGRAPHY & PHILOSOPHY SPLIT */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="bio-philosophy-split">
              
              {/* Bio Card */}
              <div className="card-clean p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <User className="h-5 w-5 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-lg tracking-tight">Biographical Overview</h3>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {personalInfo.bio}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-blue-600 font-mono uppercase block mb-1">M.Sc Pediatric Nursing</span>
                    <p className="text-xs text-slate-600">Addis Ababa University (2017-2019)</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-xs font-bold text-indigo-600 font-mono uppercase block mb-1">B.Sc Midwifery</span>
                    <p className="text-xs text-slate-600">Mizan-Tepi University (2012-2015)</p>
                  </div>
                </div>
              </div>

              {/* Philosophy Card */}
              <div className="card-clean p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
                    <BookOpen className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-bold text-slate-900 text-lg tracking-tight">Pedagogical Philosophy</h3>
                  </div>

                  <div className="pl-4 border-l-3 border-indigo-600 italic text-slate-700 text-sm leading-relaxed bg-indigo-50/40 p-3 rounded-r-xl">
                    &ldquo;{personalInfo.philosophy}&rdquo;
                  </div>
                </div>

                {/* CARP Framework summary */}
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-slate-700 font-mono uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                    CARP Design Framework Applied
                  </h4>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="font-bold text-blue-700 block">Contrast:</span>
                      <span className="text-slate-600 text-[11px]">Highlights critical triage values.</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="font-bold text-indigo-700 block">Alignment:</span>
                      <span className="text-slate-600 text-[11px]">Lowers student cognitive load.</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="font-bold text-sky-700 block">Repetition:</span>
                      <span className="text-slate-600 text-[11px]">Standardizes evaluation rubrics.</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                      <span className="font-bold text-emerald-700 block">Proximity:</span>
                      <span className="text-slate-600 text-[11px]">Pairs vitals directly with actions.</span>
                    </div>
                  </div>
                </div>

              </div>

            </section>

            {/* SPOTLIGHT BANNER */}
            <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm" id="spotlight-section">
              <div className="relative z-10 max-w-2xl space-y-3">
                <span className="bg-white/15 text-white border border-white/20 px-3 py-1 rounded-full text-xs font-mono uppercase font-bold tracking-wider inline-block">
                  Featured Interactive Module
                </span>

                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Pediatric CPR Resuscitation Simulation
                </h3>

                <p className="text-blue-100 text-sm leading-relaxed">
                  Interactive scenario-based simulation modeled on AHA pediatric resuscitation guidelines. Test clinical decision speed with immediate feedback.
                </p>

                <div className="pt-2">
                  <button
                    id="hero-launch-sim-btn"
                    onClick={() => {
                      setActiveTab('sandbox');
                      setSelectedArtifactId('pediatric-cpr-sim');
                    }}
                    className="px-5 py-2.5 bg-white text-blue-700 hover:bg-blue-50 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Launch Interactive Simulator</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </section>

            {/* CONTACT FORM */}
            <section className="card-clean p-6 sm:p-8" id="quick-contact-section">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="text-center space-y-1">
                  <h3 className="font-bold text-slate-900 text-xl tracking-tight">Professional Inquiries</h3>
                  <p className="text-slate-500 text-xs sm:text-sm">For lectureship inquiries, curriculum reviews, or academic consultations.</p>
                </div>

                {formSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center text-emerald-800 max-w-md mx-auto">
                    <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                    <h4 className="font-bold text-sm">Message Sent Successfully</h4>
                    <p className="text-xs mt-1 text-emerald-700">Thank you for reaching out. Olantu will respond to your email shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4" id="contact-form">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Name</label>
                        <input
                          id="contact-name"
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Dr. Sarah Jenkins"
                          className="clean-input"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Your Email</label>
                        <input
                          id="contact-email"
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="s.jenkins@university.edu"
                          className="clean-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Subject</label>
                      <input
                        id="contact-subject"
                        type="text"
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Curriculum & Simulation Inquiry"
                        className="clean-input"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Message</label>
                      <textarea
                        id="contact-message"
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        rows={4}
                        placeholder="Write your professional message here..."
                        className="clean-input resize-none"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        id="submit-contact-btn"
                        type="submit"
                        className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold text-sm transition-all shadow-sm flex items-center gap-2 cursor-pointer"
                      >
                        <Send className="h-4 w-4" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </section>

          </div>
        )}

        {/* ==================== TAB B: INTERACTIVE CV ==================== */}
        {activeTab === 'cv' && (
          <div className="space-y-8 animate-fade-in" id="cv-view">
            
            {/* DOWNLOAD BANNER */}
            <div className="card-clean p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0 border border-blue-100">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">Full Curriculum Vitae</h3>
                  <p className="text-slate-500 text-xs">Academic history, lecturing appointments, and skill inventory.</p>
                </div>
              </div>

              <button
                id="download-cv-btn"
                onClick={() => {
                  alert("Academic Portfolio Alert: Olantu's print-ready CV PDF is prepared! In a live environment, this downloads the PDF directly.");
                }}
                className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-300 hover:border-slate-400 text-slate-700 rounded-xl text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Download className="h-4 w-4 text-blue-600" />
                <span>DOWNLOAD PDF CV</span>
              </button>
            </div>

            {/* SPLIT LAYOUT: EXPERIENCE & EDUCATION (LEFT), SKILLS & LANGUAGES (RIGHT) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column (8 cols): Work & Education */}
              <div className="lg:col-span-8 space-y-8">
                
                {/* Work Experience */}
                <div className="card-clean p-6 sm:p-8 space-y-6">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                    <Award className="h-5 w-5 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-lg tracking-tight">Lecturing & Professional Appointments</h3>
                  </div>

                  <div className="space-y-6">
                    {workExperienceHistory.map((work, idx) => (
                      <div key={idx} className="relative pl-5 border-l-2 border-blue-500 last:border-l-0 pb-1">
                        <div className="absolute top-1.5 -left-1.5 h-3 w-3 rounded-full bg-blue-600 border-2 border-white"></div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h4 className="font-bold text-slate-900 text-base">{work.role}</h4>
                          <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full shrink-0 self-start sm:self-auto border border-blue-100">
                            {work.period}
                          </span>
                        </div>

                        <p className="text-slate-500 text-xs font-semibold mt-1 font-mono uppercase tracking-wider">
                          {work.organization} {work.location ? `| ${work.location}` : ''}
                        </p>

                        <ul className="mt-3 space-y-2 text-slate-600 text-xs sm:text-sm leading-relaxed">
                          {work.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="flex gap-2">
                              <span className="text-blue-600 font-bold shrink-0">&bull;</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Education */}
                <div className="card-clean p-6 sm:p-8 space-y-6">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                    <GraduationCap className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-bold text-slate-900 text-lg tracking-tight">Academic Education</h3>
                  </div>

                  <div className="space-y-6">
                    {educationHistory.map((edu, idx) => (
                      <div key={idx} className="relative pl-5 border-l-2 border-indigo-500 last:border-l-0 pb-1">
                        <div className="absolute top-1.5 -left-1.5 h-3 w-3 rounded-full bg-indigo-600 border-2 border-white"></div>
                        
                        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                          <h4 className="font-bold text-slate-900 text-base">{edu.degree}</h4>
                          <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full shrink-0 self-start sm:self-auto border border-indigo-100">
                            {edu.period}
                          </span>
                        </div>

                        <p className="text-slate-500 text-xs font-semibold mt-1 font-mono uppercase tracking-wider">
                          {edu.institution}
                        </p>

                        {edu.description && (
                          <p className="mt-2 text-slate-600 text-xs leading-relaxed">
                            {edu.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column (4 cols): Skills & Languages */}
              <div className="lg:col-span-4 space-y-8">
                
                {/* Skills Inventory Block */}
                <div className="card-clean p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                    <Settings className="h-4 w-4 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Skills Inventory</h3>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap gap-1 pb-1">
                    {skillCategories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedSkillCategory(cat)}
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                          selectedSkillCategory === cat
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Skill Items */}
                  <div className="space-y-3 pt-1">
                    {filteredSkills.map(skill => {
                      const levelWidth = skill.level === 'Expert' ? '92%' : '80%';
                      return (
                        <div key={skill.name} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-medium text-slate-800">{skill.name}</span>
                            <span className="text-[10px] font-mono text-blue-700 font-semibold">{skill.level}</span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-blue-600 transition-all duration-700"
                              style={{ width: levelWidth }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Languages Block */}
                <div className="card-clean p-6 space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                    <ShieldCheck className="h-4 w-4 text-blue-600" />
                    <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Languages</h3>
                  </div>

                  <div className="space-y-2.5">
                    {languagesList.map((lang, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                        <span className="font-bold text-slate-800">{lang.name}</span>
                        <span className="text-slate-500 font-mono text-[11px]">{lang.proficiency}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Teaching Statement Card */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 space-y-3 shadow-xs">
                  <span className="text-[10px] font-mono font-bold text-blue-300 uppercase tracking-widest block">
                    TEACHING STATEMENT
                  </span>
                  <p className="text-xs text-slate-200 italic leading-relaxed">
                    &ldquo;Standardizing clinical criteria and reducing evaluation bias allows nursing students to gain confidence and identify errors early in a controlled environment.&rdquo;
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ==================== TAB C: EDTECH SANDBOX ==================== */}
        {activeTab === 'sandbox' && (
          <div className="space-y-8 animate-fade-in" id="sandbox-view">
            
            {/* Sandbox Intro Banner */}
            <div className="card-clean p-6 sm:p-8 space-y-2">
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Instructional Technology Showcase
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed max-w-3xl">
                Select an interactive artifact below to test the scenario-based CPR simulator, clinical evaluation rubric, or 12-week hybrid course map.
              </p>
            </div>

            {/* Sandbox Layout Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="sandbox-grid-layout">
              
              {/* Sidebar selectors (4 cols) */}
              <div className="lg:col-span-4 space-y-3">
                {artifactsData.map(art => {
                  const isSelected = selectedArtifactId === art.id;
                  return (
                    <button
                      key={art.id}
                      id={`artifact-tab-${art.id}`}
                      onClick={() => setSelectedArtifactId(art.id)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-1 ${
                        isSelected ? 'text-blue-100' : 'text-blue-600'
                      }`}>
                        {art.category}
                      </span>
                      
                      <h4 className="text-sm font-bold tracking-tight mb-1.5 leading-snug">{art.title}</h4>
                      
                      <p className={`text-xs line-clamp-2 leading-relaxed ${
                        isSelected ? 'text-blue-100' : 'text-slate-500'
                      }`}>
                        {art.shortDescription}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Central Active Module (8 cols) */}
              <div className="lg:col-span-8 space-y-6">
                
                {/* 1. Pediatric CPR Simulation */}
                {selectedArtifactId === 'pediatric-cpr-sim' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-xs space-y-1">
                      <p className="text-blue-900"><strong>Design Rationale:</strong> Elicits clinical decision speed matching AHA guidelines.</p>
                      <p className="text-blue-700"><strong>Associated Theory:</strong> Gagne&rsquo;s 9 Events of Instruction (Eliciting Performance & Feedback).</p>
                    </div>
                    <CprSimulation />
                  </div>
                )}

                {/* 2. Clinical Competency Rubric */}
                {selectedArtifactId === 'clinical-competency-rubric' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-xs space-y-1">
                      <p className="text-blue-900"><strong>Design Rationale:</strong> Standardizes evaluation matrix for clinical skill exams.</p>
                      <p className="text-blue-700"><strong>Associated Theory:</strong> Criterion-Referenced Assessment & Constructive Alignment (Biggs).</p>
                    </div>
                    <RubricBuilder />
                  </div>
                )}

                {/* 3. Curriculum Blueprint Map */}
                {selectedArtifactId === 'pediatric-nursing-curriculum' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-xl text-xs space-y-1">
                      <p className="text-blue-900"><strong>Design Rationale:</strong> Structural layout to map terminal learning objectives with media tools.</p>
                      <p className="text-blue-700"><strong>Associated Theory:</strong> Universal Design for Learning (UDL) & Backward Design.</p>
                    </div>
                    <CurriculumBlueprint />
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white mt-16" id="portfolio-footer">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="text-center md:text-left space-y-1">
              <p className="text-sm font-semibold text-slate-900">
                &copy; {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
              </p>
              <p className="text-xs text-slate-500">
                Lecturer at Ethiopian Defence University & Clinical Learning Designer.
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200 text-[11px] leading-relaxed text-slate-600 text-center md:text-left">
              <span className="font-bold text-slate-800 block mb-0.5 uppercase tracking-wider font-mono">
                Academic Fair Use Declaration
              </span>
              This digital portfolio serves as an educational and professional showcase for clinical pedagogy, visual literacy, and instructional design artifacts published under academic fair use guidelines.
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 font-mono">
            <div>
              Built with React, Vite & Tailwind CSS.
            </div>
            <div className="flex items-center gap-4">
              <span>Bishoftu, Ethiopia</span>
              <span>•</span>
              <a href={`mailto:${personalInfo.email}`} className="text-blue-600 hover:underline">
                {personalInfo.email}
              </a>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
