const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, enum: [4, 5], required: true },
    message: { type: String, required: true },
    location: { type: String, required: true },
    product: { type: String, required: true },
    
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', reviewSchema);
