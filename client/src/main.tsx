import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter} from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MediaProvider } from './MedialContext.tsx'
import { PeerProvider } from './PeerContext.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
     <PeerProvider>
    <MediaProvider>

    
      <App />
      </MediaProvider>
      </PeerProvider>
      <ToastContainer />
    </BrowserRouter>
    
  </React.StrictMode>,
)
