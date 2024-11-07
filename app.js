const express = require('express');
const path = require('path');
const url = require('url');
const session = require('express-session');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

//routes
const userRoute = require('./routes/Mongodb/user');
//Pug Engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//JSON usage
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Session Management
app.use(session({
    secret: 'thinkers',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//Use Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Music API
app.get('/musicApi.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'musicApi.json'));
});

//Routing
app.use('/user', userRoute);
app.get("/", (req, res) => {
    res.render('index');
});

//MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

//404 handling for unmatched routes
app.use((req, res) => {
    const filePath = path.join(__dirname, 'views', url.parse(req.url, true).pathname);
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error('File not found:', err);
            res.status(404).send('<h1>404 Not Found</h1>');
        }
    });
});

// Favicon request handler
app.get('/favicon.ico', (req, res) => res.status(204));

//Server startup
app.listen(5865, () => {
    console.log('Server is running @ http://localhost:5865');
});
