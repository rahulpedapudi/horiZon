
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
                        "Solve 5 LeetCode Easy problems using Python",
                        "Write a script to parse a CSV file without Pandas"
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
                    practice: ["Implement a Hash Map from scratch"]
                },
                {
                    id: "p1-s3",
                    name: "Git & Version Control",
                    status: "not-started",
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
                    practice: ["Implement matrix multiplication in pure Python", "Visualize vectors using Matplotlib"]
                },
                {
                    id: "p2-s2",
                    name: "Probability & Statistics",
                    status: "locked",
                    description: "Distributions, Bayes rule, hypothesis testing.",
                    resources: [
                        { type: "course", title: "Statistics Fundamentals with Python (DataCamp)", link: "#", level: "Beginner" }
                    ],
                    practice: ["Calculate probabilities of a dataset"]
                },
                {
                    id: "p2-s3",
                    name: "Calculus & Optimization",
                    status: "locked",
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
                {
                    id: "p3-s1",
                    name: "NumPy & Vectors",
                    status: "locked",
                    description: "High-performance array computing.",
                    resources: [
                        { type: "doc", title: "NumPy Quickstart", link: "https://numpy.org/doc/stable/user/quickstart.html", level: "Beginner" },
                        { type: "video", title: "NumPy Tutorial (FreeCodeCamp)", link: "https://www.youtube.com/watch?v=QUT1VHiLmmI", level: "Beginner" }
                    ],
                    practice: [
                        "Perform matrix multiplication and broadcasting operations",
                        "Implement basic statistical functions using NumPy"
                    ]
                },
                {
                    id: "p3-s2",
                    name: "Pandas Proficiency",
                    status: "locked",
                    description: "Data manipulation and analysis.",
                    resources: [
                        { type: "doc", title: "Pandas 10 Minutes", link: "https://pandas.pydata.org/docs/user_guide/10min.html", level: "Beginner" },
                        { type: "course", title: "Data Manipulation with Pandas (Kaggle)", link: "https://www.kaggle.com/learn/pandas", level: "Intermediate" }
                    ],
                    practice: [
                        "Load a CSV, clean missing values, and handle duplicates",
                        "Perform GroupBy and aggregation on a real dataset"
                    ]
                },
                {
                    id: "p3-s3",
                    name: "Data Visualization",
                    status: "locked",
                    description: "Matplotlib, Seaborn, Plotly.",
                    resources: [
                        { type: "doc", title: "Seaborn Gallery", link: "https://seaborn.pydata.org/examples/index.html", level: "Intermediate" },
                        { type: "video", title: "Data Visualization with Python", link: "https://www.youtube.com/watch?v=UO98lJQ3QGI", level: "Beginner" }
                    ],
                    practice: [
                        "Create a dashboard using Plotly Express",
                        "Visualize correlations in a dataset using a heatmap"
                    ]
                }
            ]
        },
        {
            id: "phase-4",
            title: "Core Machine Learning",
            status: "locked",
            timeRange: "Weeks 13-18",
            progress: 0,
            skills: [
                {
                    id: "p4-s1",
                    name: "Supervised Learning",
                    status: "locked",
                    description: "Regression, Classification, SVM, Trees.",
                    resources: [
                        { type: "course", title: "Machine Learning Specialization (Andrew Ng)", link: "https://www.coursera.org/specializations/machine-learning-introduction", level: "Beginner" },
                        { type: "doc", title: "Scikit-Learn Supervised Learning", link: "https://scikit-learn.org/stable/supervised_learning.html", level: "Intermediate" }
                    ],
                    practice: [
                        "Predict housing prices using Linear Regression",
                        "Classify Iris dataset using Decision Trees and SVM"
                    ]
                },
                {
                    id: "p4-s2",
                    name: "Unsupervised Learning",
                    status: "locked",
                    description: "Clustering, PCA, Dimensionality Reduction.",
                    resources: [
                        { type: "video", title: "Unsupervised Learning Explained", link: "#", level: "Intermediate" },
                        { type: "doc", title: "K-Means Clustering Docs", link: "https://scikit-learn.org/stable/modules/clustering.html#k-means", level: "Intermediate" }
                    ],
                    practice: [
                        "Segment customers using K-Means Clustering",
                        "Reduce dimensionality of a dataset using PCA"
                    ]
                },
                {
                    id: "p4-s3",
                    name: "Model Evaluation",
                    status: "locked",
                    description: "Accuracy, Precision, Recall, Cross-validation.",
                    resources: [
                        { type: "article", title: "Understanding Confusion Matrix", link: "#", level: "Beginner" },
                        { type: "doc", title: "Scikit-Learn Metrics", link: "https://scikit-learn.org/stable/modules/model_evaluation.html", level: "Intermediate" }
                    ],
                    practice: [
                        "Implement Cross-Validation on a classification model",
                        "Calculate Precision, Recall, and F1-Score manually"
                    ]
                }
            ]
        },
        {
            id: "phase-5",
            title: "Deep Learning Fundamentals",
            status: "locked",
            timeRange: "Weeks 19-24",
            progress: 0,
            skills: [
                {
                    id: "p5-s1",
                    name: "Neural Networks Basics",
                    status: "locked",
                    description: "Perceptrons, MLPs, Backprop.",
                    resources: [
                        { type: "course", title: "Deep Learning Specialization", link: "https://www.deeplearning.ai/", level: "Intermediate" },
                        { type: "video", title: "3Blue1Brown Neural Networks", link: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi", level: "Beginner" }
                    ],
                    practice: [
                        "Build a simple MLP from scratch using NumPy",
                        "Implement backpropagation manually for a single layer"
                    ]
                },
                {
                    id: "p5-s2",
                    name: "PyTorch / TensorFlow",
                    status: "locked",
                    description: "Framework mastery.",
                    resources: [
                        { type: "doc", title: "PyTorch Tutorials", link: "https://pytorch.org/tutorials/", level: "Intermediate" },
                        { type: "course", title: "TensorFlow Developer Certificate", link: "https://www.coursera.org/professional-certificates/tensorflow-in-practice", level: "Intermediate" }
                    ],
                    practice: [
                        "Train a MNIST classifier using PyTorch/TensorFlow",
                        "Save and load a trained model"
                    ]
                },
                {
                    id: "p5-s3",
                    name: "Training Pipelines",
                    status: "locked",
                    description: "DataLoaders, Experiment tracking.",
                    resources: [
                        { type: "doc", title: "Weights & Biases Quickstart", link: "https://docs.wandb.ai/quickstart", level: "Intermediate" },
                        { type: "article", title: "Efficient Data Loading", link: "#", level: "Advanced" }
                    ],
                    practice: [
                        "Set up a custom DataLoader for image data",
                        "Integrate W&B (or TensorBoard) to track training loss"
                    ]
                }
            ]
        },
        {
            id: "phase-6",
            title: "Specializations (NLP/CV/GenAI)",
            status: "locked",
            timeRange: "Weeks 25-30",
            progress: 0,
            skills: [
                {
                    id: "p6-s1",
                    name: "Natural Language Processing",
                    status: "locked",
                    description: "Transformers, LLMs, RAG.",
                    resources: [
                        { type: "course", title: "Hugging Face Course", link: "https://huggingface.co/course", level: "Intermediate" },
                        { type: "doc", title: "Spacy Documentation", link: "https://spacy.io/", level: "Beginner" }
                    ],
                    practice: [
                        "Fine-tune a BERT model for sentiment analysis",
                        "Build a simple RAG pipeline using LangChain"
                    ]
                },
                {
                    id: "p6-s2",
                    name: "Computer Vision",
                    status: "locked",
                    description: "CNNs, Object Detection, Segmentation.",
                    resources: [
                        { type: "course", title: "CS231n: Convolutional Neural Networks", link: "http://cs231n.stanford.edu/", level: "Advanced" },
                        { type: "video", title: "YOLO Object Detection Explained", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        "Build a CNN to classify CIFAR-10 images",
                        "Implement object detection on a video stream"
                    ]
                },
                {
                    id: "p6-s3",
                    name: "Generative AI",
                    status: "locked",
                    description: "GANs, Diffusion Models.",
                    resources: [
                        { type: "course", title: "Generative AI with LLMs", link: "https://www.coursera.org/learn/generative-ai-with-llms", level: "Advanced" },
                        { type: "doc", title: "Diffusers Library", link: "https://huggingface.co/docs/diffusers/index", level: "Advanced" }
                    ],
                    practice: [
                        "Generate images using Stable Diffusion",
                        "Train a simple GAN on MNIST"
                    ]
                }
            ]
        },
        {
            id: "phase-7",
            title: "MLOps & Deployment",
            status: "locked",
            timeRange: "Weeks 31-34",
            progress: 0,
            skills: [
                {
                    id: "p7-s1",
                    name: "Model Serving (APIs)",
                    status: "locked",
                    description: "FastAPI, Flask, Streamlit.",
                    resources: [
                        { type: "doc", title: "FastAPI Documentation", link: "https://fastapi.tiangolo.com/", level: "Beginner" },
                        { type: "video", title: "Deploy ML Models with Streamlit", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        "Create a FastAPI endpoint to serve predictions",
                        "Build a Streamlit demo for your model"
                    ]
                },
                {
                    id: "p7-s2",
                    name: "Docker & Cloud",
                    status: "locked",
                    description: "Containerization and Cloud deployment.",
                    resources: [
                        { type: "course", title: "Docker for Beginners", link: "#", level: "Beginner" },
                        { type: "doc", title: "AWS SageMaker Docs", link: "https://aws.amazon.com/sagemaker/", level: "Advanced" }
                    ],
                    practice: [
                        "Containerize your model API with Docker",
                        "Deploy the container to a cloud provider (e.g., Render, AWS)"
                    ]
                },
                {
                    id: "p7-s3",
                    name: "Monitoring",
                    status: "locked",
                    description: "Drift detection, Retraining strategies.",
                    resources: [
                        { type: "doc", title: "Evidently AI", link: "https://www.evidentlyai.com/", level: "Intermediate" },
                        { type: "article", title: "A Guide to Data Drift", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        "Simulate data drift and detect it using Evidently",
                        "Set up an alert for model performance degradation"
                    ]
                }
            ]
        },
        {
            id: "phase-8",
            title: "Projects & Portfolio",
            status: "locked",
            timeRange: "Weeks 35-38",
            progress: 0,
            skills: [
                {
                    id: "p8-s1",
                    name: "End-to-End Project",
                    status: "locked",
                    description: "Full pipeline from data to deployment.",
                    resources: [
                        { type: "article", title: "End-to-End ML Project Guide", link: "#", level: "Advanced" }
                    ],
                    practice: [
                        "Build and deploy a complete ML application",
                        "Write a technical blog post about your project"
                    ]
                },
                {
                    id: "p8-s2",
                    name: "Kaggle Competitions",
                    status: "locked",
                    description: "Participate in real-world challenges.",
                    resources: [
                        { type: "website", title: "Kaggle Competitions", link: "https://www.kaggle.com/competitions", level: "All Levels" }
                    ],
                    practice: [
                        "Submit a solution to a live Kaggle competition",
                        "Analyze top-scoring solutions"
                    ]
                },
                {
                    id: "p8-s3",
                    name: "Portfolio Website",
                    status: "locked",
                    description: "Showcase your work effectively.",
                    resources: [
                        { type: "video", title: "Building a Developer Portfolio", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        "Create a personal portfolio website",
                        "Include case studies for your best projects"
                    ]
                }
            ]
        }
    ]
};
