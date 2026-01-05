import React, { useEffect, useMemo } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useInterest } from "../context/InterestContext";
import { useHorizon } from "../context/HorizonContext";
import { useAuth } from "../context/AuthContext";
import { RefreshCw, TrendingUp } from "lucide-react";
import {
  WelcomeHeader,
  StatusCard,
  ActiveInterests,
  SkillsSnapshot,
  NextAction,
  ActivityFeed,
  RoadmapTimeline,
  SkillGaps,
  CareerDirection,
  InsightsPanel,
} from "../components/Home/HomeComponents";

const NewHome = () => {
  const { horizonData, isLoading, error, fetchHorizon, refresh } = useHorizon();
  const { user } = useAuth();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Fetch horizon data on mount
  useEffect(() => {
    if (user?.id) {
      fetchHorizon();
    }
  }, [user?.id, fetchHorizon]);

  // Transform Horizon Data to Component Props
  const dashboardData = useMemo(() => {
    if (!horizonData) return null;

    return {
      user: { name: horizonData.profile?.name || user?.name || "Explorer" },
      dailyInsight:
        horizonData.dailyInsight?.message ||
        "Consistency is the only algorithm that matters.",
      stats: horizonData.stats || {
        skillsLearned: 0,
        totalHoursLearning: 0,
        roadmapCompletion: 0,
        domainsExplored: 0,
      },
      activeInterests: horizonData.activeInterests,
      skillsSnapshot: horizonData.skillsSnapshot || {
        completed: [],
        inProgress: [],
        planned: [],
      },
      nextAction: horizonData.nextAction,
      recentActivity: horizonData.recentActivity || [],
      // New fields for enhanced dashboard
      // Support both old format (roadmap) and new format (roadmaps array)
      roadmap: horizonData.roadmaps?.[0] || horizonData.roadmap,
      roadmaps:
        horizonData.roadmaps ||
        (horizonData.roadmap ? [horizonData.roadmap] : []),
      careerDirection: horizonData.careerDirection,
      skillGaps: horizonData.skillsSnapshot?.gaps || [],
      insights: horizonData.insights || [],
    };
  }, [horizonData, user]);

  // Loading State
  if (isLoading && !horizonData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Empty/Error State
  if (!isLoading && !horizonData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black p-6 text-center">
        <TrendingUp size={48} className="text-gray-400 mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
          Waiting for career guidance...
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
          Complete onboarding to get your career guidance, or click refresh if
          you already have.
        </p>
        <div className="flex gap-4">
          <button
            onClick={refresh}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-sm flex items-center gap-2">
            <RefreshCw size={16} /> Refresh
          </button>
          <a
            href="/onboarding"
            className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium">
            Redo Onboarding
          </a>
        </div>
        {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-white dark:bg-black selection:bg-blue-500 selection:text-white overflow-hidden">
      {/* Scroll Progress */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Content Flow */}
      <div className="relative z-10">
        <WelcomeHeader
          user={dashboardData.user}
          dailyInsight={dashboardData.dailyInsight}
        />

        <StatusCard status={dashboardData.stats} />

        {dashboardData.activeInterests?.length > 0 && (
          <ActiveInterests interests={dashboardData.activeInterests} />
        )}

        {dashboardData.nextAction && (
          <NextAction action={dashboardData.nextAction} />
        )}

        {/* Career Direction - Shows recommended path */}
        <CareerDirection direction={dashboardData.careerDirection} />

        {/* Skill Gaps - Shows what needs attention */}
        <SkillGaps gaps={dashboardData.skillGaps} />

        {/* Roadmap Timeline - Shows phases with skills */}
        {/* <RoadmapTimeline roadmap={dashboardData.roadmap} /> */}

        {/* Insights - Shows risks and trends */}
        <InsightsPanel insights={dashboardData.insights} />

        <SkillsSnapshot skills={dashboardData.skillsSnapshot} />

        {dashboardData.recentActivity?.length > 0 && (
          <ActivityFeed activities={dashboardData.recentActivity} />
        )}

        <div className="max-w-7xl mx-auto px-6 pb-20 text-center">
          <button
            onClick={refresh}
            className="text-sm text-gray-500 hover:text-blue-500 flex items-center justify-center gap-2 mx-auto transition-colors">
            <RefreshCw size={14} /> Sync with Agent
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewHome;
