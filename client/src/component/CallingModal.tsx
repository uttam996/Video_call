import  { useEffect, useContext } from "react";
import { Dialog, DialogContent,  } from "@mui/material";
import { SocketContext } from "../socketContext";

export const CallingModal = ({
  CallingTo,
  setCallingTo,
}: {
  CallingTo: any;
  setCallingTo: any;
}) => {


  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("callDeclined", () => {
      setCallingTo(null);
    });

    socket.on("callAccepted", () => {
      setCallingTo(null);
    });
  }, []);

  return (
    <Dialog open={!!CallingTo}>
      <DialogContent>Calling to {CallingTo}</DialogContent>
    </Dialog>
  );
};
