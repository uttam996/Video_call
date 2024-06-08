import React, { useState, useEffect, useContext } from "react";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import { SocketContext } from "../socketContext";

export const CallingModal = ({
  CallingTo,
  setCallingTo,
}: {
  CallingTo: any;
  setCallingTo: any;
}) => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<any>();

  const socket = useContext(SocketContext);

  useEffect(() => {
    socket.on("callDeclined", () => {
      setCallingTo(null);
    });
  }, []);

  return (
    <Dialog open={!!CallingTo}>
      <DialogContent>Calling to {CallingTo}</DialogContent>
    </Dialog>
  );
};
