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
MONGO_URI="mongodb://127.0.0.1:27017/cardx"
mongoose.connect(MONGO_URI);

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

PORT = 5000
server.listen( 5000, ()=>
{
    console.log(
    "Server Running at ", {PORT}
    );
});