import { createContext, useContext, useEffect, useRef } from "react";
import { PeerContext } from "./PeerContext";


export const MediaContext = createContext<MediaStream | null>(null);


export const MediaProvider = ({ children }: { children: any }) => {
    const mystream = useRef<any>(null);
    const userStream = useRef<any>(null);

    const peer = useContext(PeerContext)


    useEffect(() => {
    const getMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        
        if(mystream.current){
          mystream.current.srcObject = stream;
          userStream.current ={}
          // userStream.current.srcObject = stream;
          
          

          
        }

        peer.on("call", (call:any) => {
          console.log("call");
          call.answer(stream);
          call.on("stream", (remoteStream:any) => {
            
            if(userStream.current){
              userStream.current.srcObject = remoteStream;
              userStream.current.play()
            }
            
            
          });
        });

    

        
      } catch (error) {
        console.log(error);
        
      }
    };
    getMedia();
    }, []);




    
    const stream: any = {
        mystream,
        userStream,
        
      



        // Add other required properties here
    }

    return <MediaContext.Provider value={stream}>{children}</MediaContext.Provider>;
};

export default {
    MediaContext,
    MediaProvider
};