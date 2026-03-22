const socketHandler=(io)=>{
       io.on("connection", (socket) => {
      console.log("user connected",socketHandler.id);

      socket.on("join_channel",(channelId)=>{
           socket.join(channelId);
           console.log("joined channel:",channelId);

      });
      socket.on("sendmessage",(data)=>{
           socket.to(data.channelId).emit("recieve_message",data);

      });
      socket.on("disconnect",()=>{
          console.log("User disconnected:", socket.id);
      });
});
};

module.exports=socketHandler;
