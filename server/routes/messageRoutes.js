const express = require("express");
const router = express.Router();
const authmiddleware = require("../middleware/authmiddleware");

const{sendMessage,getMessage}=require("../controllers/MessageController");

router.post("/:channelId",authmiddleware,sendMessage);

router.get("/:channelId",authmiddleware,getMessage);

module.exports=router;
