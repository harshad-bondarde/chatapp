import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Toaster } from 'react-hot-toast'
import { Provider } from "react-redux"
import store from './Redux/Store.js'
import { SocketContextProvider } from './context/SocketContext.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      <SocketContextProvider>
        <Toaster/>
        <App />
      </SocketContextProvider>
    </Provider>
  // </StrictMode>,
)
