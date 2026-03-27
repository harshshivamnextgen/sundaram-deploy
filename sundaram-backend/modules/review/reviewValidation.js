const { z } = require('zod');

// Helper to coerce boolean from string or boolean (for form-data compatibility)
const booleanCoerce = z.preprocess(
  (val) => {
    if (typeof val === 'boolean') return val;
    if (typeof val === 'string') return val === 'true' || val === 'True' || val === '1';
    return val;
  },
  z.boolean()
);

const reviewSchema = z.object({
  name: z.string().min(1),
  rating: z.coerce.number().refine((val) => val === 4 || val === 5, {
    message: 'Rating must be 4 or 5',
  }),
  message: z.string().min(1),
  location: z.string().min(1),
  product: z.string().min(1),
  isActive: booleanCoerce.optional().default(true),
});

const updateReviewSchema = reviewSchema.partial();

module.exports = {
  reviewSchema,
  updateReviewSchema,
};
