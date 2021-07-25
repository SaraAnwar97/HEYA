const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articlesSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    article: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("articles",articlesSchema);
