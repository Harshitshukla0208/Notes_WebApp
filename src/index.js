const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const connectDB = require('./config/database');
const { PORT } = require('./config/serverConfig');
const session = require('express-session'); //when a user logs in they can be kept logged in
const passport = require('passport');
const MongoStore = require('connect-mongo');
const crypto = require('crypto');

const app = express();  

// Generate a random 32-character string as the secret key
const secretKey = crypto.randomBytes(32).toString('hex');

// Use express-session middleware
app.use(session({ secret: secretKey, resave: false, saveUninitialized: false }));




app.use(passport.initialize());
app.use(passport.session());


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('public')); //static files

//templating engine
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.use('/', require('./routes/auth'));
app.use('/', require('./routes/index'));
app.use('/', require('./routes/dashboard'));

// error-404
app.get('*', function(req, res){
    res.status(404).render('errors');
})

app.listen(PORT, async() => {
    console.log(`Server Started on port ${PORT}`);

    await connectDB();
    console.log("Mongo DB connected");
})
