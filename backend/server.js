require("dotenv").config();
const express= require("express");
const app = express();
const mongoose = require("mongoose");
const Contact = require("./models/contact");
const cors = require("cors");

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.log("MongoDB connection error:", err);
    });

app.use(cors());
app.use(express.json());
app.post("/api/contact", async (req, res)=>{
    try{
        const { name, email, message } = req.body;
        if (!name || !email || !message) {
             return res.status(400).json({
             message: "All fields are required"
            });
       }
       if (!email.includes("@") || !email.includes(".")) {
           return res.status(400).json({
           message: "Please enter a valid email"
           });
      }

const newContact = new Contact({
    name,
    email,
    message
});
        await newContact.save();
        res.status(201).json({
            message:"Message sent successfully"
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message:"Something went wrong"
        });
    }
});
app.get("/", (req, res)=>{
    res.send("Portfolio backend is running");
});
app.listen(8080,()=>{
    console.log("Server is Running on port 8080");
});