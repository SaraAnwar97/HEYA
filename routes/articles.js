const { body } = require('express-validator/check');

const express = require("express");
const isAuth = require('../middleware/is-auth');

const articlesController = require("../controllers/articles");

const router = express.Router();

// GET /gynecologists/
router.get("/", articlesController.getArticles);

module.exports = router;