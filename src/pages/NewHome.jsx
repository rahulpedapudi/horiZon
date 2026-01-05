import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { homeData } from '../data/homeData';
import { useInterest } from '../context/InterestContext';
import {
    WelcomeHeader,
    StatusCard,
    ActiveInterests,
    SkillsSnapshot,
    ActivityFeed,
    NextAction
} from '../components/Home/HomeComponents';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const NewHome = () => {
    const { currentInterest } = useInterest();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const [userData, setUserData] = useState(homeData.user);
    const [dynamicInterests, setDynamicInterests] = useState(homeData.activeInterests);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_URL}/api/user/profile`, { credentials: 'include' });
                if (res.ok) {
                    const data = await res.json();

                    // Update User Basic Info
                    if (data.user) {
                        setUserData(prev => ({
                            ...prev,
                            name: data.user.name,
                            avatar: data.user.avatar || prev.avatar
                        }));
                    }

                    // Strict update for interests: If profile exists, use its skills (even if empty)
                    if (data.profile) {
                        // If we have skills, map them. If not, it's an empty array.
                        const skills = data.profile.skills || [];
                        if (skills.length > 0) {
                            const mappedInterests = skills.map((skill, index) => ({
                                id: index,
                                title: skill,
                                category: "Focus Area",
                                progress: 0,
                                totalModules: 10,
                                status: "Active",
                                color: ["from-blue-500 to-cyan-500", "from-purple-500 to-pink-500", "from-orange-500 to-red-500"][index % 3] // Rotate colors
                            }));
                            setDynamicInterests(mappedInterests);
                        } else {
                            // User has no skills selected yet
                            setDynamicInterests([]);
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to fetch user profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="relative min-h-screen bg-white dark:bg-black selection:bg-blue-500 selection:text-white">

            {/* 1. Scroll Progress Indicator (Fixed Top) */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-500 transform origin-left z-50"
                style={{ scaleX }}
            />

            {/* 2. Global Animated Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse-slow delay-1000" />
                <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[80px] animate-pulse-slow delay-500" />
                {/* Noise Overlay */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            {/* 3. Main Content Flow */}
            <div className="relative z-10 flex flex-col gap-8 pb-20">

                {/* Section 1: Welcome & Status */}
                <WelcomeHeader user={userData} currentInterest={currentInterest} />

                {/* Section 2: Career Status Card */}
                <StatusCard status={homeData.careerStatus} />

                {/* Section 3: Active Interests */}
                <ActiveInterests interests={dynamicInterests} />

                {/* Section 4: Skills Snapshot */}
                <SkillsSnapshot skills={homeData.skillsSnapshot} />

                {/* Section 5: Recent Activity */}
                <ActivityFeed activities={homeData.recentActivity} />

                {/* Section 6: Next Action */}
                <NextAction action={homeData.nextAction} />

                {/* Section 7: Career Insights (Footer style) */}
                <div className="max-w-3xl mx-auto px-6 text-center pb-20 opacity-60">
                    <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Career Insights</h3>
                    <div className="space-y-4">
                        {homeData.insights.map((insight, i) => (
                            <p key={i} className="text-sm md:text-base">
                                {insight.replace(/\*\*(.*?)\*\*/g, (match, p1) => p1)}
                                {/* Simplified markdown parsing for this demo, bolding would need a parser component */}
                            </p>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NewHome;
