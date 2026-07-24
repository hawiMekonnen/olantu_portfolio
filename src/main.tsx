import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const root = document.getElementById('root')!;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Hide initial loader once React has mounted
const loader = document.getElementById('initial-loader');
if (loader) {
  loader.classList.add('hidden');
  setTimeout(() => loader.remove(), 500);
}
