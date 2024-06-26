import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";

dotenv.config();

const app = express();

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.APIKEY);



// ...

async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = "explain the image and give recipe";
  const image = {
    inlineData: {
      data: Buffer.from(fs.readFileSync("cupcake.webp")).toString("base64"),
      mimeType: "image/png",
    },
  };

  const result = await model.generateContent([prompt, image]);

  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
