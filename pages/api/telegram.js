// pages/api/telegram.js

import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const chatMessage = req.body?.message?.text;
  const chatId = req.body?.message?.chat?.id;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!chatMessage || !chatId) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(chatMessage);
    const replyText = result.response.text();

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: replyText }),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Telegram Handler Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
