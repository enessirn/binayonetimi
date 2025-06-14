import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./main.css"
import { AmountProvider } from './context/AmountContext.jsx'
import { TransactionProvider } from './context/TransactionContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AmountProvider>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </AmountProvider>

  </StrictMode >,
)
