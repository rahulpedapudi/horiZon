import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Target } from "lucide-react";
import { useHorizon } from "../../context/HorizonContext";
import { IntelligencePanel } from "../../components/Roadmap/IntelligencePanel";
import { InteractiveTimeline } from "../../components/Roadmap/InteractiveTimeline";
import { SkillDetailModal } from "../../components/Roadmap/SkillDetailModal";

/**
 * Dynamic Roadmap Page
 * Uses agent data from HorizonContext and renders with existing styled components
 */
const RoadmapPage = () => {
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const { horizonData, isLoading } = useHorizon();
  const [selectedSkill, setSelectedSkill] = useState(null);

  // Get roadmap data from horizonData.roadmaps array
  const roadmap = useMemo(() => {
    if (!horizonData) return null;

    // Support both old format (roadmap) and new format (roadmaps array)
    const roadmaps =
      horizonData.roadmaps ||
      (horizonData.roadmap ? [horizonData.roadmap] : []);

    if (roadmaps.length === 0) return null;

    // Find roadmap matching the interest ID
    const matched = roadmaps.find(
      (r) =>
        r.id === roadmapId ||
        r.id === `${roadmapId}-path` ||
        r.id?.includes(roadmapId) ||
        roadmapId?.includes(r.id?.replace("-path", ""))
    );

    return matched || roadmaps[0]; // Fallback to first roadmap if no match
  }, [horizonData, roadmapId]);

  // Get matching interest for color/metadata
  const interest = useMemo(() => {
    return horizonData?.activeInterests?.find(
      (i) =>
        i.id === roadmapId ||
        i.id?.includes(roadmapId?.split("-")[0]) ||
        roadmapId?.includes(i.id?.split("-")[0])
    );
  }, [horizonData, roadmapId]);

  // Transform agent data to IntelligencePanel format
  const intelligenceData = useMemo(() => {
    if (!horizonData) return null;

    return {
      currentDirection: {
        primaryRole:
          horizonData.careerDirection?.primaryRole ||
          roadmap?.title ||
          "Your Path",
        secondaryRoles: horizonData.careerDirection?.secondaryRoles || [],
        matchScore: horizonData.careerDirection?.matchScore || 0,
      },
      immediateFocus: {
        skill: horizonData.immediateFocus?.skill || "Getting Started",
        reason:
          horizonData.immediateFocus?.reason || "Begin your learning journey",
        timeWindow: horizonData.immediateFocus?.timeWindow || "Next 30 days",
      },
      blockingGaps: (horizonData.skillsSnapshot?.gaps || [])
        .slice(0, 3)
        .map((gap) => ({
          skill: gap.skill,
          impact:
            gap.impact === "high"
              ? "High"
              : gap.impact === "medium"
              ? "Medium"
              : "Low",
        })),
    };
  }, [horizonData, roadmap]);

  // Transform phases for InteractiveTimeline (map status values)
  const phases = useMemo(() => {
    if (!roadmap?.phases) return [];

    return roadmap.phases.map((phase) => ({
      ...phase,
      // Map 'not-started' to 'locked' for the component's expected status
      status:
        phase.status === "not-started"
          ? "locked"
          : phase.status === "in-progress"
          ? "in-progress"
          : phase.status === "completed"
          ? "completed"
          : "locked",
      skills: phase.skills?.map((skill) => ({
        ...skill,
        status:
          skill.status === "not-started"
            ? "not-started"
            : skill.status === "in-progress"
            ? "in-progress"
            : skill.status === "completed"
            ? "completed"
            : "not-started",
      })),
    }));
  }, [roadmap]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!roadmap) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-black p-6">
        <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Roadmap not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black p-6 md:p-12 pb-32">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors">
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </motion.button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">
            {roadmap.title}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">
            Your personalized path to mastering{" "}
            {interest?.title || roadmap.title}.
          </p>
        </motion.div>

        {/* Intelligence Panel */}
        {intelligenceData && <IntelligencePanel data={intelligenceData} />}

        {/* Main Roadmap Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Timeline (Left/Center) */}
          <div className="lg:col-span-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Learning Path
            </h2>
            <InteractiveTimeline
              phases={phases}
              onSkillClick={setSelectedSkill}
            />
          </div>

          {/* Sidebar / Sticky Summary (Right) */}
          <div className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-10 space-y-6">
              {/* Progress Card */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Overall Progress
                </h3>
                <div className="relative w-40 h-40 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-gray-100 dark:text-gray-800"
                      fill="none"
                    />
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      stroke="currentColor"
                      strokeWidth="12"
                      className="text-blue-600"
                      fill="none"
                      strokeDasharray="440"
                      strokeDashoffset={
                        440 - (440 * roadmap.overallProgress) / 100
                      }
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {roadmap.overallProgress}%
                    </span>
                    <span className="text-xs text-gray-500">Completed</span>
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500">
                  Phase {roadmap.currentPhase} of {roadmap.totalPhases} •{" "}
                  {phases[roadmap.currentPhase - 1]?.title || "Getting Started"}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Phases</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {roadmap.totalPhases}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Skills</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {phases.reduce(
                        (acc, p) => acc + (p.skills?.length || 0),
                        0
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Current Focus</span>
                    <span className="font-semibold text-blue-600">
                      {horizonData?.immediateFocus?.skill || "Start Learning"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <SkillDetailModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </div>
  );
};

export default RoadmapPage;
