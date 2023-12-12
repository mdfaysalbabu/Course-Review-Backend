import { z } from 'zod';

const CategoryValidationSchema = z.object({
  name: z.string(),
});

export const CategoryValidation = {
  CategoryValidationSchema,
};
