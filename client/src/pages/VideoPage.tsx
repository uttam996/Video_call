import { Box, Stack } from "@mui/material";
import React from "react";
import { Peer } from "peerjs";
import { AlertModal } from "../component/AlertModal";
import { SocketContext } from "../socketContext";
import { PeerContext } from "../PeerContext";

export default function VideoPage() {
  const myVideo = React.useRef<HTMLVideoElement>(null);
  const userVideo = React.useRef<HTMLVideoElement>(null);
  const socket = React.useContext(SocketContext);
  const Peer = React.useContext(PeerContext)


 
  React.useEffect(() => {
    async function getMedia() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });

        Peer.on('call', (call) => {
          console.log('call received');
          call.answer(stream);
          call.on('stream', (userVideoStream) => {
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



   

  
    
  }, []);
  return (
    <Box>
      <h1>Video Page</h1>
      <Stack spacing={2} direction={"row"}>
        <video autoPlay ref={myVideo} style={{ width: "50%" }} />
        <video autoPlay ref={userVideo} style={{ width: "50%" }} />
      </Stack>

      <AlertModal />
    </Box>
  );
}
