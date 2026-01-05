
export const roadmapData = {
    id: "ai-ml-engineer",
    title: "AI & Machine Learning Engineer",

    // 1. Intelligence Panel Data
    intelligence: {
        currentDirection: {
            primaryRole: "Machine Learning Engineer",
            secondaryRoles: ["Data Scientist", "AI Engineer"],
            matchScore: 65, // percentage
        },
        immediateFocus: {
            skill: "Supervised Learning",
            reason: "Foundational for 80% of ML roles",
            timeWindow: "Next 30 days",
        },
        blockingGaps: [
            { skill: "Linear Algebra", impact: "High" },
            { skill: "Data Cleaning (Pandas)", impact: "Medium" }
        ]
    },

    // 2. Interactive Roadmap Phases
    phases: [
        {
            id: "phase-1",
            title: "Programming & CS Foundations",
            status: "completed",
            timeRange: "Weeks 1-4",
            progress: 100,
            skills: [
                {
                    id: "p1-s1",
                    name: "Python Foundations",
                    status: "completed",
                    description: "Write clean Python for data/ML and be comfortable with basic CS.",
                    resources: [
                        { type: "course", title: "Python for Everybody (Coursera)", link: "#", level: "Beginner" },
                        { type: "doc", title: "Official Python Tutorial", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        "Solve 5 LeetCode Easy problems using Python",
                        "Write a script to parse a CSV file without Pandas"
                    ]
                },
                {
                    id: "p1-s2",
                    name: "Data Structures & Algorithms",
                    status: "completed",
                    description: "Understanding lists, dicts, sets, and time/space complexity.",
                    resources: [
                        { type: "video", title: "Data Structures Easy to Advanced", link: "#", level: "Intermediate" }
                    ],
                    practice: ["Implement a Hash Map from scratch"]
                },
                {
                    id: "p1-s3",
                    name: "Git & Version Control",
                    status: "completed",
                    description: "Basic Git commands and GitHub workflow.",
                    resources: [
                        { type: "video", title: "Git & GitHub Crash Course", link: "#", level: "Beginner" }
                    ],
                    practice: ["Create a repo, push code, and merge a PR"]
                }
            ]
        },
        {
            id: "phase-2",
            title: "Math for Machine Learning",
            status: "in-progress",
            timeRange: "Weeks 5-8",
            progress: 40,
            skills: [
                {
                    id: "p2-s1",
                    name: "Linear Algebra",
                    status: "in-progress",
                    description: "Vectors, matrices, dot products, eigenvalues.",
                    resources: [
                        { type: "course", title: "Mathematics for Machine Learning (Coursera)", link: "#", level: "Intermediate" },
                        { type: "video", title: "Khan Academy Linear Algebra", link: "#", level: "Beginner" }
                    ],
                    practice: ["Implement matrix multiplication in pure Python", "Visualize vectors using Matplotlib"]
                },
                {
                    id: "p2-s2",
                    name: "Probability & Statistics",
                    status: "not-started",
                    description: "Distributions, Bayes rule, hypothesis testing.",
                    resources: [
                        { type: "course", title: "Statistics Fundamentals with Python (DataCamp)", link: "#", level: "Beginner" }
                    ],
                    practice: ["Calculate probabilities of a dataset"]
                },
                {
                    id: "p2-s3",
                    name: "Calculus & Optimization",
                    status: "not-started",
                    description: "Derivatives, gradients, gradient descent.",
                    resources: [
                        { type: "cheat-sheet", title: "DeepLearning.ai Calculus Cheat Sheet", link: "#", level: "Advanced" }
                    ],
                    practice: ["Manually calculate gradient for x^2"]
                }
            ]
        },
        {
            id: "phase-3",
            title: "Data Handling & Visualization",
            status: "locked",
            timeRange: "Weeks 9-12",
            progress: 0,
            skills: [
                { id: "p3-s1", name: "NumPy & Vectors", status: "locked", description: "High-performance array computing." },
                { id: "p3-s2", name: "Pandas Proficiency", status: "locked", description: "Data manipulation and analysis." },
                { id: "p3-s3", name: "Data Visualization", status: "locked", description: "Matplotlib, Seaborn, Plotly." }
            ]
        },
        {
            id: "phase-4",
            title: "Core Machine Learning",
            status: "locked",
            timeRange: "Weeks 13-18",
            progress: 0,
            skills: [
                { id: "p4-s1", name: "Supervised Learning", status: "locked", description: "Regression, Classification, SVM, Trees." },
                { id: "p4-s2", name: "Unsupervised Learning", status: "locked", description: "Clustering, PCA, Dimensionality Reduction." },
                { id: "p4-s3", name: "Model Evaluation", status: "locked", description: "Accuracy, Precision, Recall, Cross-validation." }
            ]
        },
        {
            id: "phase-5",
            title: "Deep Learning Fundamentals",
            status: "locked",
            timeRange: "Weeks 19-24",
            progress: 0,
            skills: [
                { id: "p5-s1", name: "Neural Networks Basics", status: "locked", description: "Perceptrons, MLPs, Backprop." },
                { id: "p5-s2", name: "PyTorch / TensorFlow", status: "locked", description: "Framework mastery." },
                { id: "p5-s3", name: "Training Pipelines", status: "locked", description: "DataLoaders, Experiment tracking." }
            ]
        },
        {
            id: "phase-6",
            title: "Specializations (NLP/CV/GenAI)",
            status: "locked",
            timeRange: "Weeks 25-30",
            progress: 0,
            skills: [
                { id: "p6-s1", name: "Natural Language Processing", status: "locked", description: "Transformers, LLMs, RAG." },
                { id: "p6-s2", name: "Computer Vision", status: "locked", description: "CNNs, Object Detection, Segmentation." },
                { id: "p6-s3", name: "Generative AI", status: "locked", description: "GANs, Diffusion Models." }
            ]
        },
        {
            id: "phase-7",
            title: "MLOps & Deployment",
            status: "locked",
            timeRange: "Weeks 31-34",
            progress: 0,
            skills: [
                { id: "p7-s1", name: "Model Serving (APIs)", status: "locked", description: "FastAPI, Flask, Streamlit." },
                { id: "p7-s2", name: "Docker & Cloud", status: "locked", description: "Containerization and Cloud deployment." },
                { id: "p7-s3", name: "Monitoring", status: "locked", description: "Drift detection, Retraining strategies." }
            ]
        },
        {
            id: "phase-8",
            title: "Projects & Portfolio",
            status: "locked",
            timeRange: "Weeks 35-38",
            progress: 0,
            skills: [
                { id: "p8-s1", name: "End-to-End Project", status: "locked", description: "Full pipeline from data to deployment." },
                { id: "p8-s2", name: "Kaggle Competitions", status: "locked", description: "Participate in real-world challenges." },
                { id: "p8-s3", name: "Portfolio Website", status: "locked", description: "Showcase your work effectively." }
            ]
        }
    ]
};
