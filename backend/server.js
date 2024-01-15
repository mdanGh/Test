const express = require("express");
//to connect to the mongodb database
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
// creating react application
const app = express();
//creating http server based on the express-application requests
//necessary for using websockets (communication-stream between server and client allowing bidirectional communication) 
//when using websockets the protocol is no longer http
const http = require("http");
const server = http.Server(app);
const session = require('express-session');
// const cookieParser = require("cookie-parser");
const { Server } = require('socket.io')
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["POST", "GET"]
}));


const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
});
//app.use(cookieParser());
app.use(session({
    secret: 'secret', // secret key to encrypt the session-cookie
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 86400000,
    }
}))
//require userschema for database entry
const userModel = require('./models/user')
const PORT = process.env.PORT || 5000;
// for parsing incoming request-body before handling
app.use(express.json());
//cors is "Cross-Origin Resource Sharing"


//connect to mongodb 
const dbURI = 'mongodb://localhost:27017/users';
mongoose.connect(dbURI);

//registration url
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10)
        .then(hash => {
            // the "bcrypt.hash..." is passed to the hash variable
            userModel.create({ username, email, password: hash })
                .then(user => res.json({ username: user.username, user_id: user._id }))
                .catch(err => res.json(err.message));
        });

});
//login url
app.post("/login", (req, res) => {

    const { email, password } = req.body;
    userModel.findOne({ email: email })
        .then(user => {
            if (user) {
                bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        req.session.ID = user._id
                        console.log(user._id)
                        res.json({ Login: true, ID: req.session.ID });
                    } else {
                        res.json({ Login: false });

                    };
                });
            };
        });

});
//logged in api
app.get('/', (req, res) => {
    if (req.session.ID) {
        return res.json({ valid: true, ID: req.session.ID });
    } else {
        return res.json({ valid: false });
    }
});

io.on('connection', (socket) => {
    console.log(`${socket.id} connected `);

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnect`)
    })

    socket.on('message', (params) => {
        console.log(params);
    })
});

// app.get('/add', (req, res) => {
//     if (req.query.name === 'peter') {
//         res.json("hallo")
//     } else {
//         console.log(req.query.name)
//         res.json("ciao")
//     }
// })


server.listen(PORT, () => console.log(`Server is live! on ${PORT}`));



