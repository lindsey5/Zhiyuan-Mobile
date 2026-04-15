import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.EXPO_PUBLIC_API_URL;

interface UseSocketOptions {
    namespace: string;
    events?: { [event: string]: (...args: any[]) => void };
}

export const useSocket = ({ namespace, events = {} }: UseSocketOptions) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    
    useEffect(() => {

        const connectSocket = () => {
            try{
                const newSocket = io(`${SOCKET_URL}${namespace}`);

                newSocket.on("connect", () => console.log("Connected to socket"))

                // Register event listeners
                Object.entries(events).forEach(([event, callback]) => {
                    newSocket.on(event, callback);
                });

                setSocket(newSocket);
            }catch(error : any) {
                console.error("Error connecting to socket:", error.message);
            }
        }
        connectSocket();

        return () => {
            if(socket) {
                socket.disconnect();
            }
        };
    }, []);

    return socket;
};