const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const auth=require('./routes/authroutes');
const serverRoutes=require('./routes/serverRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API Running");
});
app.use("/uploads", express.static("uploads"));
app.use("/api/auth", auth);
app.use('/api/servers',serverRoutes);



const PORT =3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});