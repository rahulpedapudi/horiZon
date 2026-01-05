
export const homeData = {
    // 1. Welcome & Status
    user: {
        name: "Kumar",
        role: "Aspiring System Architect",
        level: "Intermediate",
        nextLevel: "Advanced",
        progressToNextLevel: 65,
    },

    // 2. Overall Career Status
    careerStatus: {
        skillsLearned: 12,
        skillsInProgress: 4,
        domainsExplored: 2,
        roadmapCompletion: 35, // percentage
        totalHoursLearning: 124,
    },

    // 3. Active Interests / Domains
    activeInterests: [
        {
            id: "frontend",
            title: "Frontend Development",
            progress: 40,
            status: "Active",
            color: "from-blue-500 to-cyan-500",
            icon: "Layout",
        },
        {
            id: "data",
            title: "Data Analytics",
            progress: 15,
            status: "Paused",
            color: "from-purple-500 to-pink-500",
            icon: "Database",
        },
        {
            id: "backend",
            title: "Backend Systems",
            progress: 5,
            status: "Planned",
            color: "from-orange-500 to-red-500",
            icon: "Server",
        },
    ],

    // 4. Skills Snapshot
    skillsSnapshot: {
        completed: ["HTML5", "CSS3", "JavaScript ES6", "Tailwind CSS", "Git"],
        inProgress: ["React.js", "TypeScript", "Node.js Basics", "Framer Motion"],
        planned: ["GraphQL", "Docker", "System Design Patterns", "Next.js"],
    },

    // 5. Recent Activity
    recentActivity: [
        {
            id: 1,
            type: "completion",
            title: "Completed 'JavaScript Closures'",
            time: "2 hours ago",
            xp: +50,
        },
        {
            id: 2,
            type: "started",
            title: "Started 'React Hooks Deep Dive'",
            time: "Yesterday",
            xp: 0,
        },
        {
            id: 3,
            type: "milestone",
            title: "Reached Level 4 in Frontend",
            time: "2 days ago",
            xp: +200,
        },
    ],

    // 6. Recommended Next Action
    nextAction: {
        title: "Continue learning React",
        subtitle: "Module: Advanced Hooks & Custom Hooks",
        duration: "45 mins",
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    },

    // 7. Career Insights
    insights: [
        "Your skills are most aligned with **Frontend Engineer** roles at this stage.",
        "You're 2 key skills (Redux, Testing) away from junior-level readiness.",
        "Data Analytics is a great secondary skill to boost your profile by 20%.",
    ]
};
