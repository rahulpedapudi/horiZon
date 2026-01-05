import React from "react";
import { Layers, Database, Cpu, FlaskConical, Gavel } from "lucide-react";

const ExploreDomains = () => {
  const domains = [
    {
      id: "it",
      name: "Information Technology",
      icon: Layers,
      desc: "Software, Cloud, AI, and Data.",
      color: "text-blue-400",
    },
    {
      id: "mech",
      name: "Mechanical Engineering",
      icon: Cpu,
      desc: "Robotics, Thermodynamics, and Manufacturing.",
      color: "text-orange-400",
    },
    {
      id: "civil",
      name: "Civil Engineering",
      icon: Layers,
      desc: "Infrastructure, Smart Cities, and sustainable design.",
      color: "text-yellow-400",
    },
    {
      id: "science",
      name: "Science & Research",
      icon: FlaskConical,
      desc: "Biotech, Physics, and pure research fields.",
      color: "text-purple-400",
    },
    {
      id: "gov",
      name: "Government & Policy",
      icon: Gavel,
      desc: "Public administration, policy making, and civic services.",
      color: "text-red-400",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Explore Domains</h1>
      <p className="text-slate-400 mb-8">
        Discover fields that align with your interests and future trends.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains.map((d) => (
          <div
            key={d.id}
            className="group p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 hover:border-gray-300 dark:hover:bg-slate-800 transition-all cursor-pointer">
            <div
              className={`w-14 h-14 rounded-xl bg-gray-100 dark:bg-slate-900 ${d.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <d.icon size={28} />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-slate-100">
              {d.name}
            </h3>
            <p className="text-gray-500 dark:text-slate-400 mb-4">{d.desc}</p>
            <div className="text-sm font-medium text-black dark:text-accent flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              Explore path <span>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreDomains;
