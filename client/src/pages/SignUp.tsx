import { LoadingButton } from '@mui/lab'
import { Box, Stack, TextField } from '@mui/material'
import axios from 'axios'
import { useState } from 'react'
import { BaseUrl } from '../ApiEndPoints'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function SignUp() {

  const navigate = useNavigate();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleLogin = () => {
        navigate('/login')
    }

    const handleChange = (e: any) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async () => {
      try {

        const response = await axios.post(BaseUrl + "/user/signup", userData)
        console.log(response)
        toast.success("SignUp successfully")
        setUserData({
          name: "",
          email: "",
          password: ""
      })
      navigate('/login')
     


        
      } catch (error:any) {
        toast.error( error?.response?.data?.message || "Something went wrong")
        console.log(error)
        
      }
        console.log("SignUp")
    }
  return (
    <Box>
      <pre>
        {JSON.stringify(userData, null, 2)}
      </pre>
        <h1>SignUp</h1>
        <TextField label="name" name='name' onChange={handleChange} variant="outlined" fullWidth margin="normal" />
        <TextField label="Email" variant="outlined" name="email" onChange={handleChange} fullWidth margin="normal" />
        <TextField label="Password" variant="outlined" name='password'  onChange={handleChange} fullWidth margin="normal" />
        <Stack spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
        >

        <LoadingButton variant="contained" color="primary" 
         onClick={handleSubmit}
        >Sumbit</LoadingButton>
          <LoadingButton variant="contained" color="secondary" onClick={handleLogin}>Login</LoadingButton>
        </Stack>

    </Box>
  )
}
