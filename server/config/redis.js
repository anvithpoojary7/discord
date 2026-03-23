const {createClient}=require("redis");

const redis=createClient();

redis.on("error",(err)=>{
      console.log("redis error",err);
});

(async ()=>{
       await redis.connect();
       console.log("redis connected");
})();

module.exports=redis;
