export const staticAssessmentData = {
    domains: [
        { id: "fullsack", name: "Full Stack Development" },
        { id: "datascience", name: "Data Science & AI" },
        { id: "cloud", name: "Cloud Computing" },
        { id: "cybersecurity", name: "Cybersecurity" },
        { id: "mechanical", name: "Core - Mechanical" },
        { id: "civil", name: "Core - Civil" }
    ],
    questions: {
        "Full Stack Development": {
            "Beginner": [
                {
                    id: 1,
                    skill: "HTML/CSS",
                    question: "Which HTML tag is used to define an internal style sheet?",
                    options: { A: "<css>", B: "<style>", C: "<script>", D: "<link>" },
                    correctAnswer: "B"
                },
                {
                    id: 2,
                    skill: "JavaScript Basics",
                    question: "Which keyword is used to declare a variable that cannot be reassigned in JavaScript?",
                    options: { A: "var", B: "let", C: "const", D: "static" },
                    correctAnswer: "C"
                },
                {
                    id: 3,
                    skill: "React",
                    question: "What hook is used to handle side effects in a functional component?",
                    options: { A: "useState", B: "useEffect", C: "useReducer", D: "useContext" },
                    correctAnswer: "B"
                },
                {
                    id: 4,
                    skill: "Backend",
                    question: "Which HTTP method is typically used to create a new resource on the server?",
                    options: { A: "GET", B: "POST", C: "PUT", D: "DELETE" },
                    correctAnswer: "B"
                },
                {
                    id: 5,
                    skill: "Version Control",
                    question: "Which Git command is used to save your changes to the local repository history?",
                    options: { A: "git add", B: "git commit", C: "git push", D: "git status" },
                    correctAnswer: "B"
                }
            ],
            "Intermediate": [
                {
                    id: 1,
                    skill: "React Architecture",
                    question: "What is the purpose of the virtual DOM in React?",
                    options: { A: "To directly update HTML", B: "To improve performance by minimizing direct DOM manipulation", C: "To store database records", D: "To validate forms" },
                    correctAnswer: "B"
                },
                // ... add more if needed, keeping it to 5 for now as per req
            ]
        },
        "Data Science & AI": {
            "Beginner": [
                {
                    id: 1,
                    skill: "Python",
                    question: "Which library is primarily used for data manipulation in Python?",
                    options: { A: "NumPy", B: "Pandas", C: "Matplotlib", D: "Scikit-learn" },
                    correctAnswer: "B"
                },
                {
                    id: 2,
                    skill: "Machine Learning",
                    question: "What is 'Supervised Learning'?",
                    options: { A: "Learning without data", B: "Learning with labeled data", C: "Learning with unlabeled data", D: "Reinforcement learning" },
                    correctAnswer: "B"
                },
                {
                    id: 3,
                    skill: "Statistics",
                    question: "What does the 'mean' represent in a dataset?",
                    options: { A: "The middle value", B: "The most frequent value", C: "The average value", D: "The range of values" },
                    correctAnswer: "C"
                },
                {
                    id: 4,
                    skill: "Data Visualization",
                    question: "Which type of chart is best for showing trends over time?",
                    options: { A: "Bar chart", B: "Pie chart", C: "Line chart", D: "Scatter plot" },
                    correctAnswer: "C"
                },
                {
                    id: 5,
                    skill: "Deep Learning",
                    question: "What constitutes the basic building block of a Neural Network?",
                    options: { A: "Tree", B: "Neuron (Node)", C: "Cluster", D: "Vector" },
                    correctAnswer: "B"
                }
            ]
        }
    },
    roadmaps: {
        "Full Stack Development": [
            {
                module: "Valid HTML & Semantic Markup",
                reason: "Foundation for accessible and SEO-friendly web pages.",
                topics: ["Semantic Elements", "Accessibility (a11y)", "SEO Basics"]
            },
            {
                module: "Advanced JavaScript Concepts",
                reason: "Crucial for writing efficient React code and backend logic.",
                topics: ["Closures", "Promises & Async/Await", "ES6+ Modules"]
            },
            {
                module: "React Hooks & State Management",
                reason: "Core to building dynamic modern web applications.",
                topics: ["Custom Hooks", "Context API", "Redux/Zustand"]
            },
            {
                module: "Node.js API Design",
                reason: "Essential for connecting frontends to data sources.",
                topics: ["REST Principles", "Express Middleware", "Database Integration"]
            }
        ],
        "Data Science & AI": [
            {
                module: "Python for Data Analysis",
                reason: "The primary language and toolkit for data science.",
                topics: ["Pandas DataFrames", "Data Cleaning", "NumPy Arrays"]
            },
            {
                module: "Exploratory Data Analysis (EDA)",
                reason: "Understanding your data is the first step before modeling.",
                topics: ["Visualization (Seaborn/Matplotlib)", "Statistical Summary", "Handling Missing Data"]
            },
            {
                module: "Machine Learning Fundamentals",
                reason: "Building blocks for predictive modeling.",
                topics: ["Linear Regression", "Classification Algorithms", "Model Evaluation"]
            }
        ]
    }
};
