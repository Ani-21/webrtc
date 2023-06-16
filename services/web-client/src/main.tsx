import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App.tsx';
import { LoginContextProvider } from './contexts/loginContext';
import { SocketContextProvider } from './contexts/socketContext';
import { I18NextProvider } from './contexts/i18NextProvider';
import { ChatContextProvider } from './contexts/chatProvider';
import { VideoChatContextProvider } from './contexts/videoChatContext';
import { LocalTracksContextProvider } from './contexts/localTrackContext.tsx';

import './styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <I18NextProvider>
    <SocketContextProvider>
      <LoginContextProvider>
        <VideoChatContextProvider>
          <LocalTracksContextProvider>
            <ChatContextProvider>
              <React.StrictMode>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </React.StrictMode>
            </ChatContextProvider>
          </LocalTracksContextProvider>
        </VideoChatContextProvider>
      </LoginContextProvider>
    </SocketContextProvider>
  </I18NextProvider>
);
