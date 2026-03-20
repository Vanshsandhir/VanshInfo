import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ref for scrolling
  const chatContainerRef = useRef(null);

  // Auto-scroll effect
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chat, loading]);

  const typeText = (text, callback) => {
    let i = 0;
    let current = "";

    const interval = setInterval(() => {
      current += text[i];
      i++;

      callback(current);

      // Scroll while typing
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, 15);
  };

  const loadingMessages = [
    "Thinking... 🤔",
    "Working on it... ⚡",
    "Almost there... ⏳",
    "Preparing answer... 💡",
  ];

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message;
    setChat((prev) => [...prev, { role: "user", text: userMsg }]);
    setMessage("");
    setLoading(true);

    const response = await fetch("/api/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMsg }),
    });

    const data = await response.json();
    setLoading(false);

    // Add empty bot message for typing animation
    setChat((prev) => [...prev, { role: "bot", text: "" }]);

    typeText(data.reply, (typedText) => {
      setChat((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text = typedText;
        return updated;
      });
    });
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-50"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-slate-900 text-white rounded-xl shadow-xl flex flex-col z-50">
          
          {/* Header */}
          <div className="p-3 border-b border-slate-700 font-bold">
            Vansh AI Assistant
          </div>

          {/* Messages */}
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-3 space-y-3"
          >
            {chat.map((c, i) => (
              <div
                key={i}
                className={`text-sm flex ${
                  c.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-[75%] whitespace-pre-wrap ${
                    c.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-800 text-gray-200"
                  }`}
                >
                  {c.role === "bot" ? (
                    <ReactMarkdown
                      components={{
                        p: (props) => <p className="mb-1" {...props} />,
                        strong: (props) => (
                          <strong className="text-blue-400" {...props} />
                        ),
                        li: (props) => <li className="ml-4 list-disc" {...props} />,
                      }}
                    >
                      {c.text}
                    </ReactMarkdown>
                  ) : (
                    c.text
                  )}
                </div>
              </div>
            ))}

            {/* Loading */}
            {loading && (
              <p className="text-sm text-gray-400">
                {
                  loadingMessages[
                    Math.floor(Math.random() * loadingMessages.length)
                  ]
                }
              </p>
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-slate-700 flex gap-2">
            <input
              className="flex-1 p-2 rounded bg-slate-800"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Ask about Vansh..."
            />
            <button onClick={sendMessage} className="bg-blue-600 px-3 rounded">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
