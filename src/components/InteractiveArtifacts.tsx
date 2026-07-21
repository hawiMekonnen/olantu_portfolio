import { useState } from 'react';
import { Activity, CheckCircle, AlertTriangle, RotateCcw, Award, FileText, Calendar, BookOpen, Layers, Sparkles } from 'lucide-react';

// ==========================================
// 1. CPR SIMULATION COMPONENT
// ==========================================
interface SimStep {
  id: number;
  text: string;
  options: {
    text: string;
    nextStep: number | 'success' | 'failure';
    isCorrect: boolean;
    explanation: string;
  }[];
}

const cprSteps: Record<number, SimStep> = {
  1: {
    id: 1,
    text: "Scenario: You are a pediatric charge nurse. A 6-year-old child in the pediatric ward is found unresponsive in bed. What is your immediate initial action?",
    options: [
      {
        text: "Verify scene safety, tap child's shoulder, shout for responsiveness, and simultaneously check breathing and pulse (brachial/carotid) for 5-10 seconds.",
        nextStep: 2,
        isCorrect: true,
        explanation: "Correct! Standard AHA guidelines mandate verifying scene safety, checking for responsiveness, and simultaneously assessing breathing and a pulse (carotid in children) for no more than 10 seconds before initiating other steps."
      },
      {
        text: "Begin chest compressions immediately at a rate of 120 per minute.",
        nextStep: 101,
        isCorrect: false,
        explanation: "Critical Error: You must check responsiveness and verify absence of pulse/breathing first. Starting chest compressions on a conscious or breathing child can cause severe rib fractures or internal trauma."
      },
      {
        text: "Administer 1mg of Epinephrine via IV line immediately.",
        nextStep: 102,
        isCorrect: false,
        explanation: "Critical Error: Medication is an advanced cardiovascular life support (ACLS) action. Basic life support protocols (evaluation, activation of help, and high-quality CPR) must always come first."
      }
    ]
  },
  2: {
    id: 2,
    text: "The child is unresponsive, has no normal breathing, but you feel a faint pulse (60 bpm). You have already activated the emergency response team. What is the next step?",
    options: [
      {
        text: "Provide rescue breathing: 1 breath every 2 to 3 seconds (20-30 breaths per minute). Check pulse again every 2 minutes.",
        nextStep: 3,
        isCorrect: true,
        explanation: "Correct! If a child is not breathing normally but has a pulse ≥ 60 bpm, rescue breathing must be started immediately at a rate of 1 breath every 2-3 seconds."
      },
      {
        text: "Begin chest compressions at a 30:2 ratio immediately.",
        nextStep: 103,
        isCorrect: false,
        explanation: "Incorrect path: Chest compressions are not initiated for pediatric patients who have a pulse ≥ 60 bpm and adequate perfusion. Rescue breathing is the priority."
      },
      {
        text: "Perform back blows to clear a potential airway obstruction.",
        nextStep: 104,
        isCorrect: false,
        explanation: "Incorrect path: There is no sign of foreign body airway obstruction. Performing back blows in this state unnecessarily delays ventilation support."
      }
    ]
  },
  3: {
    id: 3,
    text: "After 2 minutes of rescue breathing, you re-assess the patient. The pulse has dropped to 52 bpm, and the child shows poor systemic perfusion (pale, mottled skin). What is your action?",
    options: [
      {
        text: "Begin chest compressions paired with ventilations. Since you are a single rescuer, initiate compressions at a 30:2 ratio.",
        nextStep: 'success',
        isCorrect: true,
        explanation: "Outstanding Decision! In pediatric life support, if the heart rate is < 60 bpm with signs of poor perfusion despite oxygenation and ventilation, you must start chest compressions immediately."
      },
      {
        text: "Continue rescue breathing at the same rate and wait for the resuscitation cart to arrive.",
        nextStep: 105,
        isCorrect: false,
        explanation: "Critical Delay: Waiting is dangerous. A pediatric heart rate under 60 bpm with poor perfusion is a pre-arrest state that demands active chest compressions to maintain cardiac output."
      }
    ]
  }
};

export function CprSimulation() {
  const [currentStepId, setCurrentStepId] = useState<number>(1);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>('');
  const [isDone, setIsDone] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const currentStep = cprSteps[currentStepId];

  const handleOptionSelect = (idx: number) => {
    setSelectedOptionIndex(idx);
    const option = currentStep.options[idx];
    setFeedback(option.explanation);
  };

  const handleNext = () => {
    if (selectedOptionIndex === null) return;
    const option = currentStep.options[selectedOptionIndex];

    if (option.isCorrect) {
      setScore(prev => prev + 10);
      if (option.nextStep === 'success') {
        setIsDone(true);
      } else {
        setCurrentStepId(option.nextStep as number);
      }
    } else {
      setIsDone(true);
    }
    setSelectedOptionIndex(null);
    setFeedback('');
  };

  const resetSim = () => {
    setCurrentStepId(1);
    setSelectedOptionIndex(null);
    setFeedback('');
    setIsDone(false);
    setScore(0);
  };

  return (
    <div className="card-clean overflow-hidden">
      {/* Simulation Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2.5">
          <Activity className="h-5 w-5 animate-pulse text-blue-200" />
          <h3 className="font-semibold tracking-tight text-base">Active Pediatric CPR Resuscitation Sandbox</h3>
        </div>
        <span className="bg-white/20 text-white px-2.5 py-0.5 rounded text-xs font-mono font-medium">
          BLS Protocol
        </span>
      </div>

      {/* Simulation Content */}
      <div className="p-6">
        {!isDone ? (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded font-mono uppercase tracking-wider border border-blue-100">
                Decision Node {currentStepId} of 3
              </span>
              <p className="mt-3 text-slate-900 font-semibold leading-relaxed text-base sm:text-lg">
                {currentStep.text}
              </p>
            </div>

            <div className="space-y-3">
              {currentStep.options.map((option, idx) => {
                const isSelected = selectedOptionIndex === idx;
                return (
                  <button
                    key={idx}
                    id={`cpr-opt-${idx}`}
                    onClick={() => handleOptionSelect(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-slate-900 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500 border border-slate-300'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="leading-relaxed">{option.text}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Live Explanation and feedback */}
            {selectedOptionIndex !== null && (
              <div className={`mt-6 p-4 rounded-xl border text-xs leading-relaxed ${
                currentStep.options[selectedOptionIndex].isCorrect 
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                  : 'bg-amber-50 border-amber-200 text-amber-900'
              }`}>
                <div className="flex gap-2.5">
                  {currentStep.options[selectedOptionIndex].isCorrect ? (
                    <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600 mt-0.5" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 mt-0.5" />
                  )}
                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider font-mono">
                      {currentStep.options[selectedOptionIndex].isCorrect ? 'Correct Practice' : 'Alternative Action Analysis'}
                    </h4>
                    <p className="mt-1">{feedback}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Button */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                id="cpr-next-btn"
                onClick={handleNext}
                disabled={selectedOptionIndex === null}
                className={`px-5 py-2.5 rounded-xl text-xs font-semibold font-mono transition-all flex items-center gap-1.5 ${
                  selectedOptionIndex === null
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer'
                }`}
              >
                <span>Continue Assessment</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            {score >= 30 ? (
              <div className="max-w-md mx-auto space-y-3">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 mb-2 border border-emerald-200">
                  <Award className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Patient Resuscitated!</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  Excellent clinical decision-making. You followed the pediatric BLS chain of survival correctly, recognized bradycardia and perfusion deficits, and initiated life-saving measures efficiently.
                </p>
                <div className="bg-slate-100 py-2 px-3 rounded-lg font-mono text-xs text-slate-700 inline-block border border-slate-200">
                  Sim Score: {score} / 30 (100% Correct)
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto space-y-3">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-rose-100 text-rose-600 mb-2 border border-rose-200">
                  <AlertTriangle className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-bold text-slate-900">Clinical Review Required</h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                  {feedback || "Initiating interventions without proper patient assessment is a critical safety failure in pediatric care."}
                </p>
                <div className="bg-slate-100 py-2 px-3 rounded-lg font-mono text-xs text-slate-700 inline-block border border-slate-200">
                  Score: {score} / 30
                </div>
              </div>
            )}

            <button
              id="cpr-reset-btn"
              onClick={resetSim}
              className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold font-mono rounded-xl shadow-xs inline-flex items-center gap-2 transition-all cursor-pointer"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Try Simulation Again</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 2. CLINICAL COMP_RUBRIC BUILDER
// ==========================================
interface RubricCriterion {
  id: string;
  name: string;
  category: string;
  levels: {
    points: number;
    title: string;
    description: string;
  }[];
}

const rubricCriteria: RubricCriterion[] = [
  {
    id: "asepsis",
    name: "Aseptic Field Setup & Hand Hygiene",
    category: "Safety & Preparation",
    levels: [
      { points: 1, title: "Needs Improvement", description: "Incomplete hand washing; touches sterile gloves to unsterile fields without changing." },
      { points: 3, title: "Competent", description: "Performs full hand hygiene. Standard aseptic technique maintained with minor close contacts." },
      { points: 5, title: "Excellent", description: "Pristine execution of WHO 5-moments. Sterile field and instruments strictly isolated and managed." }
    ]
  },
  {
    id: "identification",
    name: "Patient Consent & Safety Verification",
    category: "Communication",
    levels: [
      { points: 1, title: "Needs Improvement", description: "Forgets to verify patient identifier bracelet or explain procedural steps clearly." },
      { points: 3, title: "Competent", description: "Verifies ID using 1 identifier. Obtains verbal consent and details primary procedure steps." },
      { points: 5, title: "Excellent", description: "Confirms dual identifiers. Effectively secures informed consent, active feedback, and comfort checks." }
    ]
  },
  {
    id: "technique",
    name: "Clinical Procedural Competence",
    category: "Technical Skill",
    levels: [
      { points: 1, title: "Needs Improvement", description: "Hesitant execution. Misidentifies anatomical landmarks. Displaces clinical equipment." },
      { points: 3, title: "Competent", description: "Systematic execution. Accurate site identification. Securely manipulates equipment and protocols." },
      { points: 5, title: "Excellent", description: "Flawless, highly ergonomic motor skill. Anticipates steps smoothly, managing patient pain perfectly." }
    ]
  },
  {
    id: "documentation",
    name: "Feedback Logs & Care Documentation",
    category: "Professionalism",
    levels: [
      { points: 1, title: "Needs Improvement", description: "Vague or missing documentation of clinical readings. Does not log on computer system." },
      { points: 3, title: "Competent", description: "Logs key vital stats and medicine logs with minor delay. Standard professional language." },
      { points: 5, title: "Excellent", description: "Accurate, structured, and comprehensive charting of patient outcomes, vitals, and nurse remarks." }
    ]
  }
];

export function RubricBuilder() {
  const [selections, setSelections] = useState<Record<string, number>>({
    asepsis: 3,
    identification: 3,
    technique: 3,
    documentation: 3
  });

  const [instructorComments, setInstructorComments] = useState<string>("Student demonstrated safe basic competency. Needs slight refinement in sterile hand positioning.");
  const [showSummary, setShowSummary] = useState<boolean>(false);

  const handleScoreChange = (criterionId: string, pts: number) => {
    setSelections(prev => ({
      ...prev,
      [criterionId]: pts
    }));
  };

  const totalPoints = (Object.values(selections) as number[]).reduce((sum, curr) => sum + curr, 0);
  const maxPoints = rubricCriteria.length * 5;
  const scorePercent = Math.round((totalPoints / maxPoints) * 100);

  const getPerformanceFeedback = () => {
    if (scorePercent >= 90) return "Demonstrates Exceptional Clinical Leadership. Recommended for independent ward roles.";
    if (scorePercent >= 70) return "Demonstrates safe basic clinical competency. Ready for clinical placements under supervision.";
    return "Requires directed remediation. Needs to book simulation lab practice and repeat assessment.";
  };

  return (
    <div className="card-clean overflow-hidden">
      {/* Rubric Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2.5">
          <FileText className="h-5 w-5 text-blue-200" />
          <h3 className="font-semibold tracking-tight text-base">Interactive Competency Rubric Calculator</h3>
        </div>
        <span className="bg-white/20 text-white px-2.5 py-0.5 rounded text-xs font-mono font-medium">
          Evaluation Matrix
        </span>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Select performance tiers below to dynamically calculate evaluation scores.
        </p>

        {/* Scoring Grid */}
        <div className="space-y-5">
          {rubricCriteria.map(criterion => {
            const currentSelectedPoints = selections[criterion.id];
            return (
              <div key={criterion.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-blue-600"></span>
                      {criterion.name}
                    </h4>
                    <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{criterion.category}</span>
                  </div>
                  <div className="flex gap-1.5 flex-wrap">
                    {criterion.levels.map(lvl => (
                      <button
                        key={lvl.points}
                        id={`rubric-${criterion.id}-${lvl.points}`}
                        onClick={() => handleScoreChange(criterion.id, lvl.points)}
                        className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                          currentSelectedPoints === lvl.points
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                        }`}
                      >
                        {lvl.title} ({lvl.points}p)
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white rounded-lg p-3 border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <span className="font-bold text-slate-800">Descriptor: </span>
                  {criterion.levels.find(l => l.points === currentSelectedPoints)?.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Comments Box */}
        <div className="space-y-1.5 pt-2">
          <label className="block text-xs font-bold text-slate-700 uppercase">
            Instructor Qualitative Remarks
          </label>
          <textarea
            id="rubric-comments-input"
            value={instructorComments}
            onChange={(e) => setInstructorComments(e.target.value)}
            placeholder="Add feedback notes..."
            className="clean-input resize-none"
            rows={3}
          />
        </div>

        {/* Scoring Panel */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left space-y-0.5">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">CALCULATED COMPETENCY GRADE</span>
            <div className="flex items-baseline gap-2 justify-center md:justify-start">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">{totalPoints}</span>
              <span className="text-slate-400 text-xs font-mono">/ {maxPoints} pts</span>
              <span className="text-xs bg-blue-100 text-blue-800 font-mono font-bold px-2 py-0.5 rounded ml-2">
                {scorePercent}% SCORE
              </span>
            </div>
          </div>

          <button
            id="rubric-summary-btn"
            onClick={() => setShowSummary(true)}
            className="w-full md:w-auto px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs font-mono rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>COMPILE SUMMARY REPORT</span>
          </button>
        </div>

        {/* Assessment report overlay */}
        {showSummary && (
          <div className="p-4 border border-blue-200 rounded-xl bg-blue-50/50 space-y-2 animate-fade-in">
            <div className="flex justify-between items-start">
              <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                Compiled Clinical Assessment Audit
              </h5>
              <button
                id="close-rubric-summary"
                onClick={() => setShowSummary(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-mono cursor-pointer"
              >
                [Dismiss]
              </button>
            </div>
            <div className="space-y-1 text-xs text-slate-700 font-mono">
              <p><span className="text-blue-800 font-bold">Assessed By:</span> Olantu Mekonnen Gutema</p>
              <p><span className="text-blue-800 font-bold">Score:</span> {totalPoints}/{maxPoints} ({scorePercent}%)</p>
              <p><span className="text-blue-800 font-bold">Remarks:</span> &ldquo;{instructorComments}&rdquo;</p>
              <p><span className="text-blue-800 font-bold">Action:</span> {getPerformanceFeedback()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 3. CURRICULUM BLUEPRINT GRID
// ==========================================
interface WeekNode {
  week: number;
  topic: string;
  objective: string;
  learningMedia: string;
  assessment: string;
  theoryAlignment: string;
}

const curriculumWeeks: WeekNode[] = [
  {
    week: 1,
    topic: "Introduction to Pediatric Patient Assessment",
    objective: "Contrast anatomical & physiological differences between infants, young children, and adults during physical assessment.",
    learningMedia: "3D Pediatric Skeleton Models, Interactive Video Lectures with embedded recall quizzes.",
    assessment: "Formative: Online Drag-and-Drop anatomical alignment challenge.",
    theoryAlignment: "Contrast (CARP) - Clear anatomical labeling; Cognitive Load Theory."
  },
  {
    week: 3,
    topic: "Airway and Oxygenation Management in Pediatrics",
    objective: "Assess signs of respiratory distress in pediatric patients and demonstrate bag-mask ventilation techniques.",
    learningMedia: "Step-by-step video analysis, interactive flow-diagram tool showing ventilation volumes.",
    assessment: "Diagnostic checklist; peer-evaluation review using clinical simulations.",
    theoryAlignment: "Proximity (CARP) - Visual alignment of ventilation metrics next to lung visuals."
  },
  {
    week: 5,
    topic: "Critical Medication Dosage Calculations",
    objective: "Calculate weight-based pediatric dosages flawlessly, identifying potential over-prescription hazards.",
    learningMedia: "Interactive weight slider app that dynamically shows clinical volume calculations.",
    assessment: "Summative: Automated math test where students must achieve a 100% safety score to pass.",
    theoryAlignment: "Repetition - Repeated structural calculation models; Ausubel's Meaningful Learning."
  },
  {
    week: 8,
    topic: "Pediatric Resuscitation & Emergency Protocols",
    objective: "Coordinate a simulated high-fidelity pediatric basic life support emergency scenario, performing AHA sequence steps.",
    learningMedia: "Active Branching CPR scenario sandbox (as featured in this portfolio).",
    assessment: "Interactive CPR Simulator scoring performance + qualitative clinical preceptor audit.",
    theoryAlignment: "Gagne's 9 Events (Eliciting Performance & Providing Feedback)."
  },
  {
    week: 12,
    topic: "Family-Centered Pediatric Clinical Care",
    objective: "Formulate nursing care discharge education plans that actively engage diverse parental custodians.",
    learningMedia: "Role-play simulation recordings, and digital brochures styled using visual design principles.",
    assessment: "Portfolio artifact review of parent educational brochure designed on Canva/Weebly.",
    theoryAlignment: "Constructive Alignment (Biggs) - Aligning final practice to maternal-child societal outcomes."
  }
];

export function CurriculumBlueprint() {
  const [selectedWeekIdx, setSelectedWeekIdx] = useState<number>(0);

  const selectedWeek = curriculumWeeks[selectedWeekIdx];

  return (
    <div className="card-clean overflow-hidden">
      {/* Blueprint Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2.5">
          <Calendar className="h-5 w-5 text-blue-200" />
          <h3 className="font-semibold tracking-tight text-base">12-Week Hybrid Curriculum Grid</h3>
        </div>
        <span className="bg-white/20 text-white px-2.5 py-0.5 rounded text-xs font-mono font-medium">
          UDL Blueprint
        </span>
      </div>

      <div className="p-6 space-y-6">
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
          Select a week node below to inspect learning objectives, media tools, and constructive assessments.
        </p>

        {/* Timeline navigation */}
        <div className="flex border-b border-slate-200 pb-4 overflow-x-auto gap-2">
          {curriculumWeeks.map((wk, idx) => (
            <button
              key={wk.week}
              id={`curriculum-week-${wk.week}`}
              onClick={() => setSelectedWeekIdx(idx)}
              className={`px-4 py-2 text-xs font-mono font-bold rounded-xl shrink-0 transition-all cursor-pointer ${
                selectedWeekIdx === idx
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Week {wk.week}
            </button>
          ))}
        </div>

        {/* Week Details Card */}
        <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
          <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-3">
            <div>
              <span className="text-[10px] font-bold text-blue-600 font-mono uppercase tracking-widest">
                MODULE WEEK {selectedWeek.week} FOCUS
              </span>
              <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5">{selectedWeek.topic}</h4>
            </div>
            <div className="h-9 w-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-xs">
              W{selectedWeek.week}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Terminal Objective */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold uppercase font-mono tracking-wider">
                <BookOpen className="h-3.5 w-3.5 text-blue-600" />
                Terminal Objective
              </div>
              <p className="text-slate-600 leading-relaxed pl-5">
                {selectedWeek.objective}
              </p>
            </div>

            {/* Educational Learning Media */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold uppercase font-mono tracking-wider">
                <Layers className="h-3.5 w-3.5 text-blue-600" />
                Instructional Media
              </div>
              <p className="text-slate-600 leading-relaxed pl-5">
                {selectedWeek.learningMedia}
              </p>
            </div>

            {/* Assessments */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold uppercase font-mono tracking-wider">
                <CheckCircle className="h-3.5 w-3.5 text-blue-600" />
                Constructive Assessment
              </div>
              <p className="text-slate-600 leading-relaxed pl-5">
                {selectedWeek.assessment}
              </p>
            </div>

            {/* Design & Theory Alignment */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-900 font-bold uppercase font-mono tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                Pedagogical Rationale
              </div>
              <p className="text-blue-800 font-medium leading-relaxed pl-5 font-mono text-[11px]">
                {selectedWeek.theoryAlignment}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
