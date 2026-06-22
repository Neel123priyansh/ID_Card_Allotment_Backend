require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const http = require("http");

const studentRoutes = require("./studentRoutes");
const { initWebSocket } = require("./websocket");

const app = express();
app.use(cors());
app.use(express.json());
app.use( "/api/students", studentRoutes );

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/cardx";
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const server = http.createServer(app);

const wsServer = initWebSocket(server);

app.post( "/api/epc", (req,res)=>
{
    const {epc} = req.body;

    wsServer.updateEpc(epc);

    res.json({
        success:true
    });
});

server.listen( PORT, ()=>
{
    console.log(
    "Server Running at port", PORT
    );
});