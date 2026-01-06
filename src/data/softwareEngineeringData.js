
export const softwareEngineeringData = {
    id: "software-engineer",
    title: "Software Engineer",

    // 1. Intelligence Panel Data
    intelligence: {
        currentDirection: {
            primaryRole: "Software Engineer",
            secondaryRoles: ["Full Stack Developer", "Backend Developer"],
            matchScore: 70, // percentage
        },
        immediateFocus: {
            skill: "Data Structures & Algorithms",
            reason: "Core for all SE interviews",
            timeWindow: "Next 45 days",
        },
        blockingGaps: [
            { skill: "System Design", impact: "High" },
            { skill: "Database Management", impact: "Medium" }
        ]
    },

    // 2. Interactive Roadmap Phases
    phases: [
        {
            id: "se-phase-1",
            title: "Computer Science Fundamentals",
            status: "not-started",
            timeRange: "Weeks 1-6",
            progress: 0,
            skills: [
                {
                    id: "se-p1-s1",
                    name: "Programming Basics (C++/Java/Python)",
                    status: "not-started",
                    description: "Control structures, loops, functions, OOP concepts.",
                    resources: [
                        { type: "course", title: "CS50: Introduction to Computer Science", link: "https://pll.harvard.edu/course/cs50-introduction-computer-science", level: "Beginner" },
                        { type: "doc", title: "W3Schools", link: "https://www.w3schools.com/", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Build a simple calculator", link: "https://www.geeksforgeeks.org/make-simple-calculator-using-python/" },
                        { text: "Implement basic string manipulation functions", link: "https://leetcode.com/tag/string/" }
                    ]
                },
                {
                    id: "se-p1-s2",
                    name: "Data Structures & Algorithms",
                    status: "not-started",
                    description: "Arrays, Linked Lists, Trees, Graphs, Sorting, Searching.",
                    resources: [
                        { type: "video", title: "NeetCode.io", link: "https://neetcode.io/", level: "Intermediate" },
                        { type: "course", title: "Algorithms Part I (Princeton)", link: "https://www.coursera.org/learn/algorithms-part1", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Solve LeetCode Blind 75", link: "https://leetcode.com/discuss/general-discussion/460599/blind-75-leetcode-questions" },
                        { text: "Implement QuickSort and MergeSort", link: "https://www.hackerrank.com/domains/algorithms" }
                    ]
                },
                {
                    id: "se-p1-s3",
                    name: "Version Control (Git)",
                    status: "not-started",
                    description: "Branching, merging, pull requests, resolving conflicts.",
                    resources: [
                        { type: "doc", title: "Pro Git Book", link: "https://git-scm.com/book/en/v2", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Contribute to an open-source repo (fix a typo)", link: "https://github.com/firstcontributions/first-contributions" },
                        { text: "Simulate a merge conflict and resolve it", link: "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line" }
                    ]
                }
            ]
        },
        {
            id: "se-phase-2",
            title: "Web Development Foundations",
            status: "locked",
            timeRange: "Weeks 7-12",
            progress: 0,
            skills: [
                {
                    id: "se-p2-s1",
                    name: "HTML/CSS/JavaScript",
                    status: "locked",
                    description: "The building blocks of the web.",
                    resources: [
                        { type: "doc", title: "MDN Web Docs", link: "https://developer.mozilla.org/en-US/", level: "Beginner" },
                        { type: "course", title: "The Odin Project", link: "https://www.theodinproject.com/", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Build a personal portfolio website", link: "https://www.freecodecamp.org/news/how-to-build-a-portfolio-website-and-deploy-to-digital-ocean/" },
                        { text: "Create a responsive landing page", link: "https://www.frontendmentor.io/challenges" }
                    ]
                },
                {
                    id: "se-p2-s2",
                    name: "Frontend Framework (React)",
                    status: "locked",
                    description: "Components, State, Props, Hooks.",
                    resources: [
                        { type: "doc", title: "React Documentation", link: "https://react.dev/", level: "Intermediate" },
                        { type: "video", title: "React Crash Course", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Build a Todo App with persistent storage", link: "https://react.dev/learn/tutorial-tic-tac-toe" },
                        { text: "Create a weather dashboard using an API", link: "https://openweathermap.org/guide" }
                    ]
                },
                {
                    id: "se-p2-s3",
                    name: "Basic Backend (Node.js/Express)",
                    status: "locked",
                    description: "REST APIs, Servers, Routing.",
                    resources: [
                        { type: "doc", title: "Express.js Guide", link: "https://expressjs.com/", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Build a REST API for a blog", link: "https://roadmap.sh/projects/blog-api" },
                        { text: "Handle basic authentication (JWT)", link: "https://jwt.io/introduction" }
                    ]
                }
            ]
        },
        // ... (truncated for brevity, but logically implementing for all following phases too in a real comprehensive edit)
        {
            id: "se-phase-3",
            title: "Database & Backend Engineering",
            status: "locked",
            timeRange: "Weeks 13-18",
            progress: 0,
            skills: [
                {
                    id: "se-p3-s1",
                    name: "Relational Databases (SQL)",
                    status: "locked",
                    description: "PostgreSQL/MySQL, Normalization, Joins, Indexing.",
                    resources: [
                        { type: "course", title: "SQLBolt", link: "https://sqlbolt.com/", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Design a schema for an e-commerce site", link: "https://dbdiagram.io/d" },
                        { text: "Write complex queries using JOINs and Group By", link: "https://leetcode.com/problemset/database/" }
                    ]
                },
                {
                    id: "se-p3-s2",
                    name: "NoSQL Databases",
                    status: "locked",
                    description: "MongoDB, Redis, Caching strategies.",
                    resources: [
                        { type: "doc", title: "MongoDB University", link: "https://university.mongodb.com/", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Implement Redis caching for an API endpoint", link: "https://redis.io/docs/latest/develop/get-started/" },
                        { text: "Store JSON documents in MongoDB", link: "https://www.mongodb.com/docs/manual/tutorial/insert-documents/" }
                    ]
                },
                {
                    id: "se-p3-s3",
                    name: "API Design & Security",
                    status: "locked",
                    description: "REST vs GraphQL, OAuth, Rate Limiting.",
                    resources: [
                        { type: "article", title: "RESTful API Design Best Practices", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Secure an API with Rate Limiting", link: "https://www.npmjs.com/package/express-rate-limit" },
                        { text: "Implement OAuth2 with Google Login", link: "https://developers.google.com/identity/protocols/oauth2" }
                    ]
                }
            ]
        },
        {
            id: "se-phase-4",
            title: "System Design & Architecture",
            status: "locked",
            timeRange: "Weeks 19-24",
            progress: 0,
            skills: [
                {
                    id: "se-p4-s1",
                    name: "Scalability & Distributed Systems",
                    status: "locked",
                    description: "Load Balancing, Sharding, CAP Theorem.",
                    resources: [
                        { type: "book", title: "System Design Interview (Alex Xu)", link: "#", level: "Advanced" },
                        { type: "article", title: "High Scalability Blog", link: "http://highscalability.com/", level: "Advanced" }
                    ],
                    practice: [
                        { text: "Design a URL shortening service (like Bit.ly)", link: "https://www.educative.io/courses/grokking-the-system-design-interview/m2yDvFnQ3BO" }
                    ]
                },
                {
                    id: "se-p4-s2",
                    name: "Microservices Architecture",
                    status: "locked",
                    description: "Monolith vs Microservices, Event-driven architecture.",
                    resources: [
                        { type: "video", title: "Microservices Design Patterns", link: "#", level: "Advanced" }
                    ],
                    practice: [
                        { text: "Refactor a monolithic service into two microservices", link: "https://microservices.io/patterns/refactoring/strangler-application.html" }
                    ]
                },
                {
                    id: "se-p4-s3",
                    name: "Message Queues & Streaming",
                    status: "locked",
                    description: "Kafka, RabbitMQ, Pub/Sub patterns.",
                    resources: [
                        { type: "doc", title: "RabbitMQ Tutorials", link: "https://www.rabbitmq.com/getstarted.html", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Implement a producer-consumer system with RabbitMQ", link: "https://www.rabbitmq.com/tutorials/tutorial-one-python.html" }
                    ]
                }
            ]
        },
        {
            id: "se-phase-5",
            title: "DevOps & Cloud",
            status: "locked",
            timeRange: "Weeks 25-30",
            progress: 0,
            skills: [
                {
                    id: "se-p5-s1",
                    name: "Containerization (Docker)",
                    status: "locked",
                    description: "Images, Containers, Docker Compose.",
                    resources: [
                        { type: "doc", title: "Docker Get Started", link: "https://docs.docker.com/get-started/", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Dockerize a full-stack application", link: "https://docs.docker.com/compose/gettingstarted/" }
                    ]
                },
                {
                    id: "se-p5-s2",
                    name: "CI/CD Pipelines",
                    status: "locked",
                    description: "GitHub Actions, Jenkins, Automated Testing.",
                    resources: [
                        { type: "doc", title: "GitHub Actions Documentation", link: "https://docs.github.com/en/actions", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Create a pipeline that runs tests on every push", link: "https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing-nodejs" }
                    ]
                },
                {
                    id: "se-p5-s3",
                    name: "Cloud Services (AWS/GCP)",
                    status: "locked",
                    description: "EC2, S3, Lambda, IAM.",
                    resources: [
                        { type: "course", title: "AWS Cloud Practitioner Essentials", link: "https://aws.amazon.com/training/digital/aws-cloud-practitioner-essentials/", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Deploy a static site to AWS S3 + CloudFront", link: "https://aws.amazon.com/getting-started/hands-on/host-static-website/" }
                    ]
                }
            ]
        },
        {
            id: "se-phase-6",
            title: "Advanced Topics & Leadership",
            status: "locked",
            timeRange: "Weeks 31-36",
            progress: 0,
            skills: [
                {
                    id: "se-p6-s1",
                    name: "Web Security",
                    status: "locked",
                    description: "OWASP Top 10, XSS, CSRF, HTTPS.",
                    resources: [
                        { type: "doc", title: "OWASP Top 10", link: "https://owasp.org/www-project-top-ten/", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Audit a sample app for security vulnerabilities", link: "https://owasp.org/www-project-juice-shop/" }
                    ]
                },
                {
                    id: "se-p6-s2",
                    name: "Performance Optimization",
                    status: "locked",
                    description: "Browser rendering, Caching, Database tuning.",
                    resources: [
                        { type: "doc", title: "Web Vitals", link: "https://web.dev/vitals/", level: "Advanced" }
                    ],
                    practice: [
                        { text: "Optimize a React app's performance using Profiler", link: "https://react.dev/reference/react/Profiler" }
                    ]
                },
                {
                    id: "se-p6-s3",
                    name: "Soft Skills & Leadership",
                    status: "locked",
                    description: "Mentoring, Code Reviews, Technical Writing.",
                    resources: [
                        { type: "book", title: "The Staff Engineer's Path", link: "#", level: "All Levels" }
                    ],
                    practice: [
                        { text: "Write a technical design document for a feature", link: "https://stackoverflow.blog/2020/04/06/a-practical-guide-to-writing-technical-specs/" }
                    ]
                }
            ]
        }
    ]
};
