import express from 'express';
import { CourseControllers } from './course.controller';
import { validateRequest } from '../../middlewear/validateRequest';
import { CourseValidate } from './course-validate';

const router = express.Router();

router.post(
  '/course',
  validateRequest(CourseValidate.CourseValidationSchema),
  CourseControllers.createCourse,
);
router.get('/courses', CourseControllers.getAllCourse);
router.put('/courses/:id', CourseControllers.updateCourse);
router.get('/courses/:id/reviews', CourseControllers.getCourseIdReview);
router.get('/course/best', CourseControllers.getBestCourse);

export const CourseRouter = router;
