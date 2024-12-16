import React from 'react';
import { createRoot } from 'react-dom/client';  // Correct import for React 18
import App from './app'; 
// Get the root element
const root = createRoot(document.getElementById('root'));  // Create the root with createRoot

// Render the app using root.render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
