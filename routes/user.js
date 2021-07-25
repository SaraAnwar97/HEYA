const isAuth = require('../middleware/is-auth');
const express = require("express");

const userController = require('../controllers/user');

const router = express.Router();

// POST /BookSupportGroup/groupId
router.post("/BookSupportGroup/:groupId", isAuth, userController.bookSupportGroup);

// GET /SupportGroups
router.get("/SupportGroups", isAuth, userController.getSupportGroups);

// GET /CharityEvents
router.get("/CharityEvents", isAuth, userController.getCharityEvents);

// POST /CancelSupportGroup/groupId
router.post("/CancelSupportGroup/:groupId", isAuth, userController.cancelSupportGroup);

// POST /Volunteer/eventId
router.post("/Volunteer/:eventId", isAuth, userController.volunteerInEvent);

// POST /CancelVolunteer/eventId
router.post("/CancelVolunteer/:eventId", isAuth, userController.cancelCharityEvent);

// GET /Campaigns
router.get("/Campaigns", isAuth, userController.getCampaigns);

// POST /AttendCampaign/campaignId
router.post("/AttendCampaign/:campaignId", isAuth, userController.attendCampaign);

// POST /CancelCampaign/campaignId
router.post("/CancelCampaign/:campaignId", isAuth, userController.cancelCampaign);

// POST /BookDrivingClass/instructorId
router.post("/BookDrivingClass/:instructorId", isAuth, userController.bookDrivingClass);

// POST /CancelDrivingClass/instructorId
router.post("/CancelDrivingClass/:instructorId", isAuth, userController.cancelDrivingClass);

//POST /BookTherapy/therapistId
router.post("/BookTherapy/:therapistId", isAuth, userController.bookTherapy);

//POST /CancelTherapy/therapistId
router.post("/CancelTherapy/:therapistId", isAuth, userController.cancelTherapy);

//POST /BookGynecologist/gynecologistId
router.post("/BookGynecologist/:gynecologistId", isAuth, userController.bookGynecologist);

//POST /CancelGynecologist/gynecologistId
router.post("/CancelGynecologist/:gynecologistId", isAuth, userController.cancelGynecologist);

// GET /GetJobs
router.get("/GetJobs", isAuth, userController.getJobs);

// GET /ApplyJob/jobId
router.get("/ApplyJob/:jobId", isAuth, userController.applyJob);

module.exports = router;