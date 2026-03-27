const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  price: { type: Number, required: true },
  originalPrice: { type: Number },              // NEW
  img: { type: String, required: true },        // NEW
  hoverImg: { type: String },                   // NEW
  badge: { type: String },                      // NEW (e.g., "New", "Sale")
  carat: { type: String },                      // NEW 
  shape: { type: String },                      // NEW
  occasion: { type: String },                   // NEW
  type: { type: String },                       // NEW (e.g., "Solitaire", "Tennis")
  isNewProduct: { type: Boolean, default: false }, // NEW (renamed from `isNew` to avoid JS strict mode conflicts)
  isBestseller: { type: Boolean, default: false }, // NEW
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  style: { type: String },                      // NEW (e.g., "Victorian", "Art Deco")
  metal: { type: String },                      // NEW (e.g., "Yellow Gold", "Rose Gold")
  gender: { type: String },                     // NEW (e.g., "Men", "Women", "Unisex")
  isActive: { type: Boolean, default: true },
}, { timestamps: true });


module.exports = mongoose.model('Product', productSchema);
