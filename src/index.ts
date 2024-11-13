import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { SERVER_PORT } from "./config";

const app = express();

// cors 
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.status(200).json({
        message:"OK"
    })
})

app.listen(SERVER_PORT,()=>{
    console.log("Server started at port ",SERVER_PORT);
})