import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { LoginContextProvider } from "./contexts/loginContext";
import { SocketContextProvider } from "./contexts/socketContext";
import { I18NextProvider } from "./contexts/i18NextProvider";
import { OpenChatContextProvider } from "./contexts/openChatContext";
import { ChatContextProvider } from "./contexts/chatProvider";

import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <I18NextProvider>
    <SocketContextProvider>
      <ChatContextProvider>
        <LoginContextProvider>
          <OpenChatContextProvider>
            <React.StrictMode>
              <App />
            </React.StrictMode>
          </OpenChatContextProvider>
        </LoginContextProvider>
      </ChatContextProvider>
    </SocketContextProvider>
  </I18NextProvider>
);
