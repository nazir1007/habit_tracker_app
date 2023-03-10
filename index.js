// ---------- Importing Modules ---------- //
const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const dotenv = require("dotenv").config();


const app = express();

// ---------- DB config ---------- //
const db = require('./config/mongoose');

//-----EJS---------//
app.use(expressLayouts);
app.use("/assets", express.static('./assets'));
app.set("view engine", "ejs");

//------BodyParser--------//
app.use(express.urlencoded({ extended: false }));

//---------Express Session----------//
app.use(session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);


//---------Connect Flash----------//
app.use(flash());

//---------Global Variables----------//
app.use( function (req, res, next ){
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
})


//-----Routes---------//

app.use('/', require('./routes'));

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

