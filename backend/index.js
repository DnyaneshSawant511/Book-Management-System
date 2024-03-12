import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from 'cors';

const app = express();

//middleware for parsing request body
app.use(express.json());

//middleware for cors policy

//allow all origins
app.use(cors());

//allow custom origins
/*

app.use(
    cors({
        origin: 'http://localhost:3000',     # react server
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

*/

app.get('/', (req, res) => {
    console.log(req);
    return response.status(234).send('Book Management');
});

//middleware to redirect all /books routes to booksRoute
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
