const { z } = require('zod');

const contentPageSchema = z.object({
  pageKey: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().max(500).optional(),
  plainTextContent: z.string().min(1),
});

const updateContentPageSchema = contentPageSchema.partial();

module.exports = {
  contentPageSchema,
  updateContentPageSchema,
};
