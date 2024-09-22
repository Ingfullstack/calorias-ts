import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ActividadProvider } from './contexts/ActividadContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ActividadProvider>
      <App />
    </ActividadProvider>
  </StrictMode>,
)
