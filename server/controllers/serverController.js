const Server = require('../models/Server');
const Channel = require("../models/Channel");

exports.createServer = async (req, res) => {
  try {
    const { name } = req.body;
    const image = req.file ? req.file.filename : "";
    const userId = req.user.id;

    // 1️⃣ Create Server
    const newServer = new Server({
      name,
      image,
      owner: userId,
      members: [userId]
    });

    await newServer.save();

    // 2️⃣ Create Default Channel (🔥 IMPORTANT)
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
      defaultChannel   // 👈 useful for frontend
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