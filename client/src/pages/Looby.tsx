import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
} from "@mui/material";
import { Socket, io } from "socket.io-client";
import UserList from "../component/UserList";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SocketContext, SocketProvider } from "../socketContext";
import { AlertModal } from "../component/AlertModal";
import { PeerContext } from "../PeerContext";

export default function Looby() {
  const navigate = useNavigate();
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);

  const socket = useContext(SocketContext);
  const peer = useContext(PeerContext);
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user") || "{}");
    console.log(user);
    if (!user._id) {
      alert("Please login first");
      navigate("/login");
    }

    socket.on("callAccepted", (data) => {
      navigate("/video");
      
      
      
      
    });

   


    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });

        peer.on("call", (call) => {
          console.log("call received");
          call.answer(stream);
          call.on("stream", (userVideoStream) => {
            if (userVideo.current) {
              userVideo.current.srcObject = userVideoStream;
            }
          });
        });

        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }

      } catch (error: any) {
        console.log(error);
      }
    }

    getMedia();


   
    // }
  }, []);

  return (
    <SocketProvider>
      <Box>
        <UserList />
        <AlertModal />
        <Stack spacing={2} direction="row">
          <video 
           ref={myVideo}
           width={'50%'}
          ></video>
          <video 
          width={'50%'}
           ref={userVideo}
          ></video>
          </Stack>
      </Box>
    </SocketProvider>
  );
}
