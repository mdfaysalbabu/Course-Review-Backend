import { Router } from 'express';
import { CourseRouter } from '../modules/course/course.router';

const router = Router();

const moduleRoutes = [
  {
    path: '/course',
    route: CourseRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
