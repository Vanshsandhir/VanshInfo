// api/ask.js
import fs from "fs";
//import { GoogleGenerativeAI } from "@google/generative-ai";

// init Gemini
//const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// 🚀 Gemini API (NO SDK - stable)
const res = await fetch(
  `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    }),
  }
);

const data = await res.json();

console.log("GEMINI RAW:", JSON.stringify(data, null, 2));

const text =
  data?.candidates?.[0]?.content?.parts?.[0]?.text;

return text?.trim() || "I don't know";
// simple similarity scoring
function scoreChunk(chunk, query) {
  const words = query.toLowerCase().split(" ");
  let score = 0;
  words.forEach((w) => {
    if (chunk.toLowerCase().includes(w)) score++;
  });
  return score;
}

// core function
export async function ask(message) {
  // load chunks
  const filePath = new URL("./chunks.json", import.meta.url);
  const chunks = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // rank chunks
  const ranked = chunks
    .map((chunk) => ({ chunk, score: scoreChunk(chunk, message) }))
    .sort((a, b) => b.score - a.score);

  // top 3 chunks
  const topChunks = ranked.slice(0, 3).map((c) => c.chunk).join("\n\n");

  const prompt = `
You are a fast and friendly AI assistant for Vansh Sandhir's portfolio.

GOAL:
Answer quickly with short, clear, engaging responses.

STYLE:
- Keep answers VERY short (1–3 lines max)
- Use simple language
- Use 1–2 emojis 😊
- Break into small lines (no big paragraphs)

STRICT:
- Use ONLY the given context
- If not found, say: "I don't know"

Context:
${topChunks}

Question:
${message}
`;

  // 🚀 Gemini call
  const model = genAI.getGenerativeModel({
    model: "gemini-1.0-pro"
  });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return text || "I don't know";
}

// serverless handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { message } = req.body;
    const reply = await ask(message);
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error" });
  }
}



// // api/ask.js
// import fs from "fs";
// import path from "path";
// //import fetch from "node-fetch";

// // simple similarity scoring
// function scoreChunk(chunk, query) {
//   const words = query.toLowerCase().split(" ");
//   let score = 0;
//   words.forEach((w) => {
//     if (chunk.toLowerCase().includes(w)) score++;
//   });
//   return score;
// }

// // core function
// export async function ask(message) {
//   // load chunks
// const filePath = new URL("./chunks.json", import.meta.url);
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
//       "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`, // ✅ use .env
//       "Content-Type": "application/json",
//       //"HTTP-Referer": "http://localhost:5173", // required
//       "X-Title": "Vansh Chatbot",
//     },
//     body: JSON.stringify({
//       //model: "meta-llama/llama-3.2-7b-instruct:free",
//       model: "nvidia/nemotron-3-super-120b-a12b:free",
//       //temperature: 0.5,   // lower = faster + stable
//       //max_tokens: 80,     // VERY IMPORTANT (reduces delay)
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
