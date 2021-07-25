const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    requirements: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Job", jobSchema);