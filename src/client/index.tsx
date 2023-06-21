import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './css/normalize.css';
import './css/skeleton.css';
import './css/main.scss';
const domNode = document.getElementById('root')!;
const root = createRoot(domNode);

root.render(
  <App />
);
