// // api/ask.js
// import fs from "fs";
// import path from "path";
// import fetch from "node-fetch";

// // simple similarity scoring
// function scoreChunk(chunk, query) {
//   const chunkWords = chunk.toLowerCase();
//   const queryWords = query.toLowerCase().split(" ");

//   let score = 0;

//   queryWords.forEach((word) => {
//     if (word.length > 2 && chunkWords.includes(word)) {
//       score += 2; // higher weight
//     }
//   });

//   // boost for keywords
//   if (query.includes("project") && chunk.toLowerCase().includes("project")) {
//     score += 5;
//   }

//   return score;
// }

// // core function
// export async function ask(message) {
//   // load chunks
//  const filePath = new URL("../chunks.json", import.meta.url);
// const chunks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

//   // rank chunks
//   const ranked = chunks
//     .map((chunk) => ({ chunk, score: scoreChunk(chunk, message) }))
//     .sort((a, b) => b.score - a.score);

//   // take top 3 (you can increase to 5 later)
//   const topChunks = ranked.slice(0, 3).map((c) => c.chunk).join("\n\n");

// const prompt = `
// You are a fast and friendly AI assistant for Vansh Sandhir's portfolio.

// GOAL:
// Answer quickly with short, clear, engaging responses.

// STYLE:
// - Keep answers VERY short (1–3 lines max)
// - Use simple language
// - Use 1–2 emojis 😊
// - Break into small lines (no big paragraphs)

// STRICT:
// - Use ONLY the given context
// - If not found, say: "I don't know"

// IMPORTANT:
// - Give the fastest possible response
// - Prefer short answers over detailed ones

// Context:
// ${topChunks}

// Question:
// ${message}
// `;

//   // 🔥 OpenRouter API call
//   const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Authorization": `Bearer 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`, // ✅ use .env
//       "Content-Type": "application/json",
//       "HTTP-Referer": "http://localhost:5173", // required
//       "X-Title": "Vansh Chatbot",
//     },
//     body: JSON.stringify({
//       model: "openchat/openchat-7b:free",
//       temperature: 0.5,   // lower = faster + stable
//       max_tokens: 80,     // VERY IMPORTANT (reduces delay)
//       messages: [
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//     }),
//   });

//   const data = await res.json();

//   console.log("OPENROUTER RESPONSE:", data);

//   // safe return
//   return data.choices?.[0]?.message?.content || "I don't know";
// }

// // optional: serverless handler (same as before)
// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Only POST allowed" });
//   }

//   try {
//     const { message } = req.body;
//     const reply = await ask(message);
//     res.status(200).json({ reply });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Error" });
//   }
// }

// api/ask.js
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

function scoreChunk(chunk, query) {
  const chunkWords = chunk.toLowerCase();
  const queryWords = query.toLowerCase().split(" ");
  let score = 0;
  queryWords.forEach((word) => {
    if (word.length > 2 && chunkWords.includes(word)) score += 2;
  });
  if (query.includes("project") && chunk.toLowerCase().includes("project")) score += 5;
  return score;
}

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  try {
    const { message } = req.body;
    if (!message || message.trim() === "") return res.status(400).json({ reply: "Message is required" });

    // load chunks
    const filePath = new URL("../chunks.json", import.meta.url); 
    const chunks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // rank top 3
    const ranked = chunks.map((chunk) => ({ chunk, score: scoreChunk(chunk, message) }))
                         .sort((a, b) => b.score - a.score);
    const topChunks = ranked.slice(0, 3).map(c => c.chunk).join("\n\n");

    const prompt = `
You are a fast and friendly AI assistant for Vansh Sandhir's portfolio.
GOAL: Answer quickly with short, clear, engaging responses.
STYLE: 1-3 lines, 1-2 emojis, break into small lines
STRICT: Use ONLY the context, if not found: "I don't know"

Context:
${topChunks}

Question:
${message}
`;

    const resAI = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer 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`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openchat/openchat-7b:free",
        temperature: 0.3,
        max_tokens: 80,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await resAI.json();
    const reply = data.choices?.[0]?.message?.content || "I don't know";

    res.status(200).json({ reply });

  } catch (err) {
    console.error("API ERROR:", err);
    res.status(500).json({ reply: "Something went wrong. Please try again." });
  }
}