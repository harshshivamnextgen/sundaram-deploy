const mongoose = require('mongoose');

const avgRatingSchema = new mongoose.Schema(
  {
    rating: { type: Number, enum: [4, 5], required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('AvgRating', avgRatingSchema);
