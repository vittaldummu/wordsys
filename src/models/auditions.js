// Import required modules.
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// create the Schema for job post
var auditionSchema = new Schema({
    fullName: {
        type: String
    },
    age: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    location: {
        type: String
    },
    
    // created_at: {
    //     type: Date,
    //     default: Date.now()
    // },
    // updated_at: {
    //     type: Date
    // }
});

// we need to create a model for using schema
var Audition = mongoose.model('audition', auditionSchema);

// make this available to our jobs in our Node applications
module.exports = Audition;
