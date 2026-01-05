import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  GraduationCap,
  TrendingUp,
  Building2,
  RefreshCcw,
  BrainCircuit,
  X,
  Plus,
  Zap,
  BookOpen,
} from "lucide-react";
import { submitOnboarding } from "../services/agentApi";

// --- Configuration for Role-Based Flows ---

const ROLES = [
  {
    id: "student",
    label: "Student",
    icon: GraduationCap,
    description: "I'm currently studying.",
  },
  {
    id: "trader",
    label: "Trader / Investor",
    icon: TrendingUp,
    description: "I trade or invest in markets.",
  },
  {
    id: "business",
    label: "Business / Startup",
    icon: Building2,
    description: "I run or plan to start a business.",
  },
  {
    id: "career_switcher",
    label: "Career Switcher",
    icon: RefreshCcw,
    description: "I'm looking to pivot my career.",
  },
  {
    id: "learner",
    label: "Lifelong Learner",
    icon: BrainCircuit,
    description: "I learn for personal growth.",
  },
];

const EXPOSURE_LEVELS = [
  "Just exploring / no hands-on experience",
  "Learned basics (courses, tutorials)",
  "Built small projects",
  "Built multiple projects",
  "Professional / real-world experience",
];

const CURIOSITY_SUGGESTIONS = [
  "AI",
  "Machine Learning",
  "Web3",
  "Cybersecurity",
  "Robotics",
  "Data Science",
  "Cloud Computing",
];

const LEARNING_PREFS = [
  "Project-based learning",
  "Visual explanations (diagrams, videos)",
  "Step-by-step structured paths",
  "Theory-first, then practice",
  "Hands-on experiments",
  "Case studies / real-world examples",
];

// Common steps to append to all flows
const COMMON_POST_STEPS = [
  {
    id: "curiosity",
    title: "What are you curious about?",
    subtitle: "Topics you want to explore now or in the future",
    type: "curiosity", // Custom type for this new screen
    suggestions: CURIOSITY_SUGGESTIONS,
  },
  {
    id: "learning_preferences",
    title: "How do you prefer to learn?",
    subtitle: "We'll adapt content to your style",
    type: "preferences", // Custom type for multi-select + text
    options: LEARNING_PREFS,
  },
];

const FLOWS = {
  student: {
    steps: [
      {
        id: "education_type",
        title: "Education Type",
        subtitle: "What are you currently pursuing?",
        type: "single",
        options: [
          "Engineering",
          "Medical (MBBS / Allied)",
          "Science / Arts / Commerce",
          "Government Exam Aspirant",
          "Other",
        ],
        customOption: true,
      },
      {
        id: "branch",
        title: "Branch / Specialization",
        subtitle: "Which field are you in?",
        type: "single",
        condition: (data) => data.education_type === "Engineering",
        options: [
          "CSE / IT",
          "ECE",
          "EEE",
          "Mechanical",
          "Civil",
          "Chemical",
          "Other",
        ],
      },
      {
        id: "skills",
        title: "Skills & Experience",
        subtitle: "What are your key skills?",
        type: "skills_with_exposure", // Modified type
        suggestions: [
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "Python",
          "Java",
          "DSA",
          "ML",
          "Cloud",
        ],
      },
    ],
  },
  trader: {
    steps: [
      {
        id: "market_type",
        title: "Market Preference",
        subtitle: "Which markets do you trade?",
        type: "single",
        options: [
          "Stock Market",
          "Crypto",
          "Forex",
          "Commodities",
          "Long-term Investing",
        ],
      },
      {
        id: "experience",
        title: "Experience Level",
        subtitle: "How varied is your portfolio?",
        type: "single",
        options: ["Beginner", "Intermediate", "Advanced"],
      },
      {
        id: "knowledge_areas",
        title: "Knowledge Areas",
        subtitle: "What do you know or want to learn?",
        type: "skills_with_exposure", // Using same component for consistency if applicable, or fallback to chips
        suggestions: [
          "Technical Analysis",
          "Risk Management",
          "Options",
          "Macro Economics",
          "Psychology",
        ],
      },
      {
        id: "trading_goal",
        title: "Trading Goal",
        subtitle: "What are you aiming for?",
        type: "single",
        options: [
          "Side income",
          "Full-time trading",
          "Long-term wealth",
          "Knowledge mastery",
        ],
      },
    ],
  },
  business: {
    steps: [
      {
        id: "stage",
        title: "Business Stage",
        subtitle: "Where is your venture currently?",
        type: "single",
        options: [
          "Idea stage",
          "Early startup",
          "Running business",
          "Aspiring entrepreneur",
        ],
      },
      {
        id: "domain",
        title: "Business Domain",
        subtitle: "What industry are you in?",
        type: "single",
        options: [
          "Tech / SaaS",
          "E-commerce",
          "Local business",
          "Manufacturing",
          "Services",
          "Creator economy",
        ],
      },
      {
        id: "skill_stack",
        title: "Skill Stack",
        subtitle: "Key areas of expertise",
        type: "skills_with_exposure",
        suggestions: [
          "Marketing",
          "Sales",
          "Finance",
          "Product",
          "Operations",
          "Leadership",
          "AI",
          "Automation",
        ],
      },
      {
        id: "time_horizon",
        title: "Time Horizon",
        subtitle: "What is your vision timeline?",
        type: "single",
        options: ["1 year growth", "3 year scale", "5+ year vision"],
      },
    ],
  },
  career_switcher: {
    steps: [
      {
        id: "current_background",
        title: "Current Background",
        subtitle: "Where are you pivoting from?",
        type: "single",
        options: [
          "Engineering",
          "Non-Engineering",
          "Commerce",
          "Arts",
          "Other",
        ],
      },
      {
        id: "target_direction",
        title: "Target Direction",
        subtitle: "Where do you want to go?",
        type: "single",
        options: ["Tech", "Business", "Research", "Government", "Hybrid"],
      },
      {
        id: "transferable_skills",
        title: "Transferable Skills",
        subtitle: "Skills you bring with you",
        type: "skills_with_exposure",
        suggestions: [
          "Communication",
          "Analysis",
          "Coding",
          "Management",
          "Domain knowledge",
        ],
      },
    ],
  },
  learner: {
    steps: [
      {
        id: "learning_style",
        title: "Learning Style",
        subtitle: "How do you prefer to learn?",
        type: "single",
        options: ["Structured", "Exploration-based", "Research-driven"],
      },
      {
        id: "interest_domains",
        title: "Interest Domains",
        subtitle: "Topics that excite you",
        type: "skills_with_exposure", // Adapted to use exposure for depth
        suggestions: [
          "AI",
          "Technology",
          "Economics",
          "Psychology",
          "Science",
          "Philosophy",
        ],
      },
    ],
  },
};

const Onboarding = () => {
  const { user, completeOnboarding } = useAuth();
  const navigate = useNavigate();

  // State
  const [step, setStep] = useState(1);
  const [role, setRole] = useState("");
  const [formData, setFormData] = useState({});
  const [customInput, setCustomInput] = useState("");
  const [chipInput, setChipInput] = useState("");
  const [otherPrefs, setOtherPrefs] = useState("");

  // Get current flow configuration
  const currentFlow = role ? FLOWS[role] : null;

  // Combine role steps with common steps
  const getActiveFlowSteps = () => {
    if (!currentFlow) return [];
    // Filter condition steps first
    const roleSteps = currentFlow.steps.filter((s) =>
      s.condition ? s.condition(formData) : true
    );
    // Append common steps (Curiosity -> Preferences)
    return [...roleSteps, ...COMMON_POST_STEPS];
  };

  const activeFlowSteps = getActiveFlowSteps();
  const totalSteps = 1 + activeFlowSteps.length + 1; // Role + Flow + Summary

  // Helper: Update Form Data
  const updateData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleMulti = (key, value) => {
    setFormData((prev) => {
      const list = prev[key] || [];
      if (list.includes(value)) {
        return { ...prev, [key]: list.filter((item) => item !== value) };
      }
      return { ...prev, [key]: [...list, value] };
    });
  };

  // Chips Logic
  const addChip = (key, value) => {
    if (!value.trim()) return;
    const cleanValue = value.trim();
    setFormData((prev) => {
      const list = prev[key] || [];
      if (!list.includes(cleanValue)) {
        return { ...prev, [key]: [...list, cleanValue] };
      }
      return prev;
    });
    setChipInput("");
  };

  const removeChip = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((item) => item !== value),
    }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleFinish = async () => {
    // Include other preferences text if exists
    const finalData = {
      role,
      ...formData,
      learning_preferences_extra: otherPrefs,
    };

    // Submit to Express backend (marks user as onboarded)
    const result = await completeOnboarding(finalData);
    if (result.success) {
      // Also submit to agent API for career guidance
      try {
        await submitOnboarding(user?.id || "anonymous", user?.name || "User", {
          // Send all collected fields
          exposure_level: formData.exposure_level,
          learning_preferences: formData.learning_preferences || [],
          interests: formData.curiosity || [], // Map curiosity topics to interests
        });
      } catch (err) {
        console.warn("Agent API submission failed:", err);
        // Continue anyway - Express onboarding succeeded
      }
      navigate("/");
    } else {
      console.error("Onboarding failed:", result.error);
    }
  };

  const handleSkip = async () => {
    const result = await completeOnboarding({ role: "learner", skipped: true });
    if (result.success) {
      navigate("/");
    }
  };

  // Render Logic
  const renderContent = () => {
    // Step 1: Role Selection
    if (step === 1) {
      return (
        <StepContainer
          step={1}
          total={totalSteps} // Estimate
          title="Which best describes you right now?"
          subtitle="This helps us personalize your experience.">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ROLES.map((r) => (
              <SelectionCard
                key={r.id}
                label={r.label}
                icon={r.icon}
                description={r.description}
                selected={role === r.id}
                onClick={() => setRole(r.id)}
              />
            ))}
          </div>
        </StepContainer>
      );
    }

    // Dynamic Steps
    const flowStepIndex = step - 2;
    if (flowStepIndex >= 0 && flowStepIndex < activeFlowSteps.length) {
      const config = activeFlowSteps[flowStepIndex];
      const dataKey = config.id;
      const value = formData[dataKey];

      // Special handling for Skills + Exposure
      if (config.type === "skills_with_exposure") {
        return (
          <StepContainer
            step={step}
            total={totalSteps}
            title={config.title}
            subtitle={config.subtitle}>
            {/* Skills Chips */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Top Skills
                </label>
                <ChipInput
                  value={value || []}
                  inputValue={chipInput}
                  setInputValue={setChipInput}
                  onAdd={(val) => addChip(dataKey, val)}
                  onRemove={(val) => removeChip(dataKey, val)}
                  suggestions={config.suggestions}
                />
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 dark:border-gray-800 my-6"></div>

              {/* Exposure Level - Mandatory */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Current Exposure Level <span className="text-red-500">*</span>
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  What best describes your hands-on experience in this field?
                </p>
                <div className="space-y-2">
                  {EXPOSURE_LEVELS.map((level) => (
                    <div
                      key={level}
                      onClick={() => updateData("exposure_level", level)}
                      className={`
                                   p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between
                                   ${
                                     formData.exposure_level === level
                                       ? "border-black dark:border-white bg-gray-50 dark:bg-gray-900"
                                       : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-900"
                                   }
                                 `}>
                      <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                        {level}
                      </span>
                      {formData.exposure_level === level && (
                        <div className="w-4 h-4 rounded-full bg-black dark:bg-white flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white dark:bg-black rounded-full" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </StepContainer>
        );
      }

      // Curiosity & Exploration
      if (config.type === "curiosity") {
        return (
          <StepContainer
            step={step}
            total={totalSteps}
            title={config.title}
            subtitle={config.subtitle}>
            <ChipInput
              value={value || []}
              inputValue={chipInput}
              setInputValue={setChipInput}
              onAdd={(val) => addChip(dataKey, val)}
              onRemove={(val) => removeChip(dataKey, val)}
              suggestions={config.suggestions}
              placeholder="Type a topic (e.g., Robotics)..."
            />
          </StepContainer>
        );
      }

      // Learning Preferences
      if (config.type === "preferences") {
        return (
          <StepContainer
            step={step}
            total={totalSteps}
            title={config.title}
            subtitle={config.subtitle}>
            <div className="grid gap-3">
              {config.options.map((opt) => (
                <SelectionCard
                  key={opt}
                  label={opt}
                  selected={(value || []).includes(opt)}
                  onClick={() => toggleMulti(dataKey, opt)}
                  multi
                />
              ))}
            </div>
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Anything else about how you learn best? (Optional)
              </label>
              <textarea
                rows={3}
                value={otherPrefs}
                onChange={(e) => setOtherPrefs(e.target.value)}
                className="w-full p-3 border rounded-xl dark:bg-gray-900 dark:border-gray-700 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all text-sm"
                placeholder="e.g. I prefer dark mode and short sessions..."
              />
            </div>
          </StepContainer>
        );
      }

      // Standard Single/Multi Selection
      return (
        <StepContainer
          step={step}
          total={totalSteps}
          title={config.title}
          subtitle={config.subtitle}>
          {(config.type === "single" || config.type === "multi") && (
            <div className="space-y-4">
              <div className="grid gap-3">
                {config.options.map((opt) => (
                  <SelectionCard
                    key={opt}
                    label={opt}
                    selected={
                      config.type === "multi"
                        ? (value || []).includes(opt)
                        : value === opt
                    }
                    onClick={() => {
                      if (config.type === "multi") toggleMulti(dataKey, opt);
                      else updateData(dataKey, opt);
                    }}
                    multi={config.type === "multi"}
                  />
                ))}
              </div>
              {config.customOption && value === "Other" && (
                <input
                  type="text"
                  placeholder="Please specify..."
                  className="w-full p-3 border rounded-xl dark:bg-gray-900 dark:border-gray-700 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
                  value={customInput}
                  onChange={(e) => {
                    setCustomInput(e.target.value);
                    updateData(`${dataKey}_custom`, e.target.value);
                  }}
                />
              )}
            </div>
          )}

          {config.type === "chips" && (
            <ChipInput
              value={value || []}
              inputValue={chipInput}
              setInputValue={setChipInput}
              onAdd={(val) => addChip(dataKey, val)}
              onRemove={(val) => removeChip(dataKey, val)}
              suggestions={config.suggestions}
            />
          )}
        </StepContainer>
      );
    }

    // Final Step: Summary
    if (step === totalSteps) {
      return (
        <div className="animate-fade-in max-w-lg mx-auto text-center space-y-8 py-10">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
            <Check size={40} className="text-green-600 dark:text-green-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              You're ready for Horizon
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Here is your setup profile.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 text-left space-y-4 border border-gray-200 dark:border-gray-700">
            <SummaryItem
              label="Role"
              value={ROLES.find((r) => r.id === role)?.label}
            />

            {activeFlowSteps.map((s) => (
              <SummaryItem
                key={s.id}
                label={s.title}
                value={formData[s.id]}
                isList={Array.isArray(formData[s.id])}
              />
            ))}

            <SummaryItem
              label="Exposure Level"
              value={formData.exposure_level}
            />
          </div>

          <button
            onClick={handleFinish}
            className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-xl text-lg hover:opacity-90 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
            Enter Horizon Dashboard <ArrowRight size={20} />
          </button>
        </div>
      );
    }

    return null;
  };

  // Determine if "Next" is allowed
  const isNextDisabled = () => {
    if (step === 1) return !role;
    const flowStepIndex = step - 2;
    if (flowStepIndex >= 0 && flowStepIndex < activeFlowSteps.length) {
      const config = activeFlowSteps[flowStepIndex];
      const val = formData[config.id];

      if (config.type === "skills_with_exposure") {
        const hasSkills = val && val.length > 0;
        const hasExposure = !!formData.exposure_level;
        return !(hasSkills && hasExposure);
      }
      if (
        config.type === "curiosity" ||
        config.type === "preferences" ||
        config.type === "multi"
      ) {
        // Optional?? Prompt says "Capture interest...". Usually multi-selects can be optional,
        // but "Mandatory selection before Next Step" was explicit for Exposure.
        // "Curiosity" purpose is to capture signals. If empty, maybe okay?
        // Let's require at least one for better personalization unless skipped.
        // "Learning Preferences" - usually good to have one.
        return !(val && val.length > 0);
      }
      return !val;
    }
    return false;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col font-sans text-gray-900 dark:text-white">
      {/* Header / Nav */}
      <div className="px-6 py-6 flex justify-between items-center max-w-5xl mx-auto w-full">
        <div className="flex gap-2">
          <div className="font-bold text-xl tracking-tight">Horizon.</div>
        </div>
        <button
          onClick={handleSkip}
          className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
          Skip Setup
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start pt-10 px-4 pb-20 overflow-y-auto">
        <div className="w-full max-w-2xl">
          {/* Progress Bar */}
          {step < totalSteps && (
            <div className="mb-10 flex gap-2 h-1.5 bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
              <div
                className="bg-black dark:bg-white transition-all duration-500 ease-out"
                style={{ width: `${(step / (totalSteps - 1)) * 100}%` }}
              />
            </div>
          )}

          {renderContent()}

          {/* Footer Nav */}
          {step < totalSteps && (
            <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-100 dark:border-gray-900">
              <button
                onClick={handleBack}
                disabled={step === 1}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-colors ${
                  step === 1
                    ? "invisible"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                }`}>
                <ArrowLeft size={18} /> Back
              </button>

              <button
                onClick={handleNext}
                disabled={isNextDisabled()}
                className="flex items-center gap-2 px-8 py-3 bg-black dark:bg-white text-white dark:text-black rounded-xl font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md">
                Next Step <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Sub Components ---

const StepContainer = ({ step, total, title, subtitle, children }) => (
  <div className="animate-slide-up">
    <span className="text-sm font-semibold text-gray-400 mb-2 block tracking-wide uppercase">
      Step {step} of {total - 1}
    </span>
    <h1 className="text-3xl md:text-4xl font-bold mb-3 tight-heading">
      {title}
    </h1>
    <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-lg">
      {subtitle}
    </p>
    {children}
  </div>
);

const SelectionCard = ({
  label,
  icon: Icon,
  description,
  selected,
  onClick,
  multi,
}) => (
  <div
    onClick={onClick}
    className={`
        group relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-4
        ${
          selected
            ? "border-black dark:border-white bg-gray-50 dark:bg-gray-900"
            : "border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 bg-white dark:bg-gray-950"
        }
      `}>
    {Icon && (
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
          selected
            ? "bg-black text-white dark:bg-white dark:text-black"
            : "bg-gray-100 dark:bg-gray-900 text-gray-500 group-hover:bg-gray-200 dark:group-hover:bg-gray-800"
        }`}>
        <Icon size={24} strokeWidth={1.5} />
      </div>
    )}
    <div className="flex-1">
      <h3
        className={`font-semibold text-lg ${
          selected
            ? "text-gray-900 dark:text-white"
            : "text-gray-700 dark:text-gray-300"
        }`}>
        {label}
      </h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
          {description}
        </p>
      )}
    </div>
    {selected && !multi && (
      <div className="absolute top-5 right-5 text-black dark:text-white">
        <Check size={20} strokeWidth={3} />
      </div>
    )}
    {multi && (
      <div
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
          selected
            ? "bg-black border-black dark:bg-white dark:border-white"
            : "border-gray-300 dark:border-gray-600"
        }`}>
        {selected && (
          <Check
            size={14}
            className="text-white dark:text-black"
            strokeWidth={3}
          />
        )}
      </div>
    )}
  </div>
);

const ChipInput = ({
  value,
  inputValue,
  setInputValue,
  onAdd,
  onRemove,
  suggestions,
  placeholder,
}) => (
  <div className="space-y-6">
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder || "Type and press Enter..."}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onAdd(inputValue);
          }
        }}
        className="w-full p-4 border rounded-xl dark:bg-gray-900 dark:border-gray-700 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
      />
      <div className="absolute right-3 top-3">
        <button
          onClick={() => onAdd(inputValue)}
          disabled={!inputValue.trim()}
          className="p-1 bg-black dark:bg-white text-white dark:text-black rounded-lg disabled:opacity-50">
          <Plus size={20} />
        </button>
      </div>
    </div>

    {suggestions && (
      <div className="flex flex-wrap gap-2">
        <span className="text-sm text-gray-500 py-1">Suggestions:</span>
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => onAdd(s)}
            className="text-sm px-3 py-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
            {s}
          </button>
        ))}
      </div>
    )}

    <div className="flex flex-wrap gap-2 mt-4">
      {value.map((chip) => (
        <div
          key={chip}
          className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-medium animate-fade-in">
          {chip}
          <button
            onClick={() => onRemove(chip)}
            className="hover:text-gray-300 dark:hover:text-gray-600">
            <X size={14} />
          </button>
        </div>
      ))}
      {value.length === 0 && (
        <p className="text-gray-400 text-sm italic">None added yet.</p>
      )}
    </div>
  </div>
);

const SummaryItem = ({ label, value, isList }) => {
  if (!value || (isList && value.length === 0)) return null;
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 gap-2">
      <span className="text-gray-500 dark:text-gray-400 font-medium">
        {label}
      </span>
      <span className="text-gray-900 dark:text-white font-semibold text-right max-w-xs break-words">
        {isList ? value.join(", ") : value}
      </span>
    </div>
  );
};

export default Onboarding;
