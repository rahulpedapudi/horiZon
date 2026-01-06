
export const dataAnalystData = {
    id: "data-analyst",
    title: "Data Analyst",

    // 1. Intelligence Panel Data
    intelligence: {
        currentDirection: {
            primaryRole: "Data Analyst",
            secondaryRoles: ["Business Intelligence Analyst", "Product Analyst"],
            matchScore: 80,
        },
        immediateFocus: {
            skill: "SQL & Visualization",
            reason: "The daily drivers of an analyst",
            timeWindow: "Next 30 days",
        },
        blockingGaps: [
            { skill: "Storytelling with Data", impact: "High" },
            { skill: "Statistical Analysis", impact: "Medium" }
        ]
    },

    // 2. Interactive Roadmap Phases
    phases: [
        {
            id: "da-phase-1",
            title: "Analytical Foundations",
            status: "not-started",
            timeRange: "Weeks 1-4",
            progress: 0,
            skills: [
                {
                    id: "da-p1-s1",
                    name: "Excel / Sheets Mastery",
                    status: "not-started",
                    description: "VLOOKUP, Pivot Tables, Power Query, Macros.",
                    resources: [
                        { type: "course", title: "Excel Skills for Business", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Clean a messy dataset using Power Query", link: "https://support.microsoft.com/en-us/office/power-query-101-008b3f46-5b14-4f8b-9a07-d3da1d6d839c" },
                        { text: "Build an interactive dashboard in Excel", link: "https://www.coursera.org/projects/excel-dashboard" }
                    ]
                },
                {
                    id: "da-p1-s2",
                    name: "Basic Statistics",
                    status: "not-started",
                    description: "Mean, Median, Mode, Standard Deviation, Distributions.",
                    resources: [
                        { type: "course", title: "Khan Academy Statistics", link: "https://www.khanacademy.org/math/statistics-probability", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Analyze a dataset to find outliers", link: "https://www.kaggle.com/code/nareshbhat/outlier-detection-101-with-python" },
                        { text: "Calculate correlations between variables", link: "https://www.statisticshowto.com/probability-and-statistics/correlation-coefficient-formula/" }
                    ]
                },
                {
                    id: "da-p1-s3",
                    name: "Data Literacy",
                    status: "not-started",
                    description: "Understanding data types, bias, and context.",
                    resources: [
                        { type: "book", title: "Naked Statistics", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Critique a misleading chart from the news", link: "https://viz.wtf/" }
                    ]
                }
            ]
        },
        {
            id: "da-phase-2",
            title: "SQL & Databases",
            status: "locked",
            timeRange: "Weeks 5-10",
            progress: 0,
            skills: [
                {
                    id: "da-p2-s1",
                    name: "SQL Basics",
                    status: "locked",
                    description: "SELECT, FROM, WHERE, GROUP BY, ORDER BY.",
                    resources: [
                        { type: "course", title: "SQL for Data Science (Coursera)", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Query a music store database to find top artists", link: "https://www.sqlitetutorial.net/sqlite-sample-database/" }
                    ]
                },
                {
                    id: "da-p2-s2",
                    name: "Intermediate SQL",
                    status: "locked",
                    description: "Joins, Unions, Subqueries, CTEs.",
                    resources: [
                        { type: "site", title: "Mode Analytics SQL Tutorial", link: "https://mode.com/sql-tutorial/", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Perform cohort analysis using self-joins", link: "https://www.holistics.io/blog/calculate-cohort-retention-analysis-with-sql/" },
                        { text: "Calculate retention rates", link: "https://mode.com/sql-tutorial/sql-window-functions-for-analytics/" }
                    ]
                },
                {
                    id: "da-p2-s3",
                    name: "Database Concepts",
                    status: "locked",
                    description: "Primary Keys, Foreign Keys, Schemas.",
                    resources: [
                        { type: "video", title: "Relational Databases Explained", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Draw an ER diagram for a library system", link: "https://www.lucidchart.com/pages/er-diagrams" }
                    ]
                }
            ]
        },
        {
            id: "da-phase-3",
            title: "Data Visualization & BI",
            status: "locked",
            timeRange: "Weeks 11-16",
            progress: 0,
            skills: [
                {
                    id: "da-p3-s1",
                    name: "Tableau / PowerBI",
                    status: "locked",
                    description: "Connecting data, Calculated Fields, Dashboard design.",
                    resources: [
                        { type: "course", title: "Tableau 2024 A-Z", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Create a sales executive dashboard", link: "https://public.tableau.com/en-us/s/gallery" },
                        { text: "Visualize geographical data on a map", link: "https://help.tableau.com/current/pro/desktop/en-us/maps_howto_basic.htm" }
                    ]
                },
                {
                    id: "da-p3-s2",
                    name: "Data Storytelling",
                    status: "locked",
                    description: "Choosing the right chart, color theory, narrative flow.",
                    resources: [
                        { type: "book", title: "Storytelling with Data (Cole Knaflic)", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Present your dashboard findings to a friend (simulated stakeholder)", link: "https://www.storytellingwithdata.com/blog" }
                    ]
                },
                {
                    id: "da-p3-s3",
                    name: "Dashboard Optimization",
                    status: "locked",
                    description: "Performance, User experience (UX) for dashboards.",
                    resources: [
                        { type: "article", title: "Dashboard Design Best Practices", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Refactor a cluttered dashboard into a clean one", link: "https://www.geckoboard.com/best-practice/dashboard-design/" }
                    ]
                }
            ]
        },
        {
            id: "da-phase-4",
            title: "Python for Analytics",
            status: "locked",
            timeRange: "Weeks 17-22",
            progress: 0,
            skills: [
                {
                    id: "da-p4-s1",
                    name: "Python Basics",
                    status: "locked",
                    description: "Variables, Lists, Dictionaries, Loops.",
                    resources: [
                        { type: "course", title: "Automate the Boring Stuff with Python", link: "https://automatetheboringstuff.com/", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Write a script to rename files in bulk", link: "https://www.geeksforgeeks.org/rename-multiple-files-using-python/" }
                    ]
                },
                {
                    id: "da-p4-s2",
                    name: "Pandas & NumPy",
                    status: "locked",
                    description: "DataFrames, Data Cleaning, Manipulation.",
                    resources: [
                        { type: "doc", title: "Pandas User Guide", link: "https://pandas.pydata.org/docs/user_guide/", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Clean a dataset with missing values and wrong formats", link: "https://www.kaggle.com/learn/data-cleaning" },
                        { text: "Merge multiple CSV files into one DataFrame", link: "https://pandas.pydata.org/docs/user_guide/merging.html" }
                    ]
                },
                {
                    id: "da-p4-s3",
                    name: "Exploratory Data Analysis (EDA)",
                    status: "locked",
                    description: "Matplotlib, Seaborn, finding patterns.",
                    resources: [
                        { type: "video", title: "EDA with Python", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Perform EDA on the Titanic dataset", link: "https://www.kaggle.com/c/titanic" },
                        { text: "Visualize correlation heatmaps", link: "https://seaborn.pydata.org/generated/seaborn.heatmap.html" }
                    ]
                }
            ]
        },
        {
            id: "da-phase-5",
            title: "Advanced Statistics & Experimentation",
            status: "locked",
            timeRange: "Weeks 23-28",
            progress: 0,
            skills: [
                {
                    id: "da-p5-s1",
                    name: "Hypothesis Testing",
                    status: "locked",
                    description: "p-values, t-tests, ANOVA.",
                    resources: [
                        { type: "course", title: "Inferential Statistics", link: "#", level: "Advanced" }
                    ],
                    practice: [
                        { text: "Test if a website change significantly improved clicks", link: "https://www.optimizely.com/optimization-glossary/hypothesis-testing/" }
                    ]
                },
                {
                    id: "da-p5-s2",
                    name: "A/B Testing",
                    status: "locked",
                    description: "Experiment design, Sample size calculation.",
                    resources: [
                        { type: "article", title: "A/B Testing Guide for Analysts", link: "#", level: "Advanced" }
                    ],
                    practice: [
                        { text: "Design an A/B test for an email campaign", link: "https://vwo.com/ab-testing/" }
                    ]
                },
                {
                    id: "da-p5-s3",
                    name: "Regression Analysis",
                    status: "locked",
                    description: "Linear and Logistic Regression for prediction.",
                    resources: [
                        { type: "course", title: "Machine Learning for Analysts", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Predict house prices based on features", link: "https://www.kaggle.com/c/house-prices-advanced-regression-techniques" }
                    ]
                }
            ]
        },
        {
            id: "da-phase-6",
            title: "Business Strategic Thinking",
            status: "locked",
            timeRange: "Weeks 29-32",
            progress: 0,
            skills: [
                {
                    id: "da-p6-s1",
                    name: "Metric Definition",
                    status: "locked",
                    description: "KPIs, DAU/MAU, Churn, CLV.",
                    resources: [
                        { type: "book", title: "Lean Analytics", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Define success metrics for a new product feature", link: "https://www.atlassian.com/agile/product-management/metrics" }
                    ]
                },
                {
                    id: "da-p6-s2",
                    name: "Product Analytics",
                    status: "locked",
                    description: "Funnels, User Segmentation.",
                    resources: [
                        { type: "article", title: "The Product Analyst's Guide", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Analyze where users drop off in a signup flow", link: "https://mixpanel.com/blog/funnel-analysis/" }
                    ]
                },
                {
                    id: "da-p6-s3",
                    name: "Communication",
                    status: "locked",
                    description: "Translating technical findings to business impact.",
                    resources: [
                        { type: "video", title: "Executive Communication", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Write a 1-page executive summary of your analysis", link: "https://www.consulting.com/executive-summary-example" }
                    ]
                }
            ]
        }
    ]
};
