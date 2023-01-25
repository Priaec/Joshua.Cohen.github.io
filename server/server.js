//import dotenv and config environment variables
require('dotenv').config();
//import express library
const express = require('express');
//app
const app = express();
//mongoose library
const mongoose = require('mongoose');

//connect to db
mongoose.connect('mongodb://localhost/personal');
//database
const db = mongoose.connection;
db.on('error', (error)=>{
    console.error(error);
});
//connect to db
db.once('open', ()=>{
    console.log('Connected to Database');
});

app.use(express.json());

const personalRouter = require('./routes/personal');
app.use('/personal', personalRouter);
//app.use('/:userID/logs', logsRouter);
//listen on given port
app.listen(3000, ()=>{
    console.log('Server Started');
});

