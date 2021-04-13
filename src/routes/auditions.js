//import the required modules
var express = require('express');
var router = express.Router();
var auditionController = require('../controllers/auditioncontrollers');

//api for create audition
router.route('/audition/createaudition').post(auditionController.postAudition);

//api for getting the all auditions posted
router.route('/audition/getAllaudition').get(auditionController.getAllAudition);

//api for getting the audition data from his id
router.route('/audition/getaudition/:id').get(auditionController.getAudition);

//api for searching the audition data by auditionTitle keyword
router.route('/audition/searchaudition').get(auditionController.searchAudition);

//api for updating the data of the audition
router.route('/audition/updateaudition/:auditionId').put(auditionController.updateAudition);

//api for deleting the audition
router.route('/audition/deleteaudition/:auditionId').delete(auditionController.deleteAudition);

//export the router
module.exports = router;