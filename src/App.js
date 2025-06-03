import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 import { Chatbot } from 'rag-chatbot-ui-rahi'
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app">
        <h1 className="welcome-text">Chatbot Demo for RAHI Technology</h1>
      </div>
      <Chatbot/>
    </Router>
  );
}

export default App;
