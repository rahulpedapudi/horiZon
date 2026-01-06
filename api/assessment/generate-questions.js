export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { domain, level } = req.body;
    const apiKey = process.env.GEMINI_API_KEY?.trim();

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set");
    }

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
      const errText = await response.text();
      console.error("[Assessment] Gemini API Error:", errText);
      throw new Error(
        `Gemini API Failed: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    const text = data.candidates[0].content.parts[0].text;
    const jsonStr = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    res.json(JSON.parse(jsonStr));
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({
      message: error.message,
      details: error.toString(),
    });
  }
}
