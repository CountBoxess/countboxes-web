import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Alert from './components/feedback/Alert.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Alert />
  </StrictMode>
);
