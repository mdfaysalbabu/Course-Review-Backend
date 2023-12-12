import catchAsyncFunction from '../../utils/catchAsync';
import { ReviewService } from './review.service';

const createReview = catchAsyncFunction(async (req, res) => {
  const result = await ReviewService.createReview(req.body);
  res.status(200).json({
    success: true,
    message: 'Review created successfully',
    data: result,
  });
});

export const ReviewControllers = {
  createReview,
};
