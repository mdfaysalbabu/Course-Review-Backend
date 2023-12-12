import express from 'express';
import { validateRequest } from '../../middlewear/validateRequest';
import { ReviewControllers } from './review.controller';
import { ReviewValidation } from './review.validate';

const router = express.Router();

router.post(
  '/',
  validateRequest(ReviewValidation.ReviewValidationSchema),
  ReviewControllers.createReview,
);

export const ReviewRoutes = router;
