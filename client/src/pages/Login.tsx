import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import {  useEffect, useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BaseUrl } from "../ApiEndPoints";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const HandleLogin = async () => {
    try {
      const user = await axios.post(BaseUrl + "/user/login", userData);
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user.data.data));
      toast.success("Login successfully");
      navigate("/");

      // login api call
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user._id) {
      navigate("/");
    }
  }, []);

  const handleSignup = () => {
    navigate("/signup");
  };
  return (
    <Box>
      <Typography variant="h4">Login</Typography>

      <TextField
        onChange={handleChange}
        name="email"
        value={userData.email}
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <TextField
        onChange={handleChange}
        name="password"
        value={userData.password}
        label="Password"
        variant="outlined"
        fullWidth
        margin="normal"
      />
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
        <LoadingButton
          variant="contained"
          onClick={HandleLogin}
          color="primary"
        >
          Login
        </LoadingButton>
        <Button variant="contained" color="secondary" onClick={handleSignup}>
          SignUp
        </Button>
      </Stack>
    </Box>
  );
}
