const { z } = require('zod');

// Helper to coerce boolean from string or boolean
const booleanCoerce = z.preprocess(
  (val) => {
    if (val === undefined || val === null) return true;
    if (typeof val === 'boolean') return val;
    if (typeof val === 'string') {
      const lowerVal = val.toLowerCase().trim();
      return lowerVal === 'true' || lowerVal === '1';
    }
    return Boolean(val);
  },
  z.boolean()
);

const bannerBaseSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().max(2000).optional(),
  description: z.string().max(4000).optional(),
  type: z.enum(['home', 'menu', 'offers', 'blogs', 'about', 'contact', 'catering', 'wholesale', 'other']).optional().default('other'),
  pageKey: z.string().min(1), // e.g. 'home', 'menu', 'offers', 'blogs', 'about', 'contact', 'catering', 'wholesale'
  position: z.enum(['hero', 'top', 'bottom', 'sidebar']).optional(),
  ctaLabel: z.string().max(100).optional(),
  ctaUrl: z.string().url().optional(),
  backgroundColor: z.string().max(50).optional(),
  textColor: z.string().max(50).optional(),
  sortOrder: z.coerce.number().int().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  isActive: booleanCoerce.optional().default(true),
});

const bannerSchema = bannerBaseSchema;

const updateBannerSchema = bannerBaseSchema.partial();

module.exports = {
  bannerSchema,
  updateBannerSchema,
};

