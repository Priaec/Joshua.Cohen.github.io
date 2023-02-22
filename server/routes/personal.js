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
const cron = require('node-cron')

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

//route to send me back all the forms in JSON
router.get('/forms', async (req,res)=>{
    //get all from mongodb
    try{
        const forms = await contactForm.find();
        res.status(200).json({forms});
    }
    catch(err){
        res.status(400).json({message: err.message})
    }
});

//get forms on particular date
router.get('/formsDate', async (req,res)=>{
    //get the date from the parameters
    const queryDate = req.query.date;
    try{
        const forms = await contactForm.find({
            createdDate:{
                $gte: queryDate
            }
        });
        res.status(200).json({forms});
    }
    catch(err){
        res.status(500).json({message: err.message});
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

//cronned job to email me if there are any new records
cron.schedule('59 23 * * *', async ()=>{
    const date = new Date()
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const currentDate = month + '-' + day + '-' + year;
    try{
        const forms = await contactForm.find({
            createdDate:{
                $gte: currentDate
            }
        });
        //console.log(forms);
        const numOfRecords = forms.length;
        console.log('There are: ' + numOfRecords + ' records that were submitted today');
    }
    catch(err){
        console.log(err);
        return;
    }
});

module.exports = router;
