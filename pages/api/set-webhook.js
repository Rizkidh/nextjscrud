// pages/api/set-webhook.js

export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }
  
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const webhookUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/telegram`;
  
    try {
      const tgRes = await fetch(
        `https://api.telegram.org/bot${botToken}/setWebhook`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: webhookUrl }),
        }
      );
      const data = await tgRes.json();
  
      if (data.ok) {
        return res.status(200).json({ message: "Webhook set successfully" });
      } else {
        return res.status(500).json({ message: "Failed to set webhook", error: data });
      }
    } catch (err) {
      return res.status(500).json({ message: "Unexpected error", error: err.message });
    }
  }
  