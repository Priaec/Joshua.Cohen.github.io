const mongoose = require('mongoose');
const contactFormSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    emailAddress:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdDate:{
        type: Date,
        required: true,
        default: Date.now
    }
});

//check if the name (First or last) is valid
contactFormSchema.methods.validName = (name)=>{
    const validRegex = /^[a-zA-Z]*$/
    if(name.match(validRegex))
        return true
    else
        return false
}    

//check if the email is valid
contactFormSchema.methods.validEmail = (email)=>{
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(email.match(validRegex))
        return true
    else
        return false
}

//check if the description is valid
contactFormSchema.methods.validDescription = (description)=>{
    if(description.length >= 1)
        return true
    else
        return false
}

module.exports = mongoose.model('ContactForm', contactFormSchema);