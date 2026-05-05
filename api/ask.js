// api/ask.js
import fs from "fs";

// simple similarity scoring
function scoreChunk(chunk, query) {
  const words = query.toLowerCase().split(" ");
  let score = 0;
  words.forEach((w) => {
    if (chunk.toLowerCase().includes(w)) score++;
  });
  return score;
}

// core logic
async function ask(message) {
  const filePath = new URL("./chunks.json", import.meta.url);
  const chunks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const ranked = chunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, message) }))
    .sort((a, b) => b.score - a.score);

  const topChunks = ranked.slice(0, 5).map((c) => c.chunk).join("\n\n");

  const prompt = `
You are a friendly, smart, and conversational AI assistant for Vansh Sandhir's portfolio.

PERSONALITY:
- Sound natural and human-like (like ChatGPT)
- Be slightly conversational and engaging
- Show a bit of personality (warm, helpful, confident)

STYLE:
- Keep answers short (2–4 lines)
- Use simple, clear language
- Use 1 emoji when it fits naturally (not forced)
- Break into small lines for readability

BEHAVIOR:
- Answer directly and clearly
- If helpful, add a tiny bit of extra context or insight
- Avoid sounding robotic or repetitive

STRICT RULE:
- Use ONLY the provided context
- If the answer is not in the context, say: "I'm not sure about that yet 🙂"

Context:
${topChunks}

User Question:
${message}

Answer:
`;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 100,
        temperature: 0.5,
      }),
    });

    const data = await res.json();

    console.log("GROQ RESPONSE:", data);

    return data?.choices?.[0]?.message?.content || "I don't know";

  } catch (err) {
    console.error("Groq Error:", err);
    return "Error";
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    const reply = await ask(message);

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("API ERROR:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
