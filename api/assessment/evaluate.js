import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { questions, answers } = req.body;
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are an intelligent assessment engine.
      PHASE 3: EVALUATION & ANALYSIS
      Questions: ${JSON.stringify(questions)}
      User Answers: ${JSON.stringify(answers)}
      
      Tasks:
      1. Evaluate each answer correctly.
      2. Calculate skill-wise scores (percentage).
      3. Categorize skills as: Strong (≥70%), Good (50–69%), Needs Focus (30–49%), Weak (<30%).
      
      Output ONLY valid JSON in this format:
      {
        "phase": "analysis",
        "analysis": { "Skill Name": 85, "Another Skill": 40 },
        "summary": {
          "strong": ["Skill Name"],
          "good": [],
          "needs_focus": ["Another Skill"],
          "weak": []
        }
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
    console.error("Assessment Error:", error);
    res.status(500).json({ message: "Evaluation failed" });
  }
}
