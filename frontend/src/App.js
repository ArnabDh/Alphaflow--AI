import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TaskManager from './components/TaskManager';
import Visualizations from './components/Visualizations';
import Chatbot from './components/Chatbot';

function App() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  return (
    <div className="App">
      <Header onChatToggle={() => setIsChatbotOpen(!isChatbotOpen)} />
      <div className="main-container">
        <div className="content-area">
          <TaskManager />
          <Visualizations />
        </div>
        {isChatbotOpen && <Chatbot onClose={() => setIsChatbotOpen(false)} />}
      </div>
    </div>
  );
}

export default App;
