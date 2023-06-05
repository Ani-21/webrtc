import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { LoginContextProvider } from "./contexts/loginContext";
import { SocketContextProvider } from "./contexts/socketContext";
import "./styles/index.scss";
import "./i18n.js";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <SocketContextProvider>
    <LoginContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </LoginContextProvider>
  </SocketContextProvider>
);
