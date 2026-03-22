const mongoose = require("mongoose");

const serverSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
  ],
  inviteCode:{
     type:String,
     unique:true,
     required:true
  }

}, { timestamps: true });

module.exports = mongoose.model("Server", serverSchema);