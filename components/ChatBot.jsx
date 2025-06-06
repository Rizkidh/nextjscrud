"use client";

import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import "animate.css";
import ReactMarkdown from "react-markdown";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const telegramBotUsername = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME;

let genAI;
if (apiKey) {
  genAI = new GoogleGenerativeAI(apiKey);
}

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) {
      setError("Please enter a message");
      return;
    }

    if (input.length > 5000) {
      setError("Message too long (max 5000 characters)");
      return;
    }

    setError(null);
    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setLoading(true);

    try {
      if (!genAI) {
        throw new Error("Gemini API key is missing or invalid");
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(input);
      const response = result.response;
      const text = response.text();

      setMessages((prev) => [...prev, { type: "bot", text }]);
    } catch (err) {
      console.error("Gemini API error:", err);
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: `❌ Error: ${err.message || "Unknown error"}` },
      ]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <main className="fixed w-full h-full bg-gray-900 text-white pt-16 sm:pt-20 overflow-hidden pb-10">
      <div className="flex flex-col h-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-gray-800 shadow p-4 text-center text-xl sm:text-2xl font-semibold">
          Gemini 1.5 ChatBot (Next.js)
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-4 flex flex-col">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`animate__animated animate__fadeIn max-w-[85%] sm:max-w-[75%] md:max-w-[65%] px-4 py-2 rounded-lg text-sm sm:text-base break-words shadow-md transition-all duration-300 ${
                  msg.type === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : msg.text.startsWith("❌ Error")
                    ? "bg-red-600 text-white font-mono rounded-bl-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none dark:bg-gray-700 dark:text-white"
                }`}
              >
                {msg.type === "bot" && !msg.text.startsWith("❌ Error") ? (
                  <div className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-xl font-semibold mt-4 mb-2" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-lg font-medium mt-3 mb-1" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-2 leading-relaxed" {...props} />,
                        li: ({ node, ...props }) => <li className="list-disc list-inside" {...props} />,
                        code: ({ node, inline, className, children, ...props }) =>
                          inline ? (
                            <code className="bg-gray-200 dark:bg-gray-700 px-1 rounded" {...props}>
                              {children}
                            </code>
                          ) : (
                            <pre className="bg-gray-100 dark:bg-gray-800 text-sm p-2 rounded overflow-x-auto">
                              <code {...props}>{children}</code>
                            </pre>
                          ),
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-lg rounded-bl-none shadow animate-pulse">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-100"></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef}></div>
        </div>

        {/* Input Area */}
        <div className="bg-gray-800 p-3 sm:p-4 border-t border-gray-700 w-full">
          {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 mx-auto max-w-3xl w-full"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setError(null);
              }}
              placeholder="Type a message..."
              className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 disabled:opacity-70"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm sm:text-base"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 mx-auto text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : (
                "Send"
              )}
            </button>
          </form>

          {/* Telegram Bot Link */}
          {telegramBotUsername && (
            <p className="text-xs text-gray-400 text-center mt-3">
              Chat with me on Telegram:{" "}
              <a
                href={`https://t.me/${telegramBotUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                @{telegramBotUsername}
              </a>
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default ChatBot;
