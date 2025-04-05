const mongoose = require('mongoose');

const overseerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: true },
  familyCount: { type: Number, required: true },
  aadharImage: { type: String, required: true }, // could be base64 or file path
  approved: { type: Boolean, default: false },
  location: {
    lat: Number,
    lng: Number,
  },
}, { timestamps: true });

module.exports = mongoose.model('Overseer', overseerSchema);
