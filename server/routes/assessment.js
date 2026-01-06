import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const getAIModel = () => {
    const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set');
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
};

// Direct fetch implementation to bypass SDK issues
router.post('/generate-questions', async (req, res) => {
    try {
        const { domain, level } = req.body;
        const apiKey = process.env.GEMINI_API_KEY ? process.env.GEMINI_API_KEY.trim() : "";
        if (!apiKey) throw new Error('GEMINI_API_KEY is not set');

        console.log(`[Assessment] Requesting Gemini for ${domain}...`);

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

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            console.error('[Assessment] Gemini API Error:', errText);
            throw new Error(`Gemini API Failed: ${response.status} ${response.statusText} - ${errText}`);
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        // Clean JSON (remove markdown code blocks if present)
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        res.json(JSON.parse(jsonStr));
    } catch (error) {
        console.error('AI Error:', error);
        res.status(500).json({
            message: error.message,
            stack: error.stack,
            details: error.toString()
        });
    }
});

// Phase 3: Evaluation
router.post('/evaluate', async (req, res) => {
    try {
        const { questions, answers } = req.body;
        const model = getAIModel();

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
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        res.json(JSON.parse(jsonStr));
    } catch (error) {
        console.error('Assessment Error:', error);
        res.status(500).json({ message: 'Evaluation failed' });
    }
});

// Phase 4: Roadmap
router.post('/roadmap', async (req, res) => {
    try {
        const { analysis } = req.body;
        const model = getAIModel();

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
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        res.json(JSON.parse(jsonStr));
    } catch (error) {
        console.error('Roadmap Error:', error);
        res.status(500).json({ message: 'Roadmap generation failed' });
    }
});

export default router;
