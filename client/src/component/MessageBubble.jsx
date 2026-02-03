import React from "react";
import Avatar from "./Avatar.jsx";

export default function MessageBubble({ role, text }) {
  const isUser = role === "user";
  const isError = role === "error";
  console.log(role);
  return (
    <div className={`message ${isUser ? "message--right" : ""}`}>
      <div className={`bubble ${isUser ? "bubble--user" : isError ? "bubble--error" : "bubble--ai"}`}>
        <div className="bubble__header">
          <Avatar role={role} />
          <span className="meta">{role}</span>
        </div>
        <div>{text}</div>
      </div>
    </div>
  );
}