import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css';
import { App } from './App.tsx'

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
