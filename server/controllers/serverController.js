const Server = require('../models/Server');
const Channel = require("../models/Channel");


const generateCode=()=>{
     return Math.random().toString(36).substring(2,8);
}



exports.createServer = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.filename : "";
    const userId = req.user.id;
    let inviteCode;
    let exists=true;

    while(exists){
         inviteCode=generateCode();
         const server=await Server.findOne({inviteCode});
         if(!server) exists=false;
    }

    // 1️⃣ Create Server
    const newServer = new Server({
      name,
      image,
      owner: userId,
      members: [userId],
      inviteCode
    });

    await newServer.save();

    
    const defaultChannel = new Channel({
      name: "general",
      server: newServer._id
    });

    await defaultChannel.save();

    // 3️⃣ Send response
    return res.status(201).json({
      success: true,
      message: "Server created successfully",
      server: newServer,
      defaultChannel,
      inviteCode
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "error creating server"
    });
  }
};


// ✅ GET channels for a server
exports.getServerChannels = async (req, res) => {
  try {
    const { serverId } = req.params;

    const channels = await Channel.find({ server: serverId });

    res.json(channels);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching channels" });
  }
};


// ✅ GET all servers for logged-in user
exports.getServers = async (req, res) => {
  try {
    const userId = req.user.id;

    const servers = await Server.find({
      members: userId
    });

    res.json(servers);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching servers"
    });
  }
};

exports.joinServer=async(req,res)=>{
     try{
         const {inviteCode}=req.body;
         const userId=req.user.id;

         const server=await Server.findOne({inviteCode});
         if(!server){
              return res.status(404).json({message:"invalid invite code"});
         }
         if(server.members.includes(userId)){
             return res.status(400).json({ message: "Already joined this server" });
         }

         server.members.push(userId);
         await server.save();

      res.json({
      message: "Joined successfully",
      server
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error joining server" });
  }
};
