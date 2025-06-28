import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  useEffect(() => {
    const pipListener = event => {
      if (event.data.type !== 'jf-request-pip-window') return;

      const { url, width, height } = event.data;
      if ('documentPictureInPicture' in window && !window.documentPictureInPicture.window) {
        window.documentPictureInPicture.requestWindow({
          width,
          height,
          disallowReturnToOpener: true
        }).then(pipWindow => {
          [...document.styleSheets].forEach(styleSheet => {
            try {
              const cssRules = [...styleSheet.cssRules].map(rule => rule.cssText).join('');
              const style = document.createElement('style');
              style.textContent = cssRules;
              pipWindow.document.head.appendChild(style);
            } catch {
              const link = document.createElement('link');
              link.rel = 'stylesheet';
              link.type = styleSheet.type;
              link.media = styleSheet.media;
              link.href = styleSheet.href;
              pipWindow.document.head.appendChild(link);
            }
          });

          pipWindow.document.body.innerHTML = `<iframe src="${url}" style="width: ${width}px; height: ${height}px;" allow="microphone *; display-capture *;"></iframe>`;
        });
      }
    };

    window.addEventListener('message', pipListener);

    const script = document.createElement('script');
    script.src = "https://www.jotform.com/s/umd/525e3642bbb/for-embedded-agent.js";
    script.async = true;
    script.onload = () => {
      if (window.AgentInitializer) {
        window.AgentInitializer.init({
          agentRenderURL: "https://www.jotform.com/agent/01978bd4d7247651bc6bc29d9ae28ac9ca22",
          rootId: "JotformAgent-01978bd4d7247651bc6bc29d9ae28ac9ca22",
          formID: "01978bd4d7247651bc6bc29d9ae28ac9ca22",
          contextID: "01978bdbaee87953bbfc6d5c890bc9a870cf",
          initialContext: "",
          queryParams: ["skipWelcome=1", "maximizable=1"],
          domain: "https://www.jotform.com",
          isDraggable: false,
          background: "linear-gradient(180deg, #D3CBF4 0%, #D3CBF4 100%)",
          buttonBackgroundColor: "#8797FF",
          buttonIconColor: "#01091B",
          inputTextColor: "#EAE9FF",
          variant: false,
          customizations: {
            greeting: "Yes",
            greetingMessage: "Hi! How can I assist you?",
            pulse: "Yes",
            position: "right"
          },
          isVoice: false,
          isVoiceWebCallEnabled: true
        });
      }
    };
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('message', pipListener);
      document.head.removeChild(script);
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <h1 className="welcome-text">Chatbot Demo</h1>
      </div>
    </Router>
  );
}

export default App;
