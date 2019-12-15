const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');

//retrieve all contacts
router.get('/contacts', (req, res, next) => {
    //find all contacts and return json response
    Contact.find((err, contacts) => {
        console.log('You are in all contacts page');
        res.json(contacts);
    });
});

//create a contact
router.post('/contact/create', (req, res, next) => {
    console.log('You are now in create contact page!');
    let newContact = new Contact({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email
    });
    newContact.save((err, contact)=>{
        if(err){
            res.json({
                msg: 'failed to create the contact : ' + contact
            });
        }
        else{
            res.json({
                msg: 'successfully created the contact : ' + contact
            });    
        }
    });

});

//retrieve contact by #id
router.get('/contact/detail/:id', (req, res, next) => {
    console.log('You are in all contacts page');
    res.send('You are in contact detail page !');
});

//delete contacts by #id
router.delete('/contact/delete/:id', (req, res, next) => {
    console.log('You are in contact detail page!');
    Contact.deleteOne({_id: req.params.id}, (err, response)=>{
        if(err){
            res.json(err);
        }
        else{
            res.json(response);
        }
    });
});

module.exports = router;
