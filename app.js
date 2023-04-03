const express = require('express');
const app = express();

const passport = require('passport');

require('dotenv').config();

global.config = require('./config/config')[process.env.NODE_ENV];

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));

require("./config/passport")(passport);
app.use(passport.initialize());

app.use(async (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, simandesk_token'
    );
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).json({});
    }
    next();
});

const { ReadEmail } = require('./core/mail');
ReadEmail();
console.log(`Connected to mail server ${new Date().toString()}`);

// routes
app.use('/v1', require('./controllers/v1/index'));

module.exports = app;