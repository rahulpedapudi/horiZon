
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
            status: "not-started",
            timeRange: "Weeks 1-4",
            progress: 0,
            skills: [
                {
                    id: "p1-s1",
                    name: "Python Foundations",
                    status: "not-started",
                    description: "Write clean Python for data/ML and be comfortable with basic CS.",
                    resources: [
                        { type: "course", title: "Python for Everybody (Coursera)", link: "#", level: "Beginner" },
                        { type: "doc", title: "Official Python Tutorial", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Solve 5 LeetCode Easy problems using Python", link: "https://leetcode.com/problemset/all/?difficulty=EASY&tags=python" },
                        { text: "Write a script to parse a CSV file without Pandas", link: "https://docs.python.org/3/library/csv.html" }
                    ]
                },
                {
                    id: "p1-s2",
                    name: "Data Structures & Algorithms",
                    status: "not-started",
                    description: "Understanding lists, dicts, sets, and time/space complexity.",
                    resources: [
                        { type: "video", title: "Data Structures Easy to Advanced", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Implement a Hash Map from scratch", link: "https://www.geeksforgeeks.org/implementation-of-hash-table-in-python-using-separate-chaining/" }
                    ]
                },
                {
                    id: "p1-s3",
                    name: "Git & Version Control",
                    status: "not-started",
                    description: "Basic Git commands and GitHub workflow.",
                    resources: [
                        { type: "video", title: "Git & GitHub Crash Course", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Create a repo, push code, and merge a PR", link: "https://docs.github.com/en/get-started/quickstart/hello-world" }
                    ]
                }
            ]
        },
        {
            id: "phase-2",
            title: "Math for Machine Learning",
            status: "locked",
            timeRange: "Weeks 5-8",
            progress: 0,
            skills: [
                {
                    id: "p2-s1",
                    name: "Linear Algebra",
                    status: "locked",
                    description: "Vectors, matrices, dot products, eigenvalues.",
                    resources: [
                        { type: "course", title: "Mathematics for Machine Learning (Coursera)", link: "#", level: "Intermediate" },
                        { type: "video", title: "Khan Academy Linear Algebra", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Implement matrix multiplication in pure Python", link: "https://www.geeksforgeeks.org/python-program-multiply-two-matrices/" },
                        { text: "Visualize vectors using Matplotlib", link: "https://matplotlib.org/stable/tutorials/index.html" }
                    ]
                },
                {
                    id: "p2-s2",
                    name: "Probability & Statistics",
                    status: "locked",
                    description: "Distributions, Bayes rule, hypothesis testing.",
                    resources: [
                        { type: "course", title: "Statistics Fundamentals with Python (DataCamp)", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Calculate probabilities of a dataset", link: "https://www.kaggle.com/code/hamelg/python-for-data-21-probability-distributions" }
                    ]
                },
                {
                    id: "p2-s3",
                    name: "Calculus & Optimization",
                    status: "locked",
                    description: "Derivatives, gradients, gradient descent.",
                    resources: [
                        { type: "cheat-sheet", title: "DeepLearning.ai Calculus Cheat Sheet", link: "#", level: "Advanced" }
                    ],
                    practice: [
                        { text: "Manually calculate gradient for x^2", link: "https://www.khanacademy.org/math/multivariable-calculus/applications-of-multivariable-derivatives/gradients/a/gradients" }
                    ]
                }
            ]
        },
        // ... (truncated for brevity, but I would continue this pattern for all phases if I could write the whole file, but I should probably just target the first few to demonstrate)
        {
            id: "phase-3",
            title: "Data Handling & Visualization",
            status: "locked",
            timeRange: "Weeks 9-12",
            progress: 0,
            skills: [
                {
                    id: "p3-s1",
                    name: "NumPy & Vectors",
                    status: "locked",
                    description: "High-performance array computing.",
                    resources: [
                        { type: "doc", title: "NumPy Quickstart", link: "https://numpy.org/doc/stable/user/quickstart.html", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Perform matrix multiplication and broadcasting operations", link: "https://numpy.org/doc/stable/user/basics.broadcasting.html" },
                        { text: "Implement basic statistical functions using NumPy", link: "https://www.w3schools.com/python/numpy/numpy_random_distribution.asp" }
                    ]
                },
                {
                    id: "p3-s2",
                    name: "Pandas Proficiency",
                    status: "locked",
                    description: "Data manipulation and analysis.",
                    resources: [
                        { type: "doc", title: "Pandas 10 Minutes", link: "https://pandas.pydata.org/docs/user_guide/10min.html", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Load a CSV, clean missing values, and handle duplicates", link: "https://www.kaggle.com/learn/pandas" },
                        { text: "Perform GroupBy and aggregation on a real dataset", link: "https://pandas.pydata.org/docs/user_guide/groupby.html" }
                    ]
                },
                {
                    id: "p3-s3",
                    name: "Data Visualization",
                    status: "locked",
                    description: "Matplotlib, Seaborn, Plotly.",
                    resources: [
                        { type: "doc", title: "Seaborn Gallery", link: "https://seaborn.pydata.org/examples/index.html", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Create a dashboard using Plotly Express", link: "https://plotly.com/python/plotly-express/" },
                        { text: "Visualize correlations in a dataset using a heatmap", link: "https://seaborn.pydata.org/examples/many_pairwise_correlations.html" }
                    ]
                }
            ]
        },
        {
            id: "phase-4",
            title: "Machine Learning Fundamentals",
            status: "locked",
            timeRange: "Weeks 13-18",
            progress: 0,
            skills: [
                {
                    id: "p4-s1",
                    name: "Supervised Learning",
                    status: "locked",
                    description: "Regression, Classification, Decision Trees, SVMs.",
                    resources: [
                        { type: "course", title: "Andrew Ng's Machine Learning Specialization", link: "https://www.coursera.org/specializations/machine-learning-introduction", level: "Intermediate" },
                        { type: "book", title: "Hands-On Machine Learning (Aurélien Géron)", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Predict housing prices using Linear Regression on Kaggle", link: "https://www.kaggle.com/c/house-prices-advanced-regression-techniques" },
                        { text: "Classify Iris flowers using Decision Trees", link: "https://scikit-learn.org/stable/modules/tree.html" }
                    ]
                },
                {
                    id: "p4-s2",
                    name: "Unsupervised Learning",
                    status: "locked",
                    description: "Clustering (K-Means), Dimensionality Reduction (PCA).",
                    resources: [
                        { type: "video", title: "StatQuest: K-means clustering", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Segment customers using K-Means clustering", link: "https://www.kaggle.com/code/kankana01/customer-segmentation-using-k-means-clustering" },
                        { text: "Reduce dimensions of a large dataset using PCA", link: "https://scikit-learn.org/stable/modules/generated/sklearn.decomposition.PCA.html" }
                    ]
                },
                {
                    id: "p4-s3",
                    name: "Model Evaluation",
                    status: "locked",
                    description: "Cross-validation, ROC/AUC, Precision vs Recall.",
                    resources: [
                        { type: "article", title: "Understanding Confusion Matrices", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Compare multiple models using Cross-Validation", link: "https://scikit-learn.org/stable/modules/cross_validation.html" },
                        { text: "Plot an ROC curve for a classification model", link: "https://scikit-learn.org/stable/auto_examples/model_selection/plot_roc.html" }
                    ]
                }
            ]
        },
        {
            id: "phase-5",
            title: "Deep Learning Foundations",
            status: "locked",
            timeRange: "Weeks 19-24",
            progress: 0,
            skills: [
                {
                    id: "p5-s1",
                    name: "Neural Networks & PyTorch",
                    status: "locked",
                    description: "Perceptrons, Backpropagation, Activation Functions.",
                    resources: [
                        { type: "course", title: "Deep Learning Specialization (Andrew Ng)", link: "https://www.coursera.org/specializations/deep-learning", level: "Advanced" },
                        { type: "doc", title: "PyTorch Tutorials", link: "https://pytorch.org/tutorials/", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Build a multi-layer perceptron for digit recognition (MNIST)", link: "https://pytorch.org/tutorials/beginner/basics/buildmodel_tutorial.html" }
                    ]
                },
                {
                    id: "p5-s2",
                    name: "Convolutional Neural Networks (CNNs)",
                    status: "locked",
                    description: "Image processing, Pooling layers, Transfer Learning.",
                    resources: [
                        { type: "video", title: "CS231n: Convolutional Neural Networks", link: "http://cs231n.stanford.edu/", level: "Advanced" }
                    ],
                    practice: [
                        { text: "Build an image classifier for cats vs dogs", link: "https://www.kaggle.com/c/dogs-vs-cats" }
                    ]
                },
                {
                    id: "p5-s3",
                    name: "Sequence Models (RNNs/LSTMs)",
                    status: "locked",
                    description: "Time series, Natural Language Processing basics.",
                    resources: [
                        { type: "article", title: "The Unreasonable Effectiveness of Recurrent Neural Networks", link: "http://karpathy.github.io/2015/05/21/rnn-effectiveness/", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Create a sentiment analysis model for movie reviews", link: "https://www.kaggle.com/c/sentiment-analysis-on-movie-reviews" }
                    ]
                }
            ]
        },
        {
            id: "phase-6",
            title: "MLOps & Deployment",
            status: "locked",
            timeRange: "Weeks 25-30",
            progress: 0,
            skills: [
                {
                    id: "p6-s1",
                    name: "Model Serving (Flask/FastAPI)",
                    status: "locked",
                    description: "Exposing models as REST APIs.",
                    resources: [
                        { type: "doc", title: "FastAPI User Guide", link: "https://fastapi.tiangolo.com/", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Deploy a prediction API locally using FastAPI", link: "https://fastapi.tiangolo.com/tutorial/first-steps/" },
                        { text: "Containerize your API with Docker", link: "https://docs.docker.com/get-started/" }
                    ]
                },
                {
                    id: "p6-s2",
                    name: "Cloud Deployment",
                    status: "locked",
                    description: "AWS SageMaker, Google Vertex AI, or simple EC2.",
                    resources: [
                        { type: "article", title: "Deploying ML Models on AWS Learning Path", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Deploy your Docker container to AWS Lambda or EC2", link: "https://aws.amazon.com/getting-started/hands-on/deploy-docker-container/" }
                    ]
                },
                {
                    id: "p6-s3",
                    name: "Monitoring & Pipelines",
                    status: "locked",
                    description: "Drift detection, Retraining pipelines (Airflow/MLflow).",
                    resources: [
                        { type: "doc", title: "MLflow Documentation", link: "https://mlflow.org/docs/latest/index.html", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Track model experiments using MLflow", link: "https://mlflow.org/docs/latest/quickstart.html" }
                    ]
                }
            ]
        }
    ]
};
