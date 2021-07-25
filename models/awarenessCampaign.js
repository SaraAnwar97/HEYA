const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const awarenessCampaignSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    moderator: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    date: {
        type: Date,
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

module.exports = mongoose.model("AwarenessCampaign", awarenessCampaignSchema);