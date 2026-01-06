import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { analysis } = req.body;
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an intelligent assessment engine.
      PHASE 4: PERSONALIZED ROADMAP GENERATION
      Analysis Results: ${JSON.stringify(analysis)}
      
      Tasks:
      - Create a personalized learning roadmap.
      - Focus more on weak and needs-focus areas.
      - Follow logical learning order.
      - Keep it beginner-friendly but industry-relevant.
      
      Output ONLY valid JSON in this format:
      {
        "phase": "roadmap",
        "recommended_next_step": "Summary of next step",
        "roadmap": [
          {
            "module": "Module Name",
            "reason": "Why this module",
            "topics": ["Topic 1", "Topic 2"]
          }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonStr = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    res.json(JSON.parse(jsonStr));
  } catch (error) {
    console.error("Roadmap Error:", error);
    res.status(500).json({ message: "Roadmap generation failed" });
  }
}
