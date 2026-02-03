import {SendIcon} from "./Icons";
import {useState} from "react";
import MessageBubble from "./MessageBubble";
import axios from "axios";
export default function Chat() {
    const [messages, setMessages] = useState([
        {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "Hi! I'm your AI assistant. Ask me anything. 🧠💬",
        },
    ]);
    const [input, setInput] = useState("");
    const [model, setModel] = useState("gpt-4.1-mini");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [chat, setChat] = useState([ ]);
    async function handleSend() {
        if (!input.trim()) return;
      
        const userMsg = {
          id: crypto.randomUUID(),
          role: "user",
          content: input.trim(),
        };
      
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setLoading(true);
        setError("");
      
        try {
          const res = await axios.post("http://localhost:5000/chat", {
            message: userMsg.content,
          });
      
          const aiMsg = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: res.data.reply,
          };
      
          setMessages((prev) => [...prev, aiMsg]);
        } catch (err) {
          console.error(err);
          setError("Request failed");
      
          setMessages((prev) => [
            ...prev,
            {
              id: crypto.randomUUID(),
              role: "error",
              content: "Something went wrong. Please try again.",
            },
          ]);
        } finally {
          setLoading(false);
        }
      }
      

    return (
        <div className="chat">
            <div className="chat__list">
                {messages.map((m) => (
                    <MessageBubble key={m.id} role={m.role} text={m.content} />
                ))}
            </div>

            <div className="composer">
                <div className="composer__inner">
                    <div className="box">
                        <textarea
                            className="input"
                            placeholder="Ask me anything…"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <div className="toolbar">
                            <div className="small">{error ? "Error - try again" : ""}</div>

                            <div style={{display: "flex", gap: 8, alignItems: "center"}}>
                                <select value={model} onChange={(e) => setModel(e.target.value)} className="ghost">
                                    <option value="gpt-4.1-mini">gpt-4.1-mini</option>
                                    <option value="gpt-4o-mini">gpt-4o-mini</option>
                                </select>

                                <button className="btn" onClick={handleSend} disabled={loading}>
                                    <SendIcon />
                                </button>

                                <button className="btn ghost" onClick={() => setMessages(messages.slice(0, 1))}>
                                    clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
