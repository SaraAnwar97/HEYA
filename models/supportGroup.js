const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const supportGroupSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true
    },
    moderator: {
        type: Schema.Types.ObjectId,
        ref: 'Therapist',
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
module.exports = mongoose.model("SupportGroup", supportGroupSchema);