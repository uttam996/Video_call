
import { createContext, useRef } from 'react';

import {Peer} from 'peerjs'


const peer = new Peer();



const PeerContext = createContext<Peer>(peer);

peer.on('open', (id) => {
    localStorage.setItem('peerId', id);
    console.log('peer id', id);
}
);





const PeerProvider = ({ children }: { children: any }) => {
   


    return (
        <PeerContext.Provider value={peer}>
            {children}
        </PeerContext.Provider>

    );
};

export { PeerContext, PeerProvider };




