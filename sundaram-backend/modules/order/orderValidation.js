const { z } = require('zod');

const orderSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  category: z.string().min(1),
  product: z.string().min(1),
  price: z.coerce.number().min(0),
  quantity: z.coerce.number().min(1),
  total: z.coerce.number().min(0),
  message: z.string().min(1),
}).passthrough().superRefine((data, ctx) => {
  // Validate phone: allow empty string or require at least 6 characters
  if (data.phone && data.phone !== '' && data.phone.length < 6) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Phone must be at least 6 characters if provided',
      path: ['phone'],
    });
  }
});

const statusSchema = z.object({
  status: z.enum(['pending', 'completed', 'cancelled']),
});

module.exports = {
  orderSchema,
  statusSchema,
};
