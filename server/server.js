const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const http=require('http');
const {Server}=require("socket.io");


const auth=require('./routes/authroutes');
const serverRoutes=require('./routes/serverRoutes');
const messageRoutes = require("./routes/messageRoutes");

const socketHandler=require("./sockets/socket");

dotenv.config();

const app = express();
const server=http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

socketHandler(io);

app.set("io",io);

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API Running");
});
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", auth);
app.use('/api/servers',serverRoutes);
app.use("/api/messages", messageRoutes);


const PORT =3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});