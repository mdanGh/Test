const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 5000;
const urlencodedParser = express.urlencoded({ extended: false })
const jwt = require("jsonwebtoken");


app.use(express.json(), urlencodedParser);

const dbURI = 'mongodb://127.0.0.1:27017'


mongoose.connect(dbURI)
    .then((res) => {
        app.listen(PORT, () => console.log(`Server is live! on ${PORT}`))
    })
    .catch(err => console.log(err))

