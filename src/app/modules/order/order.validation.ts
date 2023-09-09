import { z } from 'zod';

const createZodSchema = z.object({
  body: z.object({
    orderedBooks: z.array(
      z.object({
        bookId: z.string({ required_error: 'Book ID is required' }),
        quantity: z.number({ required_error: 'Book Quantity is required' }),
      })
    ),
  }),
});

const updateZodSchema = z.object({
  body: z.object({
    orderedBooks: z.array(
      z
        .object({
          bookId: z.string().optional(),
          quantity: z.number().optional(),
        })
        .optional()
    ),
  }),
});

export const OrderValidation = {
  createZodSchema,
  updateZodSchema,
};
