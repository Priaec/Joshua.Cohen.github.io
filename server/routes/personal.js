const express = require('express');
const { castObject } = require('../models/person');
const router = express.Router();
const url = require('url');
const path = require('path');
const querystring = require('querystring');
const User = require('../models/person');
const { isModuleNamespaceObject } = require('util/types');
const { ifError } = require('assert');

router.use(express.static('src'));

//get the html page
router.get('/', (req,res)=>{
    //try{
        res.sendFile(__dirname + '../src/index.html');
    //}catch(err){
        //res.status(500).json({messsage: err.messsage});
    //}
});





router.get('/projects', (req,res)=>{
    res.sendFile(__dirname + '/projects.html')
});


module.exports = router;
