const express=require('express');
const router=express.Router();
const upload=require("../middleware/uploadMiddleware");
const authmiddleware=require("../middleware/authmiddleware");

const{createServer,getServers,getServerChannels}=require("../controllers/serverController");

router.post("/",authmiddleware,upload.single("image"),createServer);
router.get("/",authmiddleware,getServers);

router.get("/:serverId/channels",authmiddleware,getServerChannels);



module.exports=router;
