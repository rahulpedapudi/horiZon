export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { category = "technology" } = req.query;
    const apiKey = process.env.NEWS_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ message: "News API key not configured" });
    }

    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("NewsAPI request failed");
    }

    const data = await response.json();
    res.json(data.articles);
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ message: "Failed to fetch news" });
  }
}
