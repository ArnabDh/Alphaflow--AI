import React from 'react';

function ChatMessage({ message, isBot }) {
  return (
    <div className={`chat-message ${isBot ? 'bot' : 'user'}`}>
      <div className="message-content">
        {isBot && <span className="bot-icon">🤖</span>}
        <p>{message}</p>
      </div>
      <span className="message-timestamp">
        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  );
}

export default ChatMessage; 