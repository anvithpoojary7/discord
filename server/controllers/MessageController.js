const Message=require("../models/Message");

exports.sendMessage=async(req,res)=>{
        try{
            const{text}=req.body;
            const{channelId}=req.params;

            const message=new Message({
                  text,
                  user:req.user.id,
                  username:req.user.name,
                  channel:channelId,
                    });
            
            await message.save();
           
            const io=req.app.get("io");
            io.to(channelId).emit("recieve message",message);
            

            res.status(201).json(message);
        }catch(error){
             console.error(error);
    res.status(500).json({ message: "Error sending message" }); 
        }
}

exports.getMessage=async(req,res)=>{
        try{
              const{channelId}=req.params;
              const message=await Message.find({channel:channelId})
                  .sort({createdAt:1});

                  res.json(message);

        }catch(error){
              console.error(error);
    res.status(500).json({ message: "Error fetching messages" });
        }
}