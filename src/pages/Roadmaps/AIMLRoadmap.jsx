import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { roadmapData } from '../../data/roadmapData';
import { IntelligencePanel } from '../../components/Roadmap/IntelligencePanel';
import { InteractiveTimeline } from '../../components/Roadmap/InteractiveTimeline';
import { SkillDetailModal } from '../../components/Roadmap/SkillDetailModal';

const AIMLRoadmap = () => {
    const [selectedSkill, setSelectedSkill] = useState(null);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-6 md:p-12 pb-32">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                        {roadmapData.title}
                    </h1>
                    <p className="text-lg text-gray-500 dark:text-gray-400">
                        Your personalized path to mastering Artificial Intelligence.
                    </p>
                </motion.div>

                {/* Intelligence Panel */}
                <IntelligencePanel data={roadmapData.intelligence} />

                {/* Main Roadmap Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Timeline (Left/Center) */}
                    <div className="lg:col-span-8">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Learning Path</h2>
                        <InteractiveTimeline phases={roadmapData.phases} onSkillClick={setSelectedSkill} />
                    </div>

                    {/* Sidebar / Sticky Summary (Right) */}
                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-10 space-y-6">
                            {/* Progress Card */}
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Overall Progress</h3>
                                <div className="relative w-40 h-40 mx-auto mb-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" className="text-gray-100 dark:text-gray-800" fill="none" />
                                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" className="text-blue-600" fill="none" strokeDasharray="440" strokeDashoffset={440 - (440 * 15) / 100} strokeLinecap="round" />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">15%</span>
                                        <span className="text-xs text-gray-500">Completed</span>
                                    </div>
                                </div>
                                <p className="text-center text-sm text-gray-500">
                                    You are ahead of schedule for "Math for ML". Keep it up!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skill Detail Modal */}
            {selectedSkill && (
                <SkillDetailModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />
            )}
        </div>
    );
};

export default AIMLRoadmap;
