const express = require('express');
const donationController = require('../controllers/donations');
const isAuth = require('../middleware/is-auth');
const router = express.Router();
// GET /donations/posts
router.get('/posts',isAuth,donationController.getDonations);
// GET /donations/checkout/:donationId
router.get('/checkout/:donationId',isAuth,donationController.checkout);
// router.get('/checkout/success',donationController.checkoutSuccess);
// router.get('/checkout/cancel',donationController.checkout);

module.exports = router;
