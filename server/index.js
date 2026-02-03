import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OpenAI API key missing");
  process.exit(1);
}

const app = express();
app.use(express.json());
app.use(cors())
// Create OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Chat API
app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: message,
    });

    res.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error(error);
  
    if (error.code === "insufficient_quota") {
      return res.status(429).json({
        error: "API quota exceeded. Please check billing.",
      });
    }
  
    res.status(500).json({ error: "Server error" });
  }
  
});


// Server
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
