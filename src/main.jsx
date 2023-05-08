// Libs
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

// JSDoc type definitions
import '#docs/jsdoc-typedefs';

// Components/layouts
import App from '#layouts/App';
import FixedElementsPortal from '#components/FixedElementsPortal';

// Styles
import './main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Toaster position="top-center" />
    <FixedElementsPortal />
  </>,
);
