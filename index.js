const express = require('express');
const port = 8080;
const path = require('path');
const routes = require('./routes')
const cookieParser=require('cookie-parser')
const mongodb = require('./config/mongo');
const session =require('express-session');
const expessLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const customMware = require('./config/middleware');

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(flash());
app.use(customMware.setFlash);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'IE-Interview',
    // TODO change the secret before deployment in production mode
    secret: '&hsjsgg$',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//middle for authenticate


app.use('/', routes);


mongodb.dbConnection.then(() => app.listen(port, () => {
    console.log("Server is running!")
}))