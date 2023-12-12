import express from 'express';
import { CategoryControllers } from './category.controller';
import { CategoryValidation } from './category.validate';
import { validateRequest } from '../../middlewear/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(CategoryValidation.CategoryValidationSchema),
  CategoryControllers.createCategory,
);
router.get('/', CategoryControllers.getAllCategory);

export const CategoryRoutes = router;
