const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
//configure transporter
const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: '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'
  }
}));
const crypto = require('crypto');
const { validationResult } = require('express-validator/check');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const userName = req.body.userName;
  const email = req.body.email;
  const number = req.body.number;
  const password = req.body.password;
  bcrypt.hash(password, 12)
    .then(hashedPw => {
      const user = new User({
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        number: number,
        password: hashedPw,
        supportGroups: [],
        charityEvents: [],
        awarenessCampaigns: [],
        drivingClasses: [],
        therapyAppointments: [],
        gynecologyAppointments: []
      });
      return user.save();
    }).then(result => {
      res.status(201).json({
        message: 'User created',
        userId: result._id
      }); //result: User mongoose object
      //returns a promise
      transporter.sendMail({
        to: email,
        //verified email in sendgrid sender authentication
        from: 'saraanwar97@gmail.com',
        subject: 'signup succeeded!',
        html: '<h1> you successfully signed up! </h1>'
      });
    }).catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const userName = req.body.userName;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ userName: userName })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this user name could not be found');
        error.statusCode = 401; //Not authenticated
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign({
        userName: loadedUser.userName,
        userId: loadedUser._id.toString()
      },
        'secretkey',
        { expiresIn: '1hr' }
      );
      return res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.reset = (req, res, next) => {
  const email = req.body.email;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
    const token = buffer.toString('hex');
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          const error = new Error('No account with that email found');
          error.statusCode = 401; //404
          throw error;
        }
        //user with entered email found
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; //1 hr in milliseconds
        //userId = user._id.toString();
        return user.save();
      }).then(result => {
        res.status(200).json({ token: token, userId: result._id.toString() });
        transporter.sendMail({
          to: email,
          //verified email in sendgrid sender authentication
          from: 'saraanwar97@gmail.com',
          subject: 'Password Reset',
          html: `
         <p> You requested a password reset </p>
         <p>Click this <a href="http://localhost:8080/reset/${userId}/${token}">link</a> to set a new password.</p>
         `
        });
      })
      .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });

};

exports.postNewPassword = (req, res, next) => {
  const newPassword = req.body.password;
  const userId = req.params.userId;
  const token = req.params.token;
  let resetUser;

  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
    _id: userId
  })
    .then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
    }).then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    }).then(result => {
      res.status(201).json({
        message: 'updated password',
        userId: result._id
      }); //result: User mongoose object
      transporter.sendMail({
        to: resetUser.email,
        //verified email in sendgrid sender authentication
        from: 'saraanwar97@gmail.com',
        subject: 'Password updated',
        html: '<h1> Your password is updated <h1>'
      });

    }).catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });

};