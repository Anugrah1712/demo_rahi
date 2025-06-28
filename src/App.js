import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { Chatbot } from 'rag-chatbot-ui-rahi';
function App() {
  
  return (
    <Router>
      <div className="app">
        <h1 className="welcome-text">Chatbot Demo for Rahi Technoloy</h1>
      </div>
      <Chatbot/>
    </Router>
  );
}

export default App;
