// Libs
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

// Components/layouts
import App from './layouts/App';

// JSDoc type definitions
import '#docs/jsdoc-typedefs';

// Styles
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Toaster position="top-center" />
  </>,
);
