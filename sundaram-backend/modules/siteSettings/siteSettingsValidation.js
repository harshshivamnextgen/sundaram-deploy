const { z } = require('zod');

// Social media item schema
const socialMediaItemSchema = z.object({
  icon: z.string().min(1).max(200),
  name: z.string().min(1).max(100),
  link: z.string().url().max(500),
  isVisible: z.boolean().optional().default(true),
});

// Admin can update these fields; all optional so we can do partial updates.
// Note: logo and favicon are handled via uploaded files, not validated here.
const updateSiteSettingsSchema = z.object({
  siteName: z.string().min(1).max(200).optional(),
  address: z.string().max(500).optional().nullable(),
  mobileNumber: z.string().max(20).optional().nullable(),
  whatsappNumber: z.string().max(20).optional().nullable(),
  supportEmail: z.string().email().max(100).optional().nullable(),
  socialMedia: z.array(socialMediaItemSchema).optional(),
  meta: z.record(z.unknown()).optional(),
});

module.exports = {
  updateSiteSettingsSchema,
};

