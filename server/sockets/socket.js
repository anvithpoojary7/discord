const redis=require("../config/redis");
const User=require("../models/User");

const socketHandler=(io)=>{
       io.on("connection",async(socket)=>{
             console.log("user connected",socket.id);
             const userId=socket.handshake.query.userId;
             console.log("UserId:", userId);
             if(userId){
                  await redis.sAdd("online_users",userId);
                 
             }
              const userIds=await redis.sMembers("online_users");
              const users=await User.find({_id:{$in:userIds}
          
          }).select("username");

                  io.emit("online_users",users);

             socket.on("join_channel",(channelId)=>{
                  socket.join(channelId);
                  console.log("joined channel",channelId);
             });

             socket.on("send_message",(data)=>{
                  socket.to(data.channelId).emit("recive_message",data);

             });
             socket.on("disconnect",async()=>{
                  console.log("user disconnected",socket.id);
                  if(userId){
                      await redis.sRem("online_users",userId);
                     
                  }
                   const useIds=await redis.sMembers("online_users");

                   const users=await User.find({
                     _id:{$in:useIds}
                   }).select("username");
                   io.emit("online_users",users);
             });
       });
};

module.exports=socketHandler;
