const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const drivingInstructorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    bookings: [
        {
            time: {
                type: Date,
                required: true
            },
            student: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
});

module.exports = mongoose.model("DrivingInstructor", drivingInstructorSchema);