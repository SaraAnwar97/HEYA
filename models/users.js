const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    number: {
        type: String,//to keep leading 0
        required: true
    },
    password: {
        type: String,
        required: true
    },
    supportGroups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'SupportGroup'
        }
    ],
    charityEvents: [
        {
            type: Schema.Types.ObjectId,
            ref: 'CharityEvent'
        }
    ],
    awarenessCampaigns: [
        {
            type: Schema.Types.ObjectId,
            ref: 'AwarenessCampaign'
        }
    ],
    drivingClasses: [
        {
            time: {
                type: Date,
                required: true
            },
            instructor: {
                type: Schema.Types.ObjectId,
                ref: 'DrivingInstructor'
            }
        }
    ],
    therapyAppointments: [
        {
            time: {
                type: Date,
                required: true
            },
            therapist: {
                type: Schema.Types.ObjectId,
                ref: 'Therapist'
            }
        }
    ],
    gynecologyAppointments: [
        {
            time: {
                type: Date,
                required: true
            },
            gynecologist: {
                type: Schema.Types.ObjectId,
                ref: 'Gynecologist'
            }
        }
    ],
    resetToken: String,
    resetTokenExpiration: Date
});

module.exports = mongoose.model('User', userSchema);