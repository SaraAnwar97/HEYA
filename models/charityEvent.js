const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const charityEventSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    capacity: {
        type: String,
        required: true
    },
    attendees: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

module.exports = mongoose.model("CharityEvent", charityEventSchema);