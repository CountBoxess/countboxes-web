import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Alert from './components/feedback/Alert.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Alert />
  </StrictMode>
);
