import {
  
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BaseUrl } from "../ApiEndPoints";
import { SocketContext } from "../socketContext";
import { CallingModal } from "./CallingModal";

export default function UserList() {
  const [onlineUser, setOnlineUser] = useState<any>({});
  const socket = useContext(SocketContext);
  const [users, setUsers] = useState([]);
  const [callingTo, setCallingTo] = useState<string>();


 

  const user = JSON.parse(localStorage.getItem("user") || "{}");



  useEffect(() => {
    socket.on("onlineUsers", (data) => {
      console.log(data);
      setOnlineUser(data);

      

      
    });


  }, []);

  const HandleCall = async (data: {
    to: string;
    from: string;
    callingTo: string;
  }) => {
    try {
    
      let peerId = localStorage.getItem("peerId")|| "";
      console.log(peerId);
      socket.emit("call", { to: data.to, from: data.from, callerId: user._id,peerId:peerId});

    
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      
    }
  
    setCallingTo(data.callingTo);
  };

  useEffect(() => {
    const FetchUser = async () => {
      try {
        let user = JSON.parse(localStorage.getItem("user") || "{}");
        const response = await axios.get(BaseUrl + "/user");
        setUsers(response.data.filter((item: any) => item._id !== user._id));
        console.log(response);
        // setUsers(response.data.data)
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };
    FetchUser();
  }, []);
  return (
    <>
      <List>
        {users.map((item: any) => {
          console.log(item);
          return (
            <ListItem
              key={item?._id}
              secondaryAction={
                <Button
                  onClick={() =>
                    HandleCall({
                      to: item._id,
                      from: user.name,
                      callingTo: item.name,
                    })
                  }
                >
                  call
                </Button>
              }
            >
              <ListItemButton disabled={onlineUser[item._id] ? false : true}>
                <ListItemAvatar></ListItemAvatar>
                <ListItemText primary={item?.name} secondary={item?.email} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <CallingModal CallingTo={callingTo} setCallingTo={setCallingTo} />
    </>
  );
}
