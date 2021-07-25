const mongoose = require("mongoose");

 const Schema = mongoose.Schema;

 const donationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
     area: {
         type: String,
         required: true
     },
     organization: {
         type: String,
         required: true
     },
     amount: {
         type: Number,
         required: true
     }
 });

 module.exports = mongoose.model('Donation', donationSchema);