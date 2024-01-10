const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt")
const app = express();
const userModel = require('./models/user')
const PORT = process.env.PORT || 5000;
// for parsing incoming request-body before handling
app.use(express.json());
//cors is "Cross-Origin Resource Sharing"
app.use(cors())

const dbURI = 'mongodb://localhost:27017/users';
mongoose.connect(dbURI);

app.post('/register', (req, res) => {

    const { username, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            userModel.create({ username, email, password: hash })
                .then(user => res.json(user))
                .catch(err => res.json(err.message))
        })

})

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        res.json(same);
                    } else {
                        res.json("the password doesn't match");
                    }
                })
            }
        })

})
app.listen(PORT, () => console.log(`Server is live! on ${PORT}`))



