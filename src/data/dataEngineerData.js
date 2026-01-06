
export const dataEngineerData = {
    id: "data-engineer",
    title: "Data Engineer",

    // 1. Intelligence Panel Data
    intelligence: {
        currentDirection: {
            primaryRole: "Data Engineer",
            secondaryRoles: ["Big Data Developer", "ETL Developer"],
            matchScore: 65,
        },
        immediateFocus: {
            skill: "SQL & Data Modeling",
            reason: "The foundation of all data pipelines",
            timeWindow: "Next 30 days",
        },
        blockingGaps: [
            { skill: "Distributed Computing (Spark)", impact: "High" },
            { skill: "Cloud Platforms (AWS/GCP)", impact: "Medium" }
        ]
    },

    // 2. Interactive Roadmap Phases
    phases: [
        {
            id: "de-phase-1",
            title: "Foundations: Code & Systems",
            status: "not-started",
            timeRange: "Weeks 1-6",
            progress: 0,
            skills: [
                {
                    id: "de-p1-s1",
                    name: "Advanced Python",
                    status: "not-started",
                    description: "Scripting, OOP, Pandas, Functional programming.",
                    resources: [
                        { type: "course", title: "Python for Data Engineering", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Write a script to parse irregular log files", link: "https://www.geeksforgeeks.org/how-to-parse-log-files-in-python/" },
                        { text: "Build a CLI tool for data validation", link: "https://typer.tiangolo.com/" }
                    ]
                },
                {
                    id: "de-p1-s2",
                    name: "Linux & Shell Scripting",
                    status: "not-started",
                    description: "Terminal mastery, Cron jobs, SSH, Bash scripting.",
                    resources: [
                        { type: "site", title: "Linux Survival", link: "https://linuxsurvival.com/", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Automate a daily file backup with Cron", link: "https://www.digitalocean.com/community/tutorials/how-to-use-cron-to-automate-tasks-ubuntu-1804" },
                        { text: "Write a bash script to check system health", link: "https://www.tecmint.com/linux-server-health-monitoring-script/" }
                    ]
                },
                {
                    id: "de-p1-s3",
                    name: "Advanced SQL",
                    status: "not-started",
                    description: "Window functions, stored procedures, query optimization.",
                    resources: [
                        { type: "course", title: "Advanced SQL for Data Engineers", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Optimize a slow-running large JOIN query", link: "https://use-the-index-luke.com/" },
                        { text: "Implement time-series analysis using Window Functions", link: "https://mode.com/sql-tutorial/sql-window-functions/" }
                    ]
                }
            ]
        },
        {
            id: "de-phase-2",
            title: "Data Warehousing & Modeling",
            status: "locked",
            timeRange: "Weeks 7-12",
            progress: 0,
            skills: [
                {
                    id: "de-p2-s1",
                    name: "Data Modeling",
                    status: "locked",
                    description: "Star Schema, Snowflake Schema, Normalization vs Denormalization.",
                    resources: [
                        { type: "book", title: "The Data Warehouse Toolkit (Kimball)", link: "#", level: "Advanced" }
                    ],
                    practice: [
                        { text: "Design a Star Schema for a Retail Sales DB", link: "https://www.databricks.com/glossary/star-schema" },
                        { text: "Convert a 3NF schema to a Star Schema", link: "https://www.guru99.com/star-snowflake-data-warehousing.html" }
                    ]
                },
                {
                    id: "de-p2-s2",
                    name: "Data Warehousing (Snowflake/BigQuery)",
                    status: "locked",
                    description: "OLAP concepts, Columnar storage, Partitioning.",
                    resources: [
                        { type: "doc", title: "Snowflake Documentation", link: "https://docs.snowflake.com/", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Load JSON data into Snowflake/BigQuery", link: "https://docs.snowflake.com/en/user-guide/data-load-considerations-load-prepare" },
                        { text: "Implement partitioning for a large table", link: "https://cloud.google.com/bigquery/docs/partitioned-tables" }
                    ]
                },
                {
                    id: "de-p2-s3",
                    name: "ETL vs ELT",
                    status: "locked",
                    description: "Extract, Transform, Load paradigms.",
                    resources: [
                        { type: "article", title: "Modern Data Stack: ETL vs ELT", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Build a simple ETL pipeline with Python", link: "https://towardsdatascience.com/building-a-simple-etl-pipeline-in-python-6500732386da" }
                    ]
                }
            ]
        },
        // ... (truncated)
        {
            id: "de-phase-3",
            title: "Big Data Frameworks",
            status: "locked",
            timeRange: "Weeks 13-18",
            progress: 0,
            skills: [
                {
                    id: "de-p3-s1",
                    name: "Apache Spark",
                    status: "locked",
                    description: "Distributed processing, RDDs, DataFrames, PySpark.",
                    resources: [
                        { type: "course", title: "Spark & PySpark for Big Data", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Process a 1GB+ dataset using PySpark locally", link: "https://spark.apache.org/docs/latest/api/python/getting_started/index.html" },
                        { text: "Perform complex aggregations on distributed data", link: "https://spark.apache.org/docs/latest/sql-getting-started.html" }
                    ]
                },
                {
                    id: "de-p3-s2",
                    name: "Hadoop Ecosystem",
                    status: "locked",
                    description: "HDFS, MapReduce (conceptual), Hive.",
                    resources: [
                        { type: "video", title: "Hadoop Architecture Explained", link: "#", level: "Beginner" }
                    ],
                    practice: [
                        { text: "Write a Hive query to analyze logs", link: "https://hive.apache.org/" }
                    ]
                },
                {
                    id: "de-p3-s3",
                    name: "Data Lakes",
                    status: "locked",
                    description: "Storage formats (Parquet, Avro, Delta Lake).",
                    resources: [
                        { type: "doc", title: "Delta Lake Guide", link: "https://delta.io/", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Convert CSVs to Parquet partitions", link: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.to_parquet.html" },
                        { text: "Implement ACID transactions with Delta Lake", link: "https://docs.delta.io/latest/quick-start.html" }
                    ]
                }
            ]
        },
        {
            id: "de-phase-4",
            title: "Data Pipelines & Orchestration",
            status: "locked",
            timeRange: "Weeks 19-24",
            progress: 0,
            skills: [
                {
                    id: "de-p4-s1",
                    name: "Workflow Orchestration (Airflow)",
                    status: "locked",
                    description: "DAGs, Operators, Scheduling.",
                    resources: [
                        { type: "doc", title: "Apache Airflow Documentation", link: "https://airflow.apache.org/docs/", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Create a DAG to run an ETL job daily", link: "https://airflow.apache.org/docs/apache-airflow/stable/start.html" },
                        { text: "Handle dependencies and retries in Airflow", link: "https://marclamberti.com/blog/airflow-retries/" }
                    ]
                },
                {
                    id: "de-p4-s2",
                    name: "Containerization in Pipelines",
                    status: "locked",
                    description: "Docker, Kubernetes (basics), Helm.",
                    resources: [
                        { type: "course", title: "Docker & Kubernetes for Data Engineers", link: "#", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Run Airflow in Docker using Docker Compose", link: "https://airflow.apache.org/docs/apache-airflow/stable/howto/docker-compose/index.html" }
                    ]
                },
                {
                    id: "de-p4-s3",
                    name: "Data Quality & Testing",
                    status: "locked",
                    description: "Great Expectations, dbt tests.",
                    resources: [
                        { type: "doc", title: "Great Expectations Tutorial", link: "https://greatexpectations.io/get-started", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Validate incoming data schema with Great Expectations", link: "https://docs.greatexpectations.io/docs/" }
                    ]
                }
            ]
        },
        {
            id: "de-phase-5",
            title: "Streaming & Real-Time Data",
            status: "locked",
            timeRange: "Weeks 25-30",
            progress: 0,
            skills: [
                {
                    id: "de-p5-s1",
                    name: "Message Brokers (Kafka)",
                    status: "locked",
                    description: "Topics, Partitions, Producers, Consumers.",
                    resources: [
                        { type: "doc", title: "Apache Kafka Intro", link: "https://kafka.apache.org/intro", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Set up a Kafka cluster locally", link: "https://kafka.apache.org/quickstart" },
                        { text: "Write a stream processing application", link: "https://github.com/confluentinc/kafka-streams-examples" }
                    ]
                },
                {
                    id: "de-p5-s2",
                    name: "Stream Processing (Flink/Spark Streaming)",
                    status: "locked",
                    description: "Windowing, Stateful processing.",
                    resources: [
                        { type: "doc", title: "Spark Structured Streaming", link: "https://spark.apache.org/docs/latest/structured-streaming-programming-guide.html", level: "Advanced" }
                    ],
                    practice: [
                        { text: "Build a real-time fraud detection pipeline", link: "https://www.databricks.com/blog/2019/11/18/detecting-financial-fraud-at-scale-with-decision-trees-and-mlflow-on-databricks.html" }
                    ]
                },
                {
                    id: "de-p5-s3",
                    name: "Change Data Capture (CDC)",
                    status: "locked",
                    description: "Debezium, Replicating DB changes.",
                    resources: [
                        { type: "article", title: "What is CDC?", link: "#", level: "Advanced" }
                    ],
                    practice: [
                        { text: "Capture changes from Postgres to Kafka using Debezium", link: "https://debezium.io/documentation/reference/stable/tutorial.html" }
                    ]
                }
            ]
        },
        {
            id: "de-phase-6",
            title: "Cloud Infrastructure & FinOps",
            status: "locked",
            timeRange: "Weeks 31-36",
            progress: 0,
            skills: [
                {
                    id: "de-p6-s1",
                    name: "Infrastructure as Code (Terraform)",
                    status: "locked",
                    description: "Provisioning resources, State management.",
                    resources: [
                        { type: "doc", title: "Terraform Get Started", link: "https://developer.hashicorp.com/terraform/intro", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Provision an S3 bucket and EC2 instance with Terraform", link: "https://developer.hashicorp.com/terraform/tutorials/aws/aws-build" }
                    ]
                },
                {
                    id: "de-p6-s2",
                    name: "Cloud Security (IAM)",
                    status: "locked",
                    description: "Roles, Policies, Encryption.",
                    resources: [
                        { type: "doc", title: "AWS IAM Best Practices", link: "https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html", level: "Intermediate" }
                    ],
                    practice: [
                        { text: "Configure least-privilege access for a data pipeline role", link: "https://aws.amazon.com/blogs/security/techniques-for-writing-least-privilege-iam-policies/" }
                    ]
                },
                {
                    id: "de-p6-s3",
                    name: "CI/CD for Data",
                    status: "locked",
                    description: "Automating deployments of data jobs.",
                    resources: [
                        { type: "article", title: "DataOps Principles", link: "#", level: "Advanced" }
                    ],
                    practice: [
                        { text: "Set up a CI pipeline for dbt models", link: "https://docs.getdbt.com/docs/deploy/deploy-your-project" }
                    ]
                }
            ]
        }
    ]
};
