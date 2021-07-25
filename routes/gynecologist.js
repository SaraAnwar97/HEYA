const { body } = require('express-validator/check');

const express = require("express");
const isAuth = require('../middleware/is-auth');

const gynecologistController = require("../controllers/gynecologist");

const router = express.Router();

// GET /gynecologists/
router.get("/", isAuth, gynecologistController.getGynecologists);

//POST /gynecologists/gynecologist-info
router.post("/gynecologist-info", isAuth, [
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
], gynecologistController.getGynecologist);


module.exports = router;