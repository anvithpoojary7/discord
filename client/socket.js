import { io } from "socket.io-client";
const userId=localStorage.getItem("userId");

const socket = io("http://localhost:3000",{
      query:{userId}
});

export default socket;