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

const categorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  route: z.string().optional(),
  type: z.enum(['category', 'style', 'metal']).optional().default('category'),
  order: z.coerce.number().int().optional().default(0),
  isActive: booleanCoerce.optional().default(true),
});

const updateCategorySchema = categorySchema.partial();

module.exports = {
  categorySchema,
  updateCategorySchema,
};
