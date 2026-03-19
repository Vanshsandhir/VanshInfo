import { GoogleGenerativeAI } from '@google/generative-ai';

const client = new GoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY
});

async function listModels() {
  try {
    // The current method is `models.list()`, not `listModels()`
    const response = await client.models.list();
    console.log("Available models:", response);
  } catch (err) {
    console.error("Error listing models:", err);
  }
}

listModels();