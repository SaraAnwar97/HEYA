const Therapist = require("../models/therapist");
const SupportGroup = require('../models/supportGroup');
const { validationResult } = require('express-validator');

exports.getTherapists = (req, res, next) => {
  Therapist.find()
    .then((therapists) => {
      res
        .status(200)
        .json({
          therapists: therapists
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getTherapist = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation Failed!');
    error.statusCode = 422;
    throw error;
  }
  const city = req.body.city;
  const area = req.body.area;
  const name = req.body.name;
  Therapist.find({
    $or: [{ $and: [{ city: city }, { area: area }] }, { name: name }],
  })
    .then((therapists) => {
      if (!therapists) {
        const error = new Error('Could not find therapists!');
        error.statusCode = 404;
        throw error;
      }
      res
        .status(200)
        .json({
          therapists: therapists
        });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createGroup = (req, res, next) => {
  const title = req.body.title;
  const capacity = req.body.capacity;
  const moderator = req.body.moderator;
  const time = new Date(2021, req.body.month, req.body.day, req.body.hours, req.body.minutes);

  const supportGroup = new SupportGroup({
    title: title,
    time: time,
    moderator: moderator,
    capacity: capacity,
    attendees: []
  });

  supportGroup
    .save()
    .then(result => {
      res.status(201).json({
        message: "Successfully created therapy group!",
        group: result,
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

};
