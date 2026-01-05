// import React from "react";
// import { ArrowRight, Zap, Map, Globe, Brain, TrendingUp } from "lucide-react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div className="space-y-12 py-10 pb-10 px-4 md:px-0 max-w-5xl mx-auto">
//       {/* Hero Section */}
//       <section className="relative overflow-y-visible rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-8 md:p-16 text-center md:text-left">
//         <div className="relative z-10 max-w-3xl mx-auto md:mx-0">
//           <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight text-gray-900 dark:text-white">
//             Learn Today for the <br />
//             <span className="text-gray-500 dark:text-gray-400">
//               Skills of Tomorrow
//             </span>
//           </h1>
//           <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
//             A future-ready learning platform that guides you across academics,
//             domains, and long-term relevance. Stop reacting—start predicting
//             your future.
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
//             <Link
//               to="/assess"
//               className="px-8 py-3.5 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black font-medium rounded-xl transition-all flex items-center justify-center gap-2 group">
//               Assess My Knowledge
//               <ArrowRight
//                 size={18}
//                 className="group-hover:translate-x-1 transition-transform"
//               />
//             </Link>
//             <Link
//               to="/roadmaps"
//               className="px-8 py-3.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-xl border border-gray-200 dark:border-gray-700 transition-all flex items-center justify-center">
//               Explore My Roadmap
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Feature Overview Cards */}
//       <section>
//         <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
//           Platform Features
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <FeatureCard
//             icon={Brain}
//             title="Knowledge Assessment"
//             desc="Identify your current standing with AI-driven concept analysis."
//           />
//           <FeatureCard
//             icon={Map}
//             title="Personalized Roadmaps"
//             desc="Bridge the gap between academic syllabus and future industry needs."
//           />
//           <FeatureCard
//             icon={Zap}
//             title="Future Skill Discovery"
//             desc="Spot emerging technologies before they become mainstream."
//           />
//           <FeatureCard
//             icon={Globe}
//             title="Multi-Domain Exploration"
//             desc="Explore IT, Core Engineering, Research, and Policy making."
//           />
//           <FeatureCard
//             icon={TrendingUp}
//             title="News & Trend Awareness"
//             desc="Curated updates that explain 'Why this matters' for your future."
//           />
//         </div>
//       </section>

//       {/* Who This Platform Is For */}
//       <section>
//         <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
//           Who This Platform Is For
//         </h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <AudienceCard title="B.Tech 1st Year Students" />
//           <AudienceCard title="Core Engineering Students" />
//           <AudienceCard title="Government Exam Aspirants" />
//           <AudienceCard title="Career Switchers" />
//         </div>
//       </section>
//     </div>
//   );
// };

// const FeatureCard = ({ icon: Icon, title, desc }) => (
//   <div className="p-6 rounded-2xl bg-white dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-500 transition-all hover:-translate-y-1">
//     <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white flex items-center justify-center mb-4">
//       <Icon size={24} />
//     </div>
//     <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
//       {title}
//     </h3>
//     <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
//       {desc}
//     </p>
//   </div>
// );

// const AudienceCard = ({ title }) => (
//   <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-default">
//     <span className="font-medium text-gray-700 dark:text-gray-200">
//       {title}
//     </span>
//   </div>
// );

// export default Home;
import React from "react";
import {
  ArrowRight,
  Compass,
  AlertTriangle,
  Layers,
  RefreshCw,
} from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  // Temporary mocked state (replace with real user state later)
  const hasSnapshot = true;
  const hasActivePath = true;

  return (
    <div className="space-y-12 py-10 pb-10 px-4 md:px-0 max-w-5xl mx-auto">
      {/* State-Aware Hero */}
      <section className="relative rounded-3xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 p-8 md:p-16">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-semibold mb-4 leading-tight text-gray-900 dark:text-white">
            {hasSnapshot
              ? "Your career direction, right now"
              : "Let’s figure out what’s worth learning for you"}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            {hasSnapshot
              ? "Based on what you’ve shared so far, here’s what matters most at this stage."
              : "No predictions. No hype. Just clear reasoning tailored to you."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {!hasSnapshot && (
              <Link
                to="/assess"
                className="px-8 py-3.5 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black font-medium rounded-xl transition-all flex items-center justify-center gap-2 group">
                Start with a quick check-in
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            )}
            {hasSnapshot && (
              <>
                <Link
                  to="/roadmaps"
                  className="px-8 py-3.5 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black font-medium rounded-xl transition-all flex items-center justify-center gap-2 group">
                  View my current path
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  to="/assess"
                  className="px-8 py-3.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-xl border border-gray-200 dark:border-gray-700 transition-all flex items-center justify-center gap-2">
                  Reassess assumptions
                  <RefreshCw size={16} />
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Snapshot Section */}
      {hasSnapshot && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Your current snapshot
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SnapshotCard
              title="Stage"
              value="1st-year B.Tech"
              sub="~3 years to graduation"
              icon={Compass}
            />
            <SnapshotCard
              title="Strengths"
              value="Problem-solving"
              sub="Learning by building"
              icon={Layers}
            />
            <SnapshotCard
              title="Main risk"
              value="Unfocused learning"
              sub="Early-stage exploration"
              icon={AlertTriangle}
            />
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            These assumptions guide every recommendation. You can change them
            anytime.
          </p>
        </section>
      )}

      {/* What Matters Now */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
          What matters most right now
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FocusCard
            title="Build strong foundations"
            desc="These skills compound across roles and protect you from trend shifts."
          />
          <FocusCard
            title="Explore 1–2 directions deeply"
            desc="Depth reveals fit better than endless exploration."
          />
          <FocusCard
            title="Avoid tool-hopping"
            desc="Understanding outlives frameworks."
          />
        </div>
      </section>

      {/* Active Path */}
      {hasActivePath && (
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
            Your active path
          </h2>
          <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/30 border border-gray-200 dark:border-gray-700">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Software Development (Backend-leaning)
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Confidence: Moderate · Last updated 2 days ago
            </p>
            <div className="flex gap-4 mt-6">
              <Link
                to="/roadmaps"
                className="px-6 py-2.5 bg-black dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black rounded-xl font-medium transition-all">
                View roadmap
              </Link>
              <Link
                to="/career-map"
                className="px-6 py-2.5 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl border border-gray-200 dark:border-gray-700 font-medium transition-all">
                Re-evaluate direction
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Gentle Check-in */}
      <section className="text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Feeling unsure or stuck? That’s normal — especially early on.
        </p>
        <Link
          to="/check-in"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white hover:underline">
          Check in & recalibrate <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
};

const SnapshotCard = ({ title, value, sub, icon: Icon }) => (
  <div className="p-6 rounded-2xl bg-white dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700">
    <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4">
      <Icon size={20} className="text-gray-900 dark:text-white" />
    </div>
    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
    <p className="text-lg font-semibold text-gray-900 dark:text-white">
      {value}
    </p>
    <p className="text-sm text-gray-500 dark:text-gray-400">{sub}</p>
  </div>
);

const FocusCard = ({ title, desc }) => (
  <div className="p-6 rounded-2xl bg-white dark:bg-gray-800/30 border border-gray-100 dark:border-gray-700">
    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
      {title}
    </h3>
    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
      {desc}
    </p>
  </div>
);

export default Home;
