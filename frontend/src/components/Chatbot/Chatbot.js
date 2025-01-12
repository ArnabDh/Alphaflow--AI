import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import './Chatbot.css';

function Chatbot({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef(null);
  
  // Using a temporary userId for demo - in production, use actual user authentication
  const userId = 'user123';

  useEffect(() => {
    if (isOpen) {
      loadChatHistory();
    }
  }, [isOpen]);

  const loadChatHistory = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/chat/history/${userId}`);
      const history = await response.json();
      
      if (history.length === 0) {
        // Add welcome message if no history exists
        const welcomeMessage = {
          text: "Hello! I'm your AI assistant. How can I help you with task management today?",
          isBot: true
        };
        setMessages([welcomeMessage]);
        saveChatMessage(welcomeMessage);
      } else {
        setMessages(history);
      }
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveChatMessage = async (message) => {
    try {
      await fetch(`http://localhost:5000/api/chat/history/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message)
      });
    } catch (error) {
      console.error('Error saving chat message:', error);
    }
  };

  const clearChatHistory = async () => {
    try {
      await fetch(`http://localhost:5000/api/chat/history/${userId}`, {
        method: 'DELETE'
      });
      loadChatHistory(); // Reload with welcome message
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  const handleSendMessage = async (message) => {
    const userMessage = { text: message, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    await saveChatMessage(userMessage);
    
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message })
      });

      const data = await response.json();
      const botMessage = { text: data.response, isBot: true };
      setMessages(prev => [...prev, botMessage]);
      await saveChatMessage(botMessage);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        isBot: true
      };
      setMessages(prev => [...prev, errorMessage]);
      await saveChatMessage(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <h3>AI Assistant</h3>
        <div className="chatbot-actions">
          <button className="clear-history" onClick={clearChatHistory}>
            Clear History
          </button>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
      </div>

      <div className="chat-messages">
        {isLoading ? (
          <div className="loading-messages">Loading chat history...</div>
        ) : (
          <>
            {messages.map((msg, index) => (
              <ChatMessage
                key={index}
                message={msg.text}
                isBot={msg.isBot}
                timestamp={msg.timestamp}
              />
            ))}
            {isTyping && (
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
}

export default Chatbot; 