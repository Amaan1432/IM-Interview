const express = require('express');
const port = 8080;
const path = require('path');

const passport = require('./config/passport-local-strategy');
const cookieParser=require('cookie-parser');
const mongodb = require('./config/mongo');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const customMware = require('./config/middleware');
const expressEjsLayouts = require('express-ejs-layouts');

const app = express();


app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store the session cookie in the db
app.use(session({
    name: 'IE-Interview',
    // TODO change the secret before deployment in production mode
    secret: '&hsjsgg$0uty',
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

app.use(flash());

app.use(customMware.setFlash);

app.use('/', require('./routes'));


mongodb.dbConnection.then(() => app.listen(port, () => {
    console.log("Server is running!")
}))