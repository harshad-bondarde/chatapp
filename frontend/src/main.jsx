import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Toaster } from 'react-hot-toast'
import { Provider } from "react-redux"
import {store } from './Redux/Store.js'
import { SocketContextProvider } from './context/SocketContext.jsx'
import { PersistGate } from 'redux-persist/integration/react'

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}>   */}
        <SocketContextProvider>
          <Toaster/>
          <App />
        </SocketContextProvider>
      {/* </PersistGate> */}
    </Provider>
  // </StrictMode>,
)
