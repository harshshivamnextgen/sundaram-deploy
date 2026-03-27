const { z } = require('zod');

// Helper to coerce boolean from string or boolean (for form-data compatibility)
// Form-data sends "true"/"false" as strings, JSON sends actual booleans
const booleanCoerce = z.preprocess(
  (val) => {
    if (val === undefined || val === null) return true; // default to true
    if (typeof val === 'boolean') return val;
    if (typeof val === 'string') {
      const lowerVal = val.toLowerCase().trim();
      return lowerVal === 'true' || lowerVal === '1';
    }
    return Boolean(val);
  },
  z.boolean()
);

const productSchema = z.object({
  name: z.string().min(1),
  description: z.string().max(2000).optional(),
  price: z.coerce.number().positive(),
  originalPrice: z.coerce.number().optional(),
  img: z.string().optional(),
  hoverImg: z.string().optional(),
  badge: z.string().optional(),
  carat: z.string().optional(),
  shape: z.string().optional(),
  occasion: z.string().optional(),
  type: z.string().optional(),
  isNewProduct: booleanCoerce.optional().default(false),
  isBestseller: booleanCoerce.optional().default(false),
  category: z.string().length(24),
  style: z.string().optional(),
  metal: z.string().optional(),
  gender: z.string().optional(),
  isActive: booleanCoerce.optional().default(true),
});

const updateProductSchema = productSchema.partial();

module.exports = {
  productSchema,
  updateProductSchema,
};
