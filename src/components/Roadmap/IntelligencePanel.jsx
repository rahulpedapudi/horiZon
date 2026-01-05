import React from 'react';
import { motion } from 'framer-motion';
import { Target, Zap, AlertTriangle, TrendingUp, ChevronRight } from 'lucide-react';

export const IntelligencePanel = ({ data }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

            {/* Card 1: Current Direction */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full" />
                <div className="flex items-center gap-2 mb-4 text-blue-600 dark:text-blue-400 font-semibold tracking-wide text-sm uppercase">
                    <Target size={16} /> Current Direction
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{data.currentDirection.primaryRole}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Secondary: {data.currentDirection.secondaryRoles.join(", ")}</p>

                <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" className="text-gray-200 dark:text-gray-800" fill="none" />
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" className="text-blue-500" fill="none" strokeDasharray="175" strokeDashoffset={175 - (175 * data.currentDirection.matchScore) / 100} />
                        </svg>
                        <span className="absolute text-sm font-bold text-gray-800 dark:text-white">{data.currentDirection.matchScore}%</span>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Skill Match</div>
                        <div className="text-xs text-gray-500">Based on your history</div>
                    </div>
                </div>
            </motion.div>

            {/* Card 2: Immediate Focus */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative bg-gradient-to-br from-indigo-600 to-violet-700 rounded-2xl p-6 text-white shadow-lg overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-bl-full blur-2xl" />
                <div className="flex items-center gap-2 mb-4 text-indigo-100 font-semibold tracking-wide text-sm uppercase">
                    <Zap size={16} /> Immediate Focus
                </div>

                <div className="mb-6">
                    <h3 className="text-3xl font-bold mb-2">{data.immediateFocus.skill}</h3>
                    <p className="text-indigo-200 text-sm">{data.immediateFocus.reason}</p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-xs bg-white/20 px-3 py-1 rounded-full">{data.immediateFocus.timeWindow}</div>
                    <button className="flex items-center gap-2 text-sm font-bold bg-white text-indigo-600 px-4 py-2 rounded-lg hover:bg-indigo-50 transition-colors">
                        Start Skill <ChevronRight size={16} />
                    </button>
                </div>
            </motion.div>

            {/* Card 3: Blocking Gaps */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-lg"
            >
                <div className="flex items-center gap-2 mb-4 text-orange-600 dark:text-orange-500 font-semibold tracking-wide text-sm uppercase">
                    <AlertTriangle size={16} /> Blocking Gaps
                </div>

                <div className="space-y-4">
                    {data.blockingGaps.map((gap, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-l-4 border-orange-500">
                            <span className="font-medium text-gray-800 dark:text-gray-200">{gap.skill}</span>
                            <span className={`text-xs px-2 py-1 rounded font-bold ${gap.impact === 'High' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' : 'bg-orange-100 text-orange-700'}`}>
                                {gap.impact} Impact
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>

        </div>
    );
};
