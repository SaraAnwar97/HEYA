const Gynecologist = require("../models/gynecologist");
const { validationResult } = require('express-validator');
const SupportGroup = require('../models/supportGroup');

exports.getGynecologists = (req, res, next) => {
    Gynecologist.find()
        .then((gynecologists) => {
            res
                .status(200)
                .json({
                    gynecologists: gynecologists
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getGynecologist = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation Failed!');
        error.statusCode = 422;
        throw error;
    }
    const city = req.body.city;
    const area = req.body.area;
    const name = req.body.name;
    Gynecologist.find({
        $or: [{ $and: [{ city: city }, { area: area }] }, { name: name }],
    })
        .then((gynecologists) => {
            if (!gynecologists) {
                const error = new Error('Could not find gynecologists!');
                error.statusCode = 404;
                throw error;
            }
            res
                .status(200)
                .json({
                    gynecologists: gynecologists
                });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};


