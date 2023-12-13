import httpStatus from 'http-status';
import catchAsyncFunction from '../../utils/catchAsync';
import sendSuccessResponse from '../../utils/sendResponse';
import { CoursesService } from './course.service';
import Course from './course.model';

const createCourse = catchAsyncFunction(async (req, res) => {
  const result = await CoursesService.createCourseIntoDB(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

const getAllCourse = catchAsyncFunction(async (req, res) => {
  const result = await CoursesService.getAllCourse(req.query);

  const count = await Course.countDocuments();

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course retrieved successfully',
    meta: {
      page: Number(req.query?.page) || 1,
      limit: Number(req.query?.limit) || 2,
      total: count,
    },
    data: result,
  });
});

const getCourseIdReview = catchAsyncFunction(async (req, res) => {
  const { id } = req.params;
  const result = await CoursesService.getCourseIdReview(id);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course and Reviews retrieved successfully',
    data: { course: result.allCourse, reviews: result.allReview },
  });
});

const updateCourse = catchAsyncFunction(async (req, res) => {
  const { id } = req.params;
  const result = await CoursesService.updateCourse(id, req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course updated successfully',
    data: result,
  });
});

const getBestCourse = catchAsyncFunction(async (req, res) => {
  const result = await CoursesService.getBestCourse();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Best course retrieved successfully',
    data: {
      course: {
        ...result.newBestCourse,
        averageRating: result.averageRating,
        reviewCount: result.reviewData,
      },
    },
  });
});

export const CourseControllers = {
  createCourse,
  getAllCourse,
  getCourseIdReview,
  updateCourse,
  getBestCourse,
};
