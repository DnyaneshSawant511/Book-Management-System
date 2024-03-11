import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.get('/', (req, res) => {
    res.send('');
});

mongoose.connect(mongoDBURL)
.then(()=>{
    console.log('Connected to database.');

    //app.listen is put inside then block of mongoose.connect
    //this is to ensure it only runs if the mongoose connection is successful
    
    app.listen(PORT, ()=> {
        console.log(`App is listening to port : ${PORT} `);
    });
    
}).catch((error) => {
    console.log(error);
});
