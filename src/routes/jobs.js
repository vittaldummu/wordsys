//import the required modules
var express = require('express');
var router = express.Router();
var jobController = require('../controllers/jobcontrollers');

//api for create job
router.route('/job/createJob').post(jobController.postJob);

//api for getting the all jobs posted
router.route('/job/getAllJob').get(jobController.getAllJob);

//api for getting the job data from his id
router.route('/job/getJob/:id').get(jobController.getJob);

//api for searching the job data by JobTitle keyword
router.route('/job/searchJob').get(jobController.searchJob);

//api for updating the data of the job
router.route('/job/updateJob/:jobId').put(jobController.updateJob);

//api for deleting the job
router.route('/job/deleteJob/:jobId').delete(jobController.deleteJob);

//export the router
module.exports = router;