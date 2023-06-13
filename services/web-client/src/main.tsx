import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.tsx';
import { LoginContextProvider } from './contexts/loginContext';
import { SocketContextProvider } from './contexts/socketContext';
import { I18NextProvider } from './contexts/i18NextProvider';
import { OpenChatContextProvider } from './contexts/openChatContext';
import { ChatContextProvider } from './contexts/chatProvider';
import { RoomContextProvider } from './contexts/roomContext';

import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <I18NextProvider>
    <SocketContextProvider>
      <LoginContextProvider>
        <RoomContextProvider>
          <ChatContextProvider>
            <OpenChatContextProvider>
              <React.StrictMode>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </React.StrictMode>
            </OpenChatContextProvider>
          </ChatContextProvider>
        </RoomContextProvider>
      </LoginContextProvider>
    </SocketContextProvider>
  </I18NextProvider>
);
