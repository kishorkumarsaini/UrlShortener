const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require("body-parser")


const route = require('./routes/shortenerRoute');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

mongoose.connect('mongodb://127.0.0.1:27017/urlshortener', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('connect to mongodb successful');
    })
    .catch((e) => {
        console.error(e);
    });

app.use("/", route);


app.listen(port, () => {
    console.log(`Server started on port :${port}`);
});