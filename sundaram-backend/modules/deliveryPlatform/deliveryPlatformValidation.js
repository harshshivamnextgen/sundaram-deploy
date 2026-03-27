const { z } = require('zod');

// Helper to coerce boolean from string or boolean (for form-data compatibility)
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

const deliveryPlatformSchema = z.object({
  name: z.string().min(1).max(100),
  link: z.string().url().max(500),
  icon: z.string().max(500).optional().nullable(),
  order: z.coerce.number().int().optional().default(0),
  isActive: booleanCoerce.optional().default(true),
});

const updateDeliveryPlatformSchema = deliveryPlatformSchema.partial();

module.exports = {
  deliveryPlatformSchema,
  updateDeliveryPlatformSchema,
};
