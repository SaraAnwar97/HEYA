const { body } = require('express-validator/check');
const isAuth = require('../middleware/is-auth');
const express = require("express");

const therapistController = require("../controllers/therapists");

const router = express.Router();

//GET /therapists/
router.get("/", isAuth, therapistController.getTherapists);

//POST /therapists/therapist-info
router.post("/therapist-info", isAuth, [
    body('city')
        .trim()
        .not()
        .isEmpty(),
    body('area')
        .trim()
        .not()
        .isEmpty(),
    body('name')
        .trim()
        .not()
        .isEmpty()
], therapistController.getTherapist);

//POST /therapists/CreateGroup
router.post("/CreateGroup", therapistController.createGroup);

module.exports = router;
