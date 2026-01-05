import React, { useState } from 'react';
import { Check, Circle, Clock, Award } from 'lucide-react';

const Roadmap = () => {
  const [activeTab, setActiveTab] = useState('academic');

  return (
    <div className="max-w-5xl py-10 mx-auto px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">My Roadmaps</h1>
          <p className="text-gray-500 dark:text-gray-400">Your personalized learning path tailored for short-term and long-term goals.</p>
        </div>
        
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          {['academic', 'present', 'future'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                activeTab === tab 
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              {tab === 'present' ? 'Present Relevance' : tab === 'future' ? 'Future Ready' : tab}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        {/* Connection Line */}
        <div className="absolute left-8 top-4 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

        <div className="space-y-8 relative z-10">
          {roadmapData[activeTab].map((item, index) => (
            <TimelineItem key={index} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({ data }) => {
  const { title, difficulty, why, status, duration } = data;
  
  const statusColor = status === 'completed' ? 'bg-green-500' : status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-400';
  const statusIcon = status === 'completed' ? <Check size={16} /> : status === 'in-progress' ? <Circle size={16} className="fill-current" /> : <Clock size={16} />;

  return (
    <div className="flex gap-6 group">
      <div className={`mt-1 flex-shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center border-4 border-gray-50 dark:border-black transition-colors ${status === 'completed' ? 'bg-green-100 dark:bg-green-900/20' : status === 'in-progress' ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-100 dark:bg-gray-800'}`}>
        <div className={`w-10 h-10 rounded-full ${statusColor} text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform`}>
          {statusIcon}
        </div>
      </div>
      
      <div className="flex-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 rounded-2xl p-6 transition-all shadow-sm">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
          <span className={`text-xs px-2 py-1 rounded bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 ${
            difficulty === 'Hard' ? 'text-red-500' : difficulty === 'Medium' ? 'text-yellow-600 dark:text-yellow-400' : 'text-green-600 dark:text-green-400'
          }`}>
            {difficulty}
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{why}</p>
        
        <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <Clock size={14} /> {duration}
          </span>
          {status === 'completed' && (
             <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
               <Award size={14} /> Earned Badge
             </span>
          )}
        </div>
      </div>
    </div>
  );
};

const roadmapData = {
  academic: [
    { title: "Data Structures & Algorithms", difficulty: "Hard", why: "Foundational for all efficient software systems.", status: "completed", duration: "8 Weeks" },
    { title: "Operating Systems", difficulty: "Medium", why: "Understanding process management and concurrency.", status: "in-progress", duration: "6 Weeks" },
    { title: "Database Management Systems", difficulty: "Medium", why: "Core skill for handling data persistence.", status: "pending", duration: "5 Weeks" },
  ],
  present: [
    { title: "React.js & Modern Frontend", difficulty: "Medium", why: "Industry standard for building interactive UIs.", status: "completed", duration: "4 Weeks" },
    { title: "Node.js Backend", difficulty: "Medium", why: "Enable full-stack development capabilities.", status: "in-progress", duration: "5 Weeks" },
    { title: "Cloud Deployment (AWS)", difficulty: "Hard", why: "Deploying applications for real-world usage.", status: "pending", duration: "3 Weeks" },
  ],
  future: [
    { title: "Generative AI Integration", difficulty: "Advanced", why: "Building applications that leverage LLMs.", status: "pending", duration: "6 Weeks" },
    { title: "Quantum Computing Basics", difficulty: "Advanced", why: "Preparing for the next major shift in computing power.", status: "pending", duration: "4 Weeks" },
    { title: "Web3 & Decentralized Id", difficulty: "Hard", why: "Future of digital identity and trust.", status: "pending", duration: "3 Weeks" },
  ]
}

export default Roadmap;
