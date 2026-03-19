import express from "express";
import cors from "cors";
import { ask } from "../api/ask.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.post("/api/ask", async (req, res) => {
  try {
    const { message } = req.body;

    // ✅ validation
    if (!message || message.trim() === "") {
      return res.status(400).json({ reply: "Message is required" });
    }

    const timeout = setTimeout(() => {
      return res.status(504).json({ reply: "Request timeout" });
    }, 30000);

    const reply = await ask(message);

    clearTimeout(timeout);

    res.json({ reply });
  } catch (err) {
    console.error("API ERROR:", err.response?.data || err.message || err);

    res.status(500).json({
      reply: "Something went wrong. Please try again.",
    });
  }
});

app.listen(3001, () => {
  console.log("Backend running at http://localhost:3001");
});