
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Looby from './pages/Looby'


function App() {



  return (
  
      
    <Routes>
      <Route path="/" element={<Looby/>} />
      <Route path="/login" element={<Login />}/>
      <Route path="/signup" element={<SignUp/>} /> 
    </Routes> 
    
  )
}

export default App
