import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

//middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return response.status(234).send('Book Management');
});

//Route to save a new book
app.post('/books', async (req, res) => {

    try {

        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({ message : 'Send all required fields.' });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);
        return res.status(201).send(book);

    } catch(error) {
        console.log(error.message);
        res.status(500).send({ message : error.message });
    }

});

//Route to get all books from the database
app.get('/books', async (req, res) => {
    try {

        const books = await Book.find({});
        return res.status(200).json({ count: books.length, data: books, });

    } catch(error){
        console.log(error.message);
        res.status(500).send({ message : error.message});
    }
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
