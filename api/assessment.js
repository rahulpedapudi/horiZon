import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Route based on query param: ?action=generate|evaluate|roadmap
  const { action } = req.query;
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    return res.status(500).json({ message: "GEMINI_API_KEY is not set" });
  }

  try {
    if (action === "generate") {
      return await handleGenerate(req, res, apiKey);
    } else if (action === "evaluate") {
      return await handleEvaluate(req, res, apiKey);
    } else if (action === "roadmap") {
      return await handleRoadmap(req, res, apiKey);
    } else {
      return res
        .status(400)
        .json({
          message: "Invalid action. Use ?action=generate|evaluate|roadmap",
        });
    }
  } catch (error) {
    console.error("Assessment Error:", error);
    res.status(500).json({ message: error.message });
  }
}

async function handleGenerate(req, res, apiKey) {
  const { domain, level } = req.body;

  const prompt = `
    You are an intelligent assessment engine.
    PHASE 1: QUESTION GENERATION
    Domain: ${domain}
    Level: ${level}
    Generate exactly 10 multiple-choice questions based ONLY on the selected domain and level.
    Questions must match real industry expectations.
    Difficulty must strictly follow the selected level.
    Each question must have 4 options (A, B, C, D).
    Do NOT provide answers or hints.
    Output ONLY valid JSON in this format:
    {
      "phase": "questions",
      "questions": [
        {
          "id": 1,
          "skill": "Specific Skill Name",
          "question": "Question text",
          "options": { "A": "Opt A", "B": "Opt B", "C": "Opt C", "D": "Opt D" }
        }
      ]
    }
  `;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API Failed: ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;
  const jsonStr = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  res.json(JSON.parse(jsonStr));
}

async function handleEvaluate(req, res, apiKey) {
  const { questions, answers } = req.body;
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
}

async function handleRoadmap(req, res, apiKey) {
  const { analysis } = req.body;
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
}
