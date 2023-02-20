const express = require('express');
const { castObject } = require('../models/contactForm');
const router = express.Router();
const url = require('url');
const path = require('path');
const querystring = require('querystring');
//const User = require('../models/contactForm');
const { isModuleNamespaceObject } = require('util/types');
const { ifError } = require('assert');
const contactForm = require('../models/contactForm');

router.use(express.static('src'));

//get the html page
router.get('/', (req,res)=>{
    //try{
        res.sendFile(__dirname + '../src/index.html');
    //}catch(err){
        //res.status(500).json({messsage: err.messsage});
    //}
});

//get projects page
router.get('/projects', (req,res)=>{
    res.sendFile(__dirname + '/projects.html')
});


//create a new form submission
router.post('/form', async (req,res)=>{
    //get all contents from the body
        //check if elements are valid. If they are not return 400 error
        const submission = new contactForm(
            {
                //set first name
                firstName: req.body.firstName,
                //set last name
                lastName: req.body.lastName,
                //email address
                emailAddress: req.body.emailAddress,
                //description
                description: req.body.description

            }
        );
    try{
        if(!submission.validName(submission.firstName) || !submission.validName(submission.lastName))
            res.status(400).json({message: 'incorrect format for: first or last name'});
        if(!submission.validEmail(submission.emailAddress))
            res.status(400).json({message: 'incorrect format for: email address'});
        if(!submission.validDescription(submission.description))
            res.status(400).json({message: 'incorrect format for: description'});
        //fields are correct, insert record into database
        const newSubmission = await submission.save();
        res.status(201).json(newSubmission);
    }
    catch(err){
        //user gave us bad data
        res.status(400).json({message: err.message});
    }
});

//cronned job to let me know if any new forms have been submitted
router.get('/newRecords', (req,res)=>{
    //get the number of records
    const records = db.collection('Personal');
    const currRecordCount = 0;
    records.count().then((count)=>{
        currRecordCount = count;
    });
    //compare the number of records now vs the number of records the last time this method was invoked

    //the difference is the amount of new records

    //send an email to me with the amount of new records that have been inserted
});

module.exports = router;
