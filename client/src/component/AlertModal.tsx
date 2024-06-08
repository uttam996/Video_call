import React, { useState, useEffect, useContext } from "react";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import { SocketContext } from "../socketContext";
import {Peer} from 'peerjs'
import { Navigate, useNavigate } from "react-router-dom";
import { PeerContext } from "../PeerContext";

export const AlertModal = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>();

  const socket = useContext(SocketContext);
  const peer = useContext(PeerContext)
  const user = JSON.parse(localStorage.getItem("user") || "{}");

const navigate = useNavigate();



  useEffect(() => {
    socket.on("incomingCall", (data) => {
      console.log(data);
      setData(data);
      setOpen(true);
    });

    
  }, []);

  const callAppcepted = async () => {
    // socket.emit("callAccepted", { callerId: data.callerId,from:user._id});
    // get peer id 
   
    const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
    console.log(data);
    const call = peer.call(data.peer, stream);
    call.on("stream", (remoteStream) => {
     console.log(remoteStream);
    });









    
    



    
  };

  const Calldeclined = () => {
    socket.emit("callDeclined", data);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent>{data?.from} {
        data?.callerId
      } is calling</DialogContent>
      <DialogActions>
        <Button onClick={callAppcepted}>Accepted</Button>
        <Button onClick={Calldeclined}>Declined</Button>
      </DialogActions>
    </Dialog>
  );
};
