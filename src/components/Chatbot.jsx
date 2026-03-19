import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";

const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

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

    setChat((prev) => [...prev, { role: "bot", text: data.reply }]);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-300 text-white p-4 rounded-full shadow-[0_0_25px_rgba(59,130,246,0.6)] z-50 border border-white/20"
      >
        <Sparkles />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 80, scale: 0.85 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-20 right-6 w-[380px] h-[520px] rounded-3xl shadow-2xl flex flex-col z-50 overflow-hidden border border-blue-300/30"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #0b1220 40%, #0a1a2f 100%)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-blue-400/20 bg-gradient-to-r from-blue-500/10 to-cyan-400/10">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Bot className="text-blue-300" size={18} />
                  <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-black"></span>
                </div>
                <span className="font-semibold tracking-wide text-blue-100">
                  Vansh AI
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
              {chat.map((c, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${
                    c.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {c.role === "bot" && (
                    <Bot size={16} className="text-blue-400 mt-1" />
                  )}

                  <div
                    className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm leading-relaxed backdrop-blur-md ${
                      c.role === "user"
                        ? "bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg"
                        : "bg-white/10 text-blue-100 border border-blue-300/10"
                    }`}
                  >
                    {c.role === "bot" ? (
                      <ReactMarkdown
                        components={{
                          strong: (props) => (
                            <strong className="text-cyan-300" {...props} />
                          ),
                        }}
                      >
                        {c.text}
                      </ReactMarkdown>
                    ) : (
                      c.text
                    )}
                  </div>

                  {c.role === "user" && (
                    <User size={16} className="text-cyan-300 mt-1" />
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-blue-300 text-sm animate-pulse">
                  <Bot size={14} /> Thinking...
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-blue-400/20 bg-gradient-to-r from-blue-500/5 to-cyan-400/5">
              <div className="flex items-center gap-2 bg-white/10 border border-blue-300/20 rounded-2xl px-3 py-2 backdrop-blur-md">
                <input
                  className="flex-1 bg-transparent outline-none text-white placeholder:text-blue-200 text-sm"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Ask about Vansh..."
                />
                <button
                  onClick={sendMessage}
                  className="bg-gradient-to-br from-blue-500 to-cyan-400 hover:scale-105 transition p-2 rounded-xl shadow-md"
                >
                  <Send size={16} className="text-white" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
