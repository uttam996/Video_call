
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Looby from './pages/Looby'
import VideoPage from './pages/VideoPage'
import { PeerProvider } from './PeerContext'


function App() {



  return (
    <PeerProvider>
    <Routes>
      <Route path="/" element={<Looby/>} />
      <Route path="/video" element={<VideoPage/>} />
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<SignUp/>} /> 
    </Routes> 
    </PeerProvider>
  )
}

export default App
