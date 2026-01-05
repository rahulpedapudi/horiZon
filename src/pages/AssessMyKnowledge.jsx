import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle, BarChart2, ArrowRight } from 'lucide-react';

const AssessMyKnowledge = () => {
  const [step, setStep] = useState(1); // 1: Select, 2: Loading, 3: Results
  const [domain, setDomain] = useState('');
  const [level, setLevel] = useState('');
  const [progress, setProgress] = useState(0);

  const domains = [
    "Full Stack Development",
    "Data Science & AI",
    "Cloud Computing",
    "Cybersecurity",
    "Core - Mechanical",
    "Core - Civil",
    "Government - UPSC/SSC"
  ];

  const levels = ["Beginner", "Intermediate", "Advanced"];

  const handleStart = () => {
    if (!domain || !level) return;
    setStep(2);
    // Simulate loading
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      if (p > 100) {
        clearInterval(interval);
        setStep(3);
      } else {
        setProgress(p);
      }
    }, 100);
  };

  const mockResults = [
    { concept: "System Architecture", score: 85, status: "Strong", color: "text-green-600 dark:text-green-400" },
    { concept: "Database Normalization", score: 65, status: "Good", color: "text-blue-600 dark:text-blue-400" },
    { concept: "API Security", score: 40, status: "Needs Focus", color: "text-yellow-600 dark:text-yellow-400" },
    { concept: "Asynchronous Logic", score: 30, status: "Weak", color: "text-red-600 dark:text-red-400" }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 md:px-0">
      <h1 className="text-3xl font-semibold mb-2 text-gray-900 dark:text-white">Assess My Knowledge</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Evaluate your current standing to get a personalized roadmap.</p>

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
                    className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                      domain === d 
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
                      className={`px-4 py-3 rounded-xl border text-center transition-all ${
                        level === l 
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
                  className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
                    domain && level
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

      {step === 2 && (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-200 dark:border-gray-700 text-center shadow-sm">
          <div className="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6">
            <BarChart2 size={40} className="text-gray-900 dark:text-white animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Analyzing Your Profile...</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">We are generating a concept map based on {domain} ({level})...</p>
          
          <div className="max-w-md mx-auto h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-black dark:bg-white transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-6 animate-fade-in">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full">
              <CheckCircle size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Assessment Complete</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Based on your responses, here is your knowledge graph.</p>
            </div>
            <button 
              onClick={() => setStep(1)} 
              className="ml-auto text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white underline"
            >
              Retake
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {mockResults.map((item, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-gray-100">{item.concept}</h4>
                  <span className={`text-sm px-2 py-1 rounded bg-gray-100 dark:bg-gray-900 ${item.color} font-medium`}>
                    {item.status}
                  </span>
                </div>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">{item.score}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.score > 70 ? 'bg-green-500' : item.score > 40 ? 'bg-blue-500' : 'bg-red-500'}`} 
                    style={{ width: `${item.score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 bg-gray-50 dark:bg-gray-800/30 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-center">
             <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Recommended Next Step</h3>
             <p className="text-gray-500 dark:text-gray-400 mb-4">Based on your weak areas in "Asynchronous Logic", we recommend starting the **Advanced Javascript Patterns** module.</p>
             <button className="px-6 py-2 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black rounded-lg transition-colors font-medium">
               View Recommended Roadmap
             </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessMyKnowledge;
