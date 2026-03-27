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

// Base schema without refinements so that it can be safely "partial"-ized
const baseBlogSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  type: z.enum(['internal', 'external']),
  externalUrl: z.string().url().optional(),
  isActive: booleanCoerce.optional().default(true),
});

// Create the full create schema with refinement
const blogSchema = baseBlogSchema.refine(
  (data) => (data.type === 'external' ? Boolean(data.externalUrl) : true),
  {
    message: 'External blogs must include a url',
    path: ['externalUrl'],
  }
);

// Update schema: all fields optional, no cross-field refinement
const updateBlogSchema = baseBlogSchema.partial();

module.exports = {
  blogSchema,
  updateBlogSchema,
};
