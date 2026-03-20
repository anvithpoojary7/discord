const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: String,
  user: {
    type: String, // later you can use ObjectId
    required: true,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
  },
  type: {
    type: String,
    default: "message", // or "system"
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);