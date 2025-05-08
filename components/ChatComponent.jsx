import { useEffect, useRef } from "react";
import TypingEffect from "react-typing-effect";

export default function ChatComponent({ messages }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="chat-container flex-1 overflow-auto p-4">
      <div className="messages space-y-4">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <TypingEffect text={message.text} speed={100} eraseSpeed={50} />
          </div>
        ))}
      </div>
      <div ref={chatEndRef} />
    </div>
  );
}
