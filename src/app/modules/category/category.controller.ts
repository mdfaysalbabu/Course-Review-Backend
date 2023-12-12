import httpStatus from 'http-status';
import catchAsyncFunction from '../../utils/catchAsync';
import { CategoryService } from './category.service';
import sendSuccessResponse from '../../utils/sendResponse';

const createCategory = catchAsyncFunction(async (req, res) => {
  const result = await CategoryService.createCategory(req.body);
  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategory = catchAsyncFunction(async (req, res) => {
  const result = await CategoryService.getAllCategory();
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully',
    data: result,
  });
});

export const CategoryControllers = {
  createCategory,
  getAllCategory,
};
