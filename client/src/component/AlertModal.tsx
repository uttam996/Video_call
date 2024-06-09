import  { useState, useEffect, useContext } from "react";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import { SocketContext } from "../socketContext";
import { PeerContext } from "../PeerContext";
import { MediaContext } from "../MedialContext";
import { toast } from "react-toastify";

export const AlertModal = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>();

  const socket = useContext(SocketContext);
  const peer = useContext(PeerContext)
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { mystream, userStream }: any = useContext(MediaContext)



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
    try {
      console.log(mystream, "mystream", userStream, "userStream");

      if (!data?.peer) {
        toast.error("Peer id not found");
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (mystream.current) {
        mystream.current.srcObject = stream;
      }

      const call = peer.call(data.peer, stream);
      call.on("stream", (remoteStream) => {
        
        if (userStream.current) {
          userStream.current.srcObject = remoteStream;
          userStream.current.play()
        }
        
      }
      );

      console.log("call accepted");
      console.log(userStream);

      socket.emit("callAccepted", { callerId: data.callerId, from: user._id });


    }

    catch (error) {
      console.log(error)
    }
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
