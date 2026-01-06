import React, { useState } from 'react';
import { CheckCircle, AlertCircle, BarChart2, ArrowRight, Loader2, BookOpen } from 'lucide-react';

import { staticAssessmentData } from '../data/staticAssessmentData';

const AssessMyKnowledge = () => {
  const [step, setStep] = useState(1); // 1: Select, 2: Generating Qs, 3: Answering, 4: Evaluating, 5: Results/Roadmap
  const [domain, setDomain] = useState('');
  const [level, setLevel] = useState('');
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [roadmap, setRoadmap] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [error, setError] = useState('');

  const domains = [
    "Full Stack Development", "Data Science & AI", "Cloud Computing",
    "Cybersecurity", "Core - Mechanical", "Core - Civil", "Government - UPSC/SSC"
  ];
  const levels = ["Beginner", "Intermediate", "Advanced"];



  // Phase 1: Get Questions (Static)
  const handleStart = async () => {
    if (!domain || !level) return;
    setStep(2);
    setLoadingMsg(`Generating ${level} questions for ${domain}...`);
    setError('');

    // Simulate AI delay
    setTimeout(() => {
      // Fallback to "Full Stack" if domain not found in demo data
      const targetDomain = staticAssessmentData.questions[domain] ? domain : "Full Stack Development";
      const data = staticAssessmentData.questions[targetDomain][level] || staticAssessmentData.questions[targetDomain]["Beginner"];

      setQuestions(data);
      setStep(3);
    }, 1500);
  };

  const handleAnswer = (qId, optionKey) => {
    setAnswers(prev => ({ ...prev, [qId]: optionKey }));
  };

  // Phase 3 & 4: Evaluate and Roadmap (Static)
  const handleSubmit = async () => {
    setStep(4);
    setLoadingMsg('Evaluating your answers...');
    setError('');

    setTimeout(() => {
      // 1. Calculate Score
      let correctCount = 0;
      questions.forEach(q => {
        if (answers[q.id] === q.correctAnswer) correctCount++;
      });
      const score = Math.round((correctCount / questions.length) * 100);

      // 2. Generate Static Analysis
      const analysisData = {
        analysis: {
          "Overall Knowledge": score,
          "Technical accuracy": score > 80 ? 90 : score + 5,
          [questions[0].skill]: score // Just mapping first skill for demo effect
        }
      };
      setAnalysis(analysisData);

      // 3. Generate Roadmap
      setLoadingMsg('Generating personalized roadmap...');

      setTimeout(() => {
        // Fallback to generic roadmap if domain specific one is missing
        const targetDomain = staticAssessmentData.roadmaps[domain] ? domain : "Full Stack Development";
        const roadmapData = {
          recommended_next_step: score > 70 ? "Advance to Senior Projects" : "Focus on Core Fundamentals",
          roadmap: staticAssessmentData.roadmaps[targetDomain]
        };
        setRoadmap(roadmapData);
        setStep(5);
      }, 1500);

    }, 2000);
  };

  const getColor = (score) => {
    if (score >= 70) return "text-green-600 dark:text-green-400";
    if (score >= 50) return "text-blue-600 dark:text-blue-400";
    if (score >= 30) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getProgressColor = (score) => {
    if (score >= 70) return "bg-green-500";
    if (score >= 50) return "bg-blue-500";
    if (score >= 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:px-0">
      <h1 className="text-3xl font-semibold mb-2 text-gray-900 dark:text-white">Assess My Knowledge</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">AI-Powered Skill Evaluation & Roadmap Generator</p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle size={20} />
          {error}
        </div>
      )}

      {/* Step 1: Selection */}
      {step === 1 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Select Domain</label>
              <div className="space-y-2">
                {domains.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDomain(d)}
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${domain === d
                      ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black'
                      : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Select Current Level</label>
                <div className="flex flex-col gap-3">
                  {levels.map((l) => (
                    <button
                      key={l}
                      onClick={() => setLevel(l)}
                      className={`px-4 py-3 rounded-xl border text-center transition-all ${level === l
                        ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black'
                        : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleStart}
                  disabled={!domain || !level}
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${domain && level
                    ? 'bg-black dark:bg-white hover:opacity-90 text-white dark:text-black shadow-lg'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  Start Assessment <ArrowRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading States */}
      {(step === 2 || step === 4) && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 text-center shadow-sm">
          <Loader2 size={48} className="mx-auto text-blue-600 animate-spin mb-6" />
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{loadingMsg}</h2>
          <p className="text-gray-500 dark:text-gray-400">Please wait while our AI engine processes your request.</p>
        </div>
      )}

      {/* Step 3: Questions */}
      {step === 3 && (
        <div className="space-y-6">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
              <div className="mb-4">
                <span className="text-xs font-bold px-2 py-1 bg-blue-100 text-blue-700 rounded mb-2 inline-block">Question {idx + 1}</span>
                <span className="text-xs font-medium text-gray-400 ml-2">{q.skills || q.skill}</span>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mt-1">{q.question}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {Object.entries(q.options).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => handleAnswer(q.id, key)}
                    className={`p-3 text-left rounded-lg border transition-all ${answers[q.id] === key
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500 ring-1 ring-blue-500'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                  >
                    <span className="font-bold mr-2">{key}.</span> {value}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length !== questions.length}
            className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all ${Object.keys(answers).length === questions.length
              ? 'bg-green-600 hover:bg-green-700 shadow-lg'
              : 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed'
              }`}
          >
            Submit Assessment
          </button>
        </div>
      )}

      {/* Step 5: Results */}
      {step === 5 && analysis && roadmap && (
        <div className="space-y-8 animate-fade-in">
          {/* Analysis Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skill Analysis</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {Object.entries(analysis.analysis).map(([skill, score]) => (
                <div key={skill} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">{skill}</h4>
                    <span className={`text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-900 font-medium ${getColor(score)}`}>
                      {score >= 70 ? 'Strong' : score >= 50 ? 'Good' : score >= 30 ? 'Needs Focus' : 'Weak'}
                    </span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">{score}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getProgressColor(score)}`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Roadmap Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="text-purple-600" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recommended Roadmap</h2>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/10 p-6 rounded-xl mb-6">
              <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-2">Next Step</h3>
              <p className="text-purple-700 dark:text-purple-300">{roadmap.recommended_next_step}</p>
            </div>

            <div className="space-y-4">
              {roadmap.roadmap.map((module, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-8 h-8 flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center font-bold text-gray-600 dark:text-gray-300">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{module.module}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 italic">Reason: {module.reason}</p>

                      <div className="grid sm:grid-cols-2 gap-2">
                        {module.topics.map((topic, tIdx) => (
                          <div key={tIdx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/50 px-3 py-2 rounded-lg">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            {topic}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center pt-8 pb-20">
            <button
              onClick={() => { setStep(1); setQuestions([]); setAnswers({}); setAnalysis(null); setRoadmap(null); }}
              className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              Start New Assessment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessMyKnowledge;
