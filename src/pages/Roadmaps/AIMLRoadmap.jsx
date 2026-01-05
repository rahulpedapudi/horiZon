import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { roadmapData as initialData } from '../../data/roadmapData';
import { IntelligencePanel } from '../../components/Roadmap/IntelligencePanel';
import { InteractiveTimeline } from '../../components/Roadmap/InteractiveTimeline';
import { SkillDetailModal } from '../../components/Roadmap/SkillDetailModal';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Utility to calculate phase status and unlock next items
const calculateRoadmapState = (currentPhases) => {
    // Deep copy to avoid mutating state directly during calculation
    const phases = JSON.parse(JSON.stringify(currentPhases));

    for (let i = 0; i < phases.length; i++) {
        const phase = phases[i];

        // 1. Calculate Progress for this phase
        const totalSkills = phase.skills.length;
        const completedSkills = phase.skills.filter(s => s.status === 'completed').length;
        const progress = totalSkills === 0 ? 0 : Math.round((completedSkills / totalSkills) * 100);

        phase.progress = progress;

        // 2. Determine Phase Status (Internal)
        // If it was already unlocked, determine if it's now completed or in-progress
        if (phase.status !== 'locked') {
            if (progress === 100) {
                phase.status = 'completed';
            } else if (progress > 0) {
                phase.status = 'in-progress';
            } else {
                phase.status = 'not-started';
            }
        }

        // 3. Unlock Logic for CURRENT phase's skills
        // If the phase is unlocked, its skills should be unlockable (unless they were specifically locked by some other logic, but here we assume simplify: phase unlocked = skills unlocked)
        if (phase.status !== 'locked') {
            phase.skills.forEach(skill => {
                if (skill.status === 'locked') {
                    skill.status = 'not-started';
                }
            });
        }

        // 4. Unlock NEXT Phase
        // If this phase is completed, unlock the next one
        if (phase.status === 'completed' && i < phases.length - 1) {
            const nextPhase = phases[i + 1];
            if (nextPhase.status === 'locked') {
                nextPhase.status = 'not-started';
                // Also unlock skills for the next phase immediately
                nextPhase.skills.forEach(skill => {
                    skill.status = 'not-started';
                });
            }
        }
    }
    return phases;
};

const AIMLRoadmap = () => {
    const [selectedSkill, setSelectedSkill] = useState(null);
    const [roadmapState, setRoadmapState] = useState(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const saveTimeoutRef = useRef(null);

    // Fetch saved progress on mount
    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await fetch(`${API_URL}/api/user/profile`, { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();
                    if (data.profile && data.profile.roadmapProgress) {
                        const savedProgress = data.profile.roadmapProgress;

                        setRoadmapState(prev => {
                            const newPhases = JSON.parse(JSON.stringify(prev.phases));

                            // Apply saved statuses
                            newPhases.forEach(phase => {
                                phase.skills.forEach(skill => {
                                    if (savedProgress[skill.id] === 'completed') {
                                        skill.status = 'completed';
                                    }
                                });
                            });

                            // Recalculate based on loaded data
                            return { ...prev, phases: calculateRoadmapState(newPhases) };
                        });
                    }
                }
            } catch (error) {
                console.error("Failed to load roadmap progress:", error);
            }
        };

        fetchProgress();
    }, []);

    const saveToBackend = (phases) => {
        if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

        setIsSaving(true);
        saveTimeoutRef.current = setTimeout(async () => {
            const roadmapProgress = {};
            phases.forEach(p => p.skills.forEach(s => {
                if (s.status === 'completed') roadmapProgress[s.id] = 'completed';
            }));

            try {
                console.log("Saving to database..."); // User requested comment
                await fetch(`${API_URL}/api/user/roadmap`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ roadmapProgress })
                });
                setIsSaving(false);
            } catch (error) {
                console.error("Failed to save progress:", error);
                setIsSaving(false);
            }
        }, 1000);
    };

    const overallProgress = (() => {
        const allSkills = roadmapState.phases.flatMap(p => p.skills);
        const completed = allSkills.filter(s => s.status === 'completed').length;
        return allSkills.length === 0 ? 0 : Math.round((completed / allSkills.length) * 100);
    })();

    const handleToggleSkill = (phaseId, skillId) => {
        setRoadmapState(prevState => {
            // 1. Create a deep copy of phases
            const currentPhases = JSON.parse(JSON.stringify(prevState.phases));

            // 2. Find and toggle the specific skill
            const phase = currentPhases.find(p => p.id === phaseId);
            if (phase) {
                const skill = phase.skills.find(s => s.id === skillId);
                if (skill) {
                    const newStatus = skill.status === 'completed' ? 'not-started' : 'completed';
                    skill.status = newStatus;

                    // Update the modal's selected skill view if it matches
                    if (selectedSkill && selectedSkill.id === skillId) {
                        setSelectedSkill(prev => ({ ...prev, status: newStatus }));
                    }
                }
            }

            // 3. Recalculate everything (Ripple Effect)
            const updatedPhases = calculateRoadmapState(currentPhases);

            // Trigger save
            saveToBackend(updatedPhases);

            return { ...prevState, phases: updatedPhases };
        });
    };

    const handleModalToggle = (skill) => {
        // Find component phase
        const phase = roadmapState.phases.find(p => p.skills.some(s => s.id === skill.id));
        if (phase) {
            handleToggleSkill(phase.id, skill.id);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black p-6 md:p-12 pb-32">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 flex justify-between items-end"
                >
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
                            {roadmapState.title}
                        </h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400">
                            Your personalized path to mastering Artificial Intelligence.
                        </p>
                    </div>
                    {isSaving && <span className="text-sm text-gray-500 animate-pulse">Saving changes...</span>}
                </motion.div>

                <IntelligencePanel data={roadmapState.intelligence} />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Timeline */}
                    <div className="lg:col-span-8">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Learning Path</h2>
                        <InteractiveTimeline
                            phases={roadmapState.phases}
                            onSkillClick={setSelectedSkill}
                            onToggleSkill={handleToggleSkill}
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4 hidden lg:block">
                        <div className="sticky top-10 space-y-6">
                            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                                <h3 className="font-bold text-gray-900 dark:text-white mb-4">Overall Progress</h3>
                                <div className="relative w-40 h-40 mx-auto mb-4">
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="12" className="text-gray-100 dark:text-gray-800" fill="none" />
                                        <circle
                                            cx="80" cy="80" r="70"
                                            stroke="currentColor" strokeWidth="12"
                                            className="text-blue-600 transition-all duration-500 ease-out"
                                            fill="none"
                                            strokeDasharray="440"
                                            strokeDashoffset={440 - (440 * overallProgress) / 100}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{overallProgress}%</span>
                                        <span className="text-xs text-gray-500">Completed</span>
                                    </div>
                                </div>
                                <p className="text-center text-sm text-gray-500">
                                    {overallProgress > 90 ? "You're almost there!" : "Keep learning and unlocking new phases."}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {selectedSkill && (
                <SkillDetailModal
                    skill={selectedSkill}
                    onClose={() => setSelectedSkill(null)}
                    onToggle={handleModalToggle}
                />
            )}
        </div>
    );
};

export default AIMLRoadmap;
