import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.tsx';
import { LoginContextProvider } from './contexts/loginContext';
import { SocketContextProvider } from './contexts/socketContext';
import { I18NextProvider } from './contexts/i18NextProvider';
import { ChatContextProvider } from './contexts/chatProvider';
import { VideoChatContextProvider } from './contexts/videoChatContext';

import './styles/index.scss';
import { TrackContextProvider } from './contexts/trackContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <I18NextProvider>
    <SocketContextProvider>
      <LoginContextProvider>
        <VideoChatContextProvider>
          <TrackContextProvider>
            <ChatContextProvider>
              <React.StrictMode>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </React.StrictMode>
            </ChatContextProvider>
          </TrackContextProvider>
        </VideoChatContextProvider>
      </LoginContextProvider>
    </SocketContextProvider>
  </I18NextProvider>
);
