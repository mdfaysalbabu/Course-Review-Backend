import express from 'express';
import { CourseRouter } from '../modules/course/course.router';
import { ReviewRoutes } from '../modules/review/review.router';
import { CategoryRoutes } from '../modules/category/category.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '',
    route: CourseRouter,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
  {
    path: '/categories',
    route: CategoryRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
