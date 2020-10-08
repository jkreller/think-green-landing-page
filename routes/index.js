const express = require('express');

const router = express.Router();
const User = require('../models/user');
const errorMiddleware = require('./middleware/error_middleware');
const ipAddressMiddleware = require('./middleware/ip_address_middleware');

const EmailHelper = require('../helpers/email_helper');

/* GET home page. */
router.get('/', errorMiddleware.asyncErrorHandler(async (req, res, next) => {
    res.render('index');
}));

/* GET legal notice. */
router.get('/legal-notice', errorMiddleware.asyncErrorHandler(async (req, res, next) => {
    res.render('legal-notice');
}));

/* GET privacy policy. */
router.get('/privacy-policy', errorMiddleware.asyncErrorHandler(async (req, res, next) => {
    res.render('privacy-policy');
}));

/* GET email notification. */
router.post('/register-mail', ipAddressMiddleware.fetchIpAddress, errorMiddleware.asyncErrorHandler(async (req, res, next) => {
    const email = req.body.email;
    const baseUrl = req.protocol + '://' + req.get('host');

    let success = false;
    let user = new User({
        email: email,
        registration_ip_address: req.ipAddress
    });

    try {
        await user.save();
        success = true;
    } catch (e) {
        //if email already exists
        if (e.code !== 11000) {
            throw e;
        }
    }

    let confirmationLink = `${baseUrl}/confirm-email/${user.id}`;

    if (success) {
        await EmailHelper.sendConfirmationMailWithMailJet(user, confirmationLink);
    }

    res.render('index', {success: success, email: email});
}));

/* GET email confirmation. */
router.get('/confirm-email/:userId', ipAddressMiddleware.fetchIpAddress, errorMiddleware.asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.params.userId);

    if (user && !user.confirmed_at) {
        user.confirmed_at = Date.now();
        user.confirmation_ip_address = req.ipAddress;
        user.save();
    }

    res.render('confirmation-success');
}));

module.exports = router;
