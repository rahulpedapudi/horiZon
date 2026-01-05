import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Lock, PlayCircle, ChevronDown, ChevronRight, Circle } from 'lucide-react';

export const InteractiveTimeline = ({ phases, onSkillClick, onToggleSkill }) => {
    return (
        <div className="max-w-4xl mx-auto pl-4 md:pl-0">
            <div className="relative border-l-2 border-gray-200 dark:border-gray-800 space-y-8 pb-20">
                {phases.map((phase, index) => (
                    <TimelinePhase
                        key={phase.id}
                        phase={phase}
                        index={index}
                        onSkillClick={onSkillClick}
                        onToggleSkill={onToggleSkill}
                    />
                ))}
            </div>
        </div>
    );
};

const TimelinePhase = ({ phase, index, onSkillClick, onToggleSkill }) => {
    const [isOpen, setIsOpen] = useState(index === 0 || phase.status === 'in-progress');

    const statusColors = {
        completed: 'bg-green-500 border-green-500 text-white',
        'in-progress': 'bg-blue-600 border-blue-600 text-white',
        'not-started': 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400',
        locked: 'bg-gray-200 dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-400'
    };

    return (
        <div className="relative pl-8 md:pl-12">
            {/* Connector Dot */}
            <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${statusColors[phase.status].split(' ')[1]} bg-white dark:bg-gray-900 z-10 transition-colors duration-500`} />

            {/* Phase Header */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`group cursor-pointer mb-4 p-4 rounded-xl border transition-all ${phase.status === 'locked' ? 'opacity-60 grayscale' : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 hover:shadow-md'}`}
            >
                <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded uppercase ${phase.status === 'completed' ? 'bg-green-100 text-green-700' : phase.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'}`}>
                                {phase.status === 'not-started' ? 'To Do' : phase.status}
                            </span>
                            <span className="text-xs text-gray-500">{phase.timeRange}</span>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                            {phase.title}
                            {phase.status === 'locked' && <Lock size={14} />}
                        </h3>
                    </div>
                    <ChevronDown className={`transform transition-transform text-gray-400 ${isOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Progress Bar (Mini) */}
                <div className="mt-3 w-full bg-gray-100 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${phase.progress}%` }} />
                </div>
            </div>

            {/* Skills Grid (Collapsible) */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden"
                    >
                        {phase.skills.map((skill) => (
                            <SkillCard
                                key={skill.id}
                                skill={skill}
                                onClick={() => onSkillClick(skill)}
                                onToggle={() => onToggleSkill && onToggleSkill(phase.id, skill.id)}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SkillCard = ({ skill, onClick, onToggle }) => {

    // Stop propagation to prevent opening the modal when clicking the icon
    const handleIconClick = (e) => {
        e.stopPropagation();
        if (skill.status !== 'locked') {
            onToggle();
        }
    };

    const icons = {
        completed: <CheckCircle2 size={24} className="text-green-500 fill-green-50" />,
        'in-progress': <PlayCircle size={24} className="text-blue-500 fill-blue-50" />,
        'not-started': <Circle size={24} className="text-gray-300 hover:text-gray-400" />,
        locked: <Lock size={20} className="text-gray-300" />
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={`p-4 rounded-xl border cursor-pointer flex flex-col justify-between h-full bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800 shadow-sm hover:border-blue-500 dark:hover:border-blue-500 transition-colors ${skill.status === 'locked' ? 'opacity-50 pointer-events-none' : ''}`}
        >
            <div>
                <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{skill.name}</span>

                    {/* Interactive Icon Area */}
                    <div
                        onClick={handleIconClick}
                        className={`p-1 -mr-1 -mt-1 rounded-full transition-all hover:bg-gray-50 dark:hover:bg-gray-800 ${skill.status === 'locked' ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-110 active:scale-95'}`}
                        title={skill.status === 'completed' ? "Mark as incomplete" : "Mark as complete"}
                    >
                        {icons[skill.status]}
                    </div>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{skill.description}</p>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                    {/* Fake avatars for "Learners" social proof */}
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[8px] text-gray-500 font-bold">
                            {String.fromCharCode(64 + i)}
                        </div>
                    ))}
                </div>
                <span className="text-xs text-blue-600 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Details <ChevronRight size={12} />
                </span>
            </div>
        </motion.div>
    );
};
