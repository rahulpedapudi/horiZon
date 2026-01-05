import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion';
import { ArrowRight, Trophy, Clock, Target, Star, PlayCircle, Zap, CheckCircle2, Lock } from 'lucide-react';

// --- 1. Welcome Header ---
export const WelcomeHeader = ({ user }) => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 300], [0, 100]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <motion.div
            style={{ y: y1, opacity }}
            className="relative z-10 pt-24 pb-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
        >
            <div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-sm font-medium tracking-wider uppercase text-gray-500 dark:text-gray-400 mb-2"
                >
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight"
                >
                    Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">{user?.name}</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl text-gray-600 dark:text-gray-300 max-w-lg"
                >
                    Your career progress at a glance.
                </motion.p>
            </div>

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl max-w-xs text-sm text-gray-600 dark:text-gray-300 hidden md:block"
            >
                <div className="flex items-center gap-2 mb-1 text-xs font-bold uppercase tracking-wide text-blue-500">
                    <Zap size={14} /> Daily Insight
                </div>
                "Consistency is the only algorithm that matters."
            </motion.div>
        </motion.div>
    );
};

// --- 2. 3D Tilt Status Card ---
export const StatusCard = ({ status }) => {
    const ref = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = (e.clientX - rect.left) * 32.5;
        const mouseY = (e.clientY - rect.top) * 32.5;
        const rX = (mouseY / height - 32.5 / 2) * -1;
        const rY = (mouseX / width - 32.5 / 2);
        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="perspective-1000 w-full mb-12 px-6 max-w-7xl mx-auto">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ transformStyle: "preserve-3d", transform }}
                className="relative w-full rounded-3xl bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-2xl p-8 overflow-hidden group"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8">
                    <StatItem icon={Trophy} label="Skills Learned" value={status?.skillsLearned} delay={0.1} />
                    <StatItem icon={Clock} label="Learning Hours" value={status?.totalHoursLearning} delay={0.2} />
                    <StatItem icon={Target} label="Roadmap %" value={`${status?.roadmapCompletion}%`} delay={0.3} />
                    <StatItem icon={Star} label="Domains" value={status?.domainsExplored} delay={0.4} />
                </div>
            </motion.div>
        </div>
    );
};

const StatItem = ({ icon: Icon, label, value, delay }) => (
    <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay }}
        className="flex flex-col items-center justify-center text-center space-y-2"
    >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/80 to-white/20 dark:from-white/10 dark:to-white/5 border border-white/20 flex items-center justify-center shadow-lg">
            <Icon size={24} className="text-gray-800 dark:text-white" />
        </div>
        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500 dark:from-white dark:to-gray-400">
            {value}
        </div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {label}
        </div>
    </motion.div>
);

// --- 3. Active Interests Scroller ---
export const ActiveInterests = ({ interests }) => {
    return (
        <div className="w-full mb-20">
            <div className="max-w-7xl mx-auto px-6 mb-6 flex justify-between items-end">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Active Interests</h2>
                <button className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">View All</button>
            </div>

            <div className="flex gap-6 overflow-x-auto px-6 pb-10 snap-x scrollbar-none max-w-7xl mx-auto">
                {interests?.map((interest, idx) => (
                    <InterestCard key={interest.id} interest={interest} index={idx} />
                ))}
            </div>
        </div>
    );
};

const InterestCard = ({ interest, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            transition={{ delay: index * 0.1 }}
            className="min-w-[300px] md:min-w-[350px] snap-center bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-100 dark:border-gray-700 shadow-xl relative overflow-hidden group cursor-pointer"
        >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${interest.color} opacity-10 rounded-bl-[100px] transition-transform group-hover:scale-110`} />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${interest.color} bg-opacity-10 text-white`}>
                        <Star size={20} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 ${interest.status === 'Active' ? 'text-green-500' : 'text-gray-500'}`}>
                        {interest.status}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{interest.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">4 Modules Remaining</p>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold">
                        <span>Progress</span>
                        <span>{interest.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${interest.progress}%` }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className={`h-full bg-gradient-to-r ${interest.color}`}
                        />
                    </div>
                </div>

                <motion.button
                    whileHover={{ x: 5 }}
                    className="mt-6 flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white group/btn"
                >
                    Continue <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </motion.button>
            </div>
        </motion.div>
    );
};

// --- 4. Skills Snapshot ---
export const SkillsSnapshot = ({ skills }) => {
    return (
        <div className="max-w-7xl mx-auto px-6 mb-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Skills Overview</h2>
            <div className="grid md:grid-cols-3 gap-6">
                <SkillBucket title="Completed" icon={CheckCircle2} items={skills?.completed || []} color="text-green-500" bgColor="bg-green-500/10" />
                <SkillBucket title="In Progress" icon={PlayCircle} items={skills?.inProgress || []} color="text-blue-500" bgColor="bg-blue-500/10" />
                <SkillBucket title="Planned" icon={Lock} items={skills?.planned || []} color="text-gray-400" bgColor="bg-gray-500/10" />
            </div>
        </div>
    );
};

const SkillBucket = ({ title, icon: Icon, items, color, bgColor }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-800"
    >
        <div className="flex items-center gap-3 mb-6">
            <div className={`p-2 rounded-lg ${bgColor} ${color}`}>
                <Icon size={20} />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white">{title}</h3>
        </div>
        <div className="space-y-3">
            {items.map((skill, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className={`w-1.5 h-1.5 rounded-full ${color.replace('text', 'bg').replace('-500', '-500')}`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{skill}</span>
                </div>
            ))}
        </div>
    </motion.div>
);

// --- 5. Recent Activity ---
export const ActivityFeed = ({ activities }) => {
    return (
        <div className="max-w-7xl mx-auto px-6 mb-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Recent Activity</h2>
            <div className="relative pl-8 border-l border-gray-200 dark:border-gray-800 space-y-12">
                {activities?.map((activity, index) => (
                    <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                    >
                        <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-white dark:bg-gray-900 border-4 border-gray-200 dark:border-gray-700 group-hover:border-blue-500 transition-colors" />

                        <div className="flex justify-between items-start">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">{activity.title}</h4>
                                <span className="text-sm text-gray-500">{activity.time}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${activity.xp > 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500'}`}>
                                {activity.xp > 0 ? `+${activity.xp} XP` : 'Started'}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- 6. Next Action (Magnetic) ---
export const NextAction = ({ action }) => {
    return (
        <div className="max-w-7xl mx-auto px-6 mb-24">
            <div className="relative overflow-hidden rounded-[40px] bg-black dark:bg-white text-white dark:text-black p-10 md:p-16 text-center shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20" />
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500 rounded-full blur-[100px]" />

                <div className="relative z-10 flex flex-col items-center">
                    <span className="inline-block px-4 py-1 rounded-full border border-white/20 dark:border-black/10 text-sm font-medium mb-6">Suggested Next Step</span>
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">{action?.title}</h2>
                    <p className="text-lg opacity-80 mb-10">{action?.subtitle} • {action?.duration}</p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-white dark:bg-black text-black dark:text-white rounded-2xl font-bold text-lg flex items-center gap-3 shadow-xl hover:shadow-2xl hover:shadow-white/20 dark:hover:shadow-black/20 transition-all"
                    >
                        Resume Learning <PlayCircle size={24} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};
