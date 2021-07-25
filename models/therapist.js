const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const therapistSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  workingHours: {
    type: String,
    required: true,
  },
  bookings: [
    {
      time: {
        type: Date,
        required: true
      },
      patient: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ]
});

module.exports = mongoose.model("Therapist", therapistSchema);
