import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { LoginContextProvider } from "./contexts/loginContext";
import { SocketContextProvider } from "./contexts/socketContext";
import { I18NextProvider } from "./contexts/i18NextProbider";

import "./styles/index.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <I18NextProvider>
  <SocketContextProvider>
    <LoginContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </LoginContextProvider>
  </SocketContextProvider>
  // </I18NextProvider>
);
