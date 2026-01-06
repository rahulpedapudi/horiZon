import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Play, CheckCircle, Clock } from 'lucide-react';

export const SkillDetailModal = ({ skill, onClose, onToggle }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'resources', label: 'Resources' },
        { id: 'practice', label: 'Practice' },
        { id: 'tracking', label: 'Tracking' }
    ];

    const handleToggle = () => {
        if (onToggle) {
            onToggle(skill);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{skill.name}</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{skill.description}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex px-6 border-b border-gray-100 dark:border-gray-800">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content Body */}
                    <div className="p-6 min-h-[300px] overflow-y-auto">
                        {activeTab === 'overview' && (
                            <div className="space-y-4">
                                <h3 className="font-semibold text-gray-900 dark:text-white">Why this matters</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                    Mastering {skill.name} is crucial for AI engineers because it forms the backbone of... (Content would be dynamic based on skill data).
                                </p>
                            </div>
                        )}

                        {activeTab === 'resources' && (
                            <div className="space-y-3">
                                {skill.resources?.map((res, idx) => (
                                    <a key={idx} href={res.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/10 group transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded bg-white dark:bg-gray-700 text-blue-500`}>
                                                {res.type === 'video' ? <Play size={16} /> : <ExternalLink size={16} />}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white text-sm">{res.title}</div>
                                                <div className="text-xs text-gray-500">{res.level}</div>
                                            </div>
                                        </div>
                                        <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-500" />
                                    </a>
                                ))}
                            </div>
                        )}

                        {activeTab === 'practice' && (
                            <div className="space-y-3">
                                {skill.practice?.map((task, idx) => {
                                    const isObject = typeof task === 'object' && task !== null;
                                    const taskText = isObject ? task.text : task;
                                    const taskLink = isObject ? task.link : null;

                                    return (
                                        <div key={idx} className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg group">
                                            <input type="checkbox" className="mt-1 rounded text-blue-600 focus:ring-blue-500" />
                                            <div className="flex-1">
                                                <label className="text-sm text-gray-700 dark:text-gray-300 block">{taskText}</label>
                                                {taskLink && (
                                                    <a
                                                        href={taskLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 mt-1 font-medium bg-blue-50 dark:bg-blue-900/10 px-2 py-0.5 rounded transition-colors"
                                                    >
                                                        Start Practice <ExternalLink size={10} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {activeTab === 'tracking' && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confidence Level</label>
                                    <input type="range" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                                        <span>Low</span>
                                        <span>Medium</span>
                                        <span>High</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                                    <div className="flex items-center gap-3">
                                        <Clock size={20} className="text-blue-600 dark:text-blue-400" />
                                        <span className="font-medium text-blue-900 dark:text-blue-100">Time Spent</span>
                                    </div>
                                    <span className="text-xl font-bold text-blue-700 dark:text-blue-300">4.5h</span>
                                </div>
                                <button
                                    onClick={handleToggle}
                                    className={`w-full py-2.5 rounded-lg font-bold transition-all ${skill.status === 'completed'
                                        ? 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400'
                                        : 'bg-black dark:bg-white text-white dark:text-black hover:opacity-90'
                                        }`}
                                >
                                    {skill.status === 'completed' ? 'Mark as Incomplete' : 'Mark as Completed'}
                                </button>
                            </div>
                        )}
                    </div>

                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
