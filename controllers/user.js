const SupportGroup = require('../models/supportGroup');
const User = require('../models/users');
const CharityEvent = require('../models/charityEvent');
const AwarenessCapmaign = require('../models/awarenessCampaign');
const DrivingInstructor = require('../models/drivingInstructor');
const Therapist = require('../models/therapist');
const Gynecologist = require('../models/gynecologist');
const Job = require('../models/job');

exports.bookSupportGroup = (req, res, next) => {
    const userId = req.userId;
    const groupId = req.params.groupId;
    SupportGroup
        .findById(groupId)
        .then(supportGroup => {
            if (!supportGroup) {
                const error = new Error('Could not find support group!');
                error.statusCode = 404;
                throw error;
            }
            if (supportGroup.capacity === "0") {
                const error = new Error('This support group is fully booked')
                error.statusCode = 422;
                throw error;
            }
            supportGroup.capacity = +supportGroup.capacity - 1;
            if (supportGroup.attendees.includes(userId)) {
                const error = new Error('You already booked this support group!');
                error.statusCode = 422;
                throw error;
            }
            supportGroup.attendees.push(userId);
            return supportGroup.save();
        })
        .then(group => {
            return User.findById(userId);
        })
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user!');
                error.statusCode = 404;
                throw error;
            }
            user.supportGroups.push(groupId);
            return user.save();

        })
        .then(result => {

            res.status(200).json({
                message: "Successfully booked support group!",
                result: result
            })

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.getSupportGroups = (req, res, next) => {
    SupportGroup
        .find()
        .then(result => {
            res.status(200).json({
                message: "Fetched support groups successfully",
                groups: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getCharityEvents = (req, res, next) => {
    CharityEvent
        .find()
        .then(result => {
            res.status(200).json({
                message: "Fetched charity events successfully",
                events: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.cancelSupportGroup = (req, res, next) => {
    const userId = req.userId;
    const groupId = req.params.groupId;
    SupportGroup
        .findById(groupId)
        .then(supportGroup => {
            if (!supportGroup) {
                const error = new Error('Could not find support group!');
                error.statusCode = 404;
                throw error;
            }
            if (!supportGroup.attendees.includes(userId)) {
                const error = new Error('You have not booked this support group!');
                error.statusCode = 422;
                throw error;
            }
            supportGroup.capacity = +supportGroup.capacity + 1;
            supportGroup.attendees.pull(userId);
            return supportGroup.save();
        })
        .then(group => {
            return User.findById(userId);
        })
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user!');
                error.statusCode = 404;
                throw error;
            }
            user.supportGroups.pull(groupId);
            return user.save();

        })
        .then(result => {

            res.status(200).json({
                message: "Successfully cancelled support group booking!",
                result: result
            })

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.volunteerInEvent = (req, res, next) => {
    const userId = req.userId;
    const eventId = req.params.eventId;
    CharityEvent
        .findById(eventId)
        .then(event => {
            if (!event) {
                const error = new Error('Could not find charity event!');
                error.statusCode = 404;
                throw error;
            }
            if (event.capacity === "0") {
                const error = new Error('No available spots in this event')
                error.statusCode = 422;
                throw error;
            }
            event.capacity = +event.capacity - 1;
            if (event.attendees.includes(userId)) {
                const error = new Error('You are already attending this event!');
                error.statusCode = 422;
                throw error;
            }
            event.attendees.push(userId);
            return event.save();
        })
        .then(event => {
            return User.findById(userId);
        })
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user!');
                error.statusCode = 404;
                throw error;
            }
            user.charityEvents.push(eventId);
            return user.save();

        })
        .then(result => {

            res.status(200).json({
                message: "Successfully registered charity event!",
                result: result
            })

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.cancelCharityEvent = (req, res, next) => {
    const userId = req.userId;
    const eventId = req.params.eventId;
    CharityEvent
        .findById(eventId)
        .then(event => {
            if (!event) {
                const error = new Error('Could not find charity event!');
                error.statusCode = 404;
                throw error;
            }
            if (!event.attendees.includes(userId)) {
                const error = new Error('You are not registered to this event!');
                error.statusCode = 422;
                throw error;
            }
            event.capacity = +event.capacity + 1;
            event.attendees.pull(userId);
            return event.save();
        })
        .then(event => {
            return User.findById(userId);
        })
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user!');
                error.statusCode = 404;
                throw error;
            }
            user.charityEvents.pull(eventId);
            return user.save();

        })
        .then(result => {

            res.status(200).json({
                message: "Successfully cancelled event registration!",
                result: result
            })

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.getCampaigns = (req, res, next) => {
    AwarenessCapmaign
        .find()
        .then(result => {
            res.status(200).json({
                message: "Fetched awareness campaigns successfully",
                campaigns: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.attendCampaign = (req, res, next) => {
    const userId = req.userId;
    const campaignId = req.params.campaignId;
    AwarenessCapmaign
        .findById(campaignId)
        .then(campaign => {
            if (!campaign) {
                const error = new Error('Could not find awareness campaign!');
                error.statusCode = 404;
                throw error;
            }
            if (campaign.capacity === "0") {
                const error = new Error('No available spots in this campaign')
                error.statusCode = 422;
                throw error;
            }
            campaign.capacity = +campaign.capacity - 1;
            if (campaign.attendees.includes(userId)) {
                const error = new Error('You are already attending this campaign!');
                error.statusCode = 422;
                throw error;
            }
            campaign.attendees.push(userId);
            return campaign.save();
        })
        .then(campaign => {
            return User.findById(userId);
        })
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user!');
                error.statusCode = 404;
                throw error;
            }
            user.awarenessCampaigns.push(campaignId);
            return user.save();

        })
        .then(result => {

            res.status(200).json({
                message: "Successfully registered awareness campaign!",
                result: result
            })

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.cancelCampaign = (req, res, next) => {
    const userId = req.userId;
    const campaignId = req.params.campaignId;
    AwarenessCapmaign
        .findById(campaignId)
        .then(campaign => {
            if (!campaign) {
                const error = new Error('Could not find cawareness campaign!');
                error.statusCode = 404;
                throw error;
            }
            if (!campaign.attendees.includes(userId)) {
                const error = new Error('You are not registered to this campaign!');
                error.statusCode = 422;
                throw error;
            }
            campaign.capacity = +campaign.capacity + 1;
            campaign.attendees.pull(userId);
            return campaign.save();
        })
        .then(campaign => {
            return User.findById(userId);
        })
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user!');
                error.statusCode = 404;
                throw error;
            }
            user.awarenessCampaigns.pull(campaignId);
            return user.save();

        })
        .then(result => {

            res.status(200).json({
                message: "Successfully cancelled campaign registration!",
                result: result
            })

        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.bookDrivingClass = (req, res, next) => {
    const instructorId = req.params.instructorId;
    const userId = req.userId;
    const time = new Date(req.body.year, req.body.month, req.body.day, req.body.hours + 2, req.body.minutes);
    let found;
    DrivingInstructor
        .findById(instructorId)
        .then(instructor => {
            if (!instructor) {
                const error = new Error('Could not find driving instructor!');
                error.statusCode = 404;
                throw error;
            }
            found = instructor;
            const query = {
                "_id": instructorId,
                "bookings.time": time
            };
            return DrivingInstructor.find(query);
        })
        .then(result => {
            if (result.length) {
                ///Instructor booked at this time slot
                const error = new Error('Instructor is not available at this time slot');
                error.statusCode = 422;
                throw error;
            }
            const booking = {
                "time": time,
                "student": userId
            }
            found.bookings.push(booking);
            return found.save();

        })
        .then(result => {
            return User.findById(userId);

        })
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user!');
                error.statusCode = 404;
                throw error;
            }
            const drivingClass = {
                "time": time,
                "instructor": instructorId
            };
            user.drivingClasses.push(drivingClass);
            return user.save();
        })
        .then(result => {
            res.status(200).json({
                message: "Successfully booked driving class!",
                result: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.cancelDrivingClass = (req, res, next) => {
    const instructorId = req.params.instructorId;
    const userId = req.userId;
    const time = req.body.time;
    let found;
    DrivingInstructor
        .findById(instructorId)
        .then(instructor => {
            if (!instructor) {
                const error = new Error('Could not find driving instructor!');
                error.statusCode = 404;
                throw error;
            }
            found = instructor;
            const query = {
                "_id": instructorId,
                "bookings.time": time,
                "bookings.student": userId
            };
            return DrivingInstructor.find(query);
        })
        .then(result => {
            if (!result.length) {
                ///No such booking
                const error = new Error('There is no booking at this time');
                error.statusCode = 404;
                throw error;
            }
            return found.update({
                $pull: {
                    bookings: {
                        "time": time,
                        "student": userId
                    }
                }
            });
        })
        .then(result => {
            return User.findById(userId);
        })
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user!');
                error.statusCode = 404;
                throw error;
            }
            return user.update({
                $pull: {
                    drivingClasses: {
                        "time": time,
                        "instructor": instructorId
                    }
                }
            });
        })
        .then(result => {
            res.status(200).json({
                message: "Successfully canceled driving class!",
                result: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.bookTherapy = (req, res, next) => {
    const therapistId = req.params.therapistId;
    const userId = req.userId;
    const time = new Date(req.body.year, req.body.month, req.body.day, req.body.hours + 2, req.body.minutes);
    let found;
    Therapist
        .findById(therapistId)
        .then(therapist => {
            if (!therapist) {
                const error = new Error('Could not find therapist!');
                error.statusCode = 404;
                throw error;
            }
            found = therapist;
            const query = {
                "_id": therapistId,
                "bookings.time": time
            };
            return Therapist.find(query);
        })
        .then(result => {
            if (result.length) {
                ///Therapist booked at this time slot
                const error = new Error('Therapist is not available at this time slot');
                error.statusCode = 422;
                throw error;
            }
            const booking = {
                "time": time,
                "patient": userId
            }
            found.bookings.push(booking);
            return found.save();

        })
        .then(result => {
            return User.findById(userId);

        })
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user!');
                error.statusCode = 404;
                throw error;
            }
            const therapyAppointment = {
                "time": time,
                "therapist": therapistId
            };
            user.therapyAppointments.push(therapyAppointment);
            return user.save();
        })
        .then(result => {
            res.status(200).json({
                message: "Successfully booked therapy session!",
                result: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.cancelTherapy = (req, res, next) => {
    const therapistId = req.params.therapistId;
    const userId = req.userId;
    const time = req.body.time;
    let found;
    Therapist
        .findById(therapistId)
        .then(therapist => {
            if (!therapist) {
                const error = new Error('Could not find therapist!');
                error.statusCode = 404;
                throw error;
            }
            found = therapist;
            const query = {
                "_id": therapistId,
                "bookings.time": time,
                "bookings.patient": userId
            };
            return Therapist.find(query);
        })
        .then(result => {
            if (!result.length) {
                ///No such booking
                const error = new Error('There is no booking at this time');
                error.statusCode = 404;
                throw error;
            }
            return found.update({
                $pull: {
                    bookings: {
                        "time": time,
                        "patient": userId
                    }
                }
            });
        })
        .then(result => {
            return User.findById(userId);
        })
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user!');
                error.statusCode = 404;
                throw error;
            }
            return user.update({
                $pull: {
                    therapyAppointments: {
                        "time": time,
                        "therapist": therapistId
                    }
                }
            });
        })
        .then(result => {
            res.status(200).json({
                message: "Successfully canceled therapy appointment!",
                result: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.bookGynecologist = (req, res, next) => {
    const gynecologistId = req.params.gynecologistId;
    const userId = req.userId;
    const time = new Date(req.body.year, req.body.month, req.body.day, req.body.hours + 2, req.body.minutes);
    let found;
    Gynecologist
        .findById(gynecologistId)
        .then(gynecologist => {
            if (!gynecologist) {
                const error = new Error('Could not find gynecologist!');
                error.statusCode = 404;
                throw error;
            }
            found = gynecologist;
            const query = {
                "_id": gynecologistId,
                "bookings.time": time
            };
            return Gynecologist.find(query);
        })
        .then(result => {
            if (result.length) {
                ///Therapist booked at this time slot
                const error = new Error('Gynecologist is not available at this time slot');
                error.statusCode = 422;
                throw error;
            }
            const booking = {
                "time": time,
                "patient": userId
            }
            found.bookings.push(booking);
            return found.save();

        })
        .then(result => {
            return User.findById(userId);

        })
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user!');
                error.statusCode = 404;
                throw error;
            }
            const gynecologyAppointment = {
                "time": time,
                "gynecologist": gynecologistId
            };
            user.gynecologyAppointments.push(gynecologyAppointment);
            return user.save();
        })
        .then(result => {
            res.status(200).json({
                message: "Successfully booked gynecology appointment!",
                result: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.cancelGynecologist = (req, res, next) => {
    const gynecologistId = req.params.gynecologistId;
    const userId = req.userId;
    const time = req.body.time;
    let found;
    Gynecologist
        .findById(gynecologistId)
        .then(gynecologist => {
            if (!gynecologist) {
                const error = new Error('Could not find gynecologist!');
                error.statusCode = 404;
                throw error;
            }
            found = gynecologist;
            const query = {
                "_id": gynecologistId,
                "bookings.time": time,
                "bookings.patient": userId
            };
            return Gynecologist.find(query);
        })
        .then(result => {
            if (!result.length) {
                ///No such booking
                const error = new Error('There is no booking at this time');
                error.statusCode = 404;
                throw error;
            }
            return found.update({
                $pull: {
                    bookings: {
                        "time": time,
                        "patient": userId
                    }
                }
            });
        })
        .then(result => {
            return User.findById(userId);
        })
        .then(user => {
            if (!user) {
                const error = new Error('Could not find user!');
                error.statusCode = 404;
                throw error;
            }
            return user.update({
                $pull: {
                    gynecologyAppointments: {
                        "time": time,
                        "gynecologist": gynecologistId
                    }
                }
            });
        })
        .then(result => {
            res.status(200).json({
                message: "Successfully canceled gynecologist appointment!",
                result: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.getJobs = (req, res, next) => {
    Job
        .find()
        .then(result => {
            res.status(200).json({
                message: "Fetched job opportunities successfully",
                jobs: result
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.applyJob = (req, res, next) => {
    const jobId = req.params.jobId;
    Job
        .findById(jobId)
        .then(result => {
            res.status(200).json({
                message: "Fetched application url successfully",
                url: result.url
            })
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};