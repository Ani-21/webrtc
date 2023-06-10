import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { LoginContextProvider } from './contexts/loginContext';
import { SocketContextProvider } from './contexts/socketContext';
import { I18NextProvider } from './contexts/i18NextProvider';
import { OpenChatContextProvider } from './contexts/openChatContext';
import { ChatContextProvider } from './contexts/chatProvider';

import './styles/index.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <I18NextProvider>
    <SocketContextProvider>
      <LoginContextProvider>
        <ChatContextProvider>
          <OpenChatContextProvider>
            <React.StrictMode>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </React.StrictMode>
          </OpenChatContextProvider>
        </ChatContextProvider>
      </LoginContextProvider>
    </SocketContextProvider>
  </I18NextProvider>
);
