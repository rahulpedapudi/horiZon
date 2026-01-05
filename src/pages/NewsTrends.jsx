import React from "react";
import { Tag, ExternalLink } from "lucide-react";

const NewsTrends = () => {
  const news = [
    {
      id: 1,
      title: "AI Agents replacing traditional SaaS interfaces",
      domain: "IT & AI",
      why: "Future software interactions will be conversational, not click-based. Learning NLP is crucial now.",
      date: "2 hours ago",
    },
    {
      id: 2,
      title: "Sustainable Concrete: The new material science frontier",
      domain: "Civil Engineering",
      why: "Green construction is mandated by 2030 policies globally.",
      date: "1 day ago",
    },
    {
      id: 3,
      title: "Quantum Sensors in Medical Imaging",
      domain: "Health Tech",
      why: "Shift from MRI to quantum sensing offers higher resolution at lower cost.",
      date: "3 days ago",
    },
  ];

  return (
    <div className="max-w-4xl py-10 mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
        News & Trends
      </h1>
      <p className="text-gray-500 dark:text-slate-400 mb-8">
        Curated updates explaining 'Why this matters' for your career.
      </p>

      <div className="space-y-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-800/40 border border-gray-200 dark:border-slate-700/50 hover:border-gray-300 dark:hover:bg-slate-800/60 transition-all">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium border border-blue-200 dark:border-blue-500/20">
                    {item.domain}
                  </span>
                  <span className="text-gray-500 dark:text-slate-500 text-xs">
                    • {item.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-slate-100 mb-3">
                  {item.title}
                </h3>

                <div className="bg-yellow-50 dark:bg-yellow-500/5 border-l-2 border-yellow-500/50 p-3 rounded-r-lg">
                  <p className="text-sm text-gray-600 dark:text-slate-300">
                    <span className="font-semibold text-yellow-600 dark:text-yellow-500 uppercase text-xs block mb-1">
                      Why this matters
                    </span>
                    {item.why}
                  </p>
                </div>
              </div>

              <button className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                <ExternalLink size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTrends;
