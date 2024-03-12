import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

//middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return response.status(234).send('Book Management');
});

app.use('/books', booksRoute);

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
