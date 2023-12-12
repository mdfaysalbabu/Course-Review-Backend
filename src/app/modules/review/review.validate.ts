import { z } from 'zod';

const ReviewValidationSchema = z.object({
  courseId: z.string(),
  rating: z.number().min(1).max(5),
  review: z.string(),
});

export const ReviewValidation = {
  ReviewValidationSchema,
};
