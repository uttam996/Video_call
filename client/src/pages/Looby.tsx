import {
  Box,
  Stack,
} from "@mui/material";
import UserList from "../component/UserList";
import { useContext, useEffect,  } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext, SocketProvider } from "../socketContext";
import { AlertModal } from "../component/AlertModal";
import { MediaContext } from "../MedialContext";

export default function Looby() {
  const navigate = useNavigate();

  const socket = useContext(SocketContext);
  const {mystream,userStream}:any = useContext(MediaContext)
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(user);
    if (!user._id) {
      alert("Please login first");
      navigate("/login");
    }

    socket.on("callAccepted",  () => {
    });
   
    // }
  }, []);


  return (
    <SocketProvider>
      <Box>
        <UserList />
        <AlertModal />
        <Stack spacing={2} direction="row">
        <video autoPlay ref={mystream} style={{ width: "50%" }} />
        <video autoPlay ref={userStream} style={{ width: "50%" }} />
          </Stack>
      </Box>
    </SocketProvider>
  );
}
