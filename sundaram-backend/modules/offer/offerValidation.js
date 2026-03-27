const { z } = require('zod');

const offerSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
});

const updateOfferSchema = offerSchema.partial();

module.exports = {
  offerSchema,
  updateOfferSchema,
};
