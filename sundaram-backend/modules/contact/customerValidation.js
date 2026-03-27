const { z } = require('zod');

const customerSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string(),
  service: z.string().min(1),
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
  status: z.enum(['new', 'replied', 'closed']),
});

const replySchema = z.object({
    message: z.string().min(1),
});

module.exports = {
  customerSchema,
  statusSchema,
  replySchema,
};
