const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  username: {
    type: String,
    required: true,
  },

  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },

  type: {
    type: String,
    default: "message", // or "system"
  }

}, { timestamps: true });

module.exports = mongoose.model("Message", messageSchema);