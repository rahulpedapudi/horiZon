export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { limit = 20 } = req.query;
    const response = await fetch("https://remotive.com/api/remote-jobs");

    if (!response.ok) {
      throw new Error("Remotive API request failed");
    }

    const data = await response.json();
    const jobs = data.jobs ? data.jobs.slice(0, parseInt(limit)) : [];

    res.json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
}
