/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import { QueryObj } from '../../types/queryObject';
import { TCourse } from './course.interface';
import Course from './course.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import Review from '../review/review.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};

const getAllCourse = async (query: QueryObj) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'startDate',
    sortOrder = 'asc',
    minPrice,
    maxPrice,
    tags,
    startDate,
    endDate,
    language,
    provider,
    durationInWeeks,
    level,
  } = query;

  const filter: Record<string, any> = {};

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = minPrice;
    if (maxPrice !== undefined) filter.price.$lte = maxPrice;
  }

  if (tags) filter['tags.name'] = tags;

  if (startDate) filter.startDate = { $gte: startDate };
  if (endDate) filter.endDate = { $lte: endDate };

  if (language) filter.language = language;
  if (provider) filter.provider = provider;

  if (durationInWeeks !== undefined) filter.durationInWeeks = durationInWeeks;

  if (level) filter['details.level'] = level;

  const result = await Course.find(filter)
    .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  return result;
};

const updateCourse = async (id: string, payload: Partial<TCourse>) => {
  const { tags, details, ...remainingField } = payload;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const modifiedData: Record<string, unknown> = {
      ...remainingField,
    };

    if (details && Object.keys(details).length) {
      for (const [key, value] of Object.entries(details)) {
        modifiedData[`details.${key}`] = value;
      }
    }

    if (!modifiedData) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }
    if (tags && tags.length > 0) {
      const deletedTags = tags
        .filter((el) => el?.name && el.isDeleted)
        .map((el) => el.name);

      const allDeletedTags = await Course.findByIdAndUpdate(
        id,
        {
          $pull: {
            tags: { name: { $in: deletedTags } },
          },
        },
        { session, new: true, runValidators: true },
      );

      if (!allDeletedTags) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }

      const newTags = tags?.filter((el) => el?.name && !el.isDeleted);

      const stayTags = await Course.findOne({
        _id: id,
        'tags.name': { $in: newTags.map((el) => el.name) },
      });
      if (stayTags) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Tag with already exists');
      }
      const newTagsCourse = await Course.findByIdAndUpdate(
        id,
        {
          $addToSet: { tags: { $each: newTags } },
        },
        { session, new: true, runValidators: true },
      );

      if (!newTagsCourse) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
      }
    }

    const updateCourse = await Course.findByIdAndUpdate(id, modifiedData, {
      session,
      new: true,
      runValidators: true,
    });

    await session.commitTransaction();
    await session.endSession();

    return updateCourse;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
  }
};

const getCourseIdReview = async (id: string) => {
  const allCourse = await Course.findById(id).lean();
  const allReview = await Review.find(
    { courseId: id },
    { _id: 0, __v: 0 },
  ).lean();

  return { allCourse, allReview };
};

const getBestCourse = async () => {
  const bestCourse = await Course.aggregate([
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'courseId',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' },
        reviewCount: { $size: '$reviews' },
      },
    },
    {
      $sort: { averageRating: -1 },
    },
    { $limit: 1 },
    {
      $project: {
        reviews: 0,
      },
    },
  ]);
  const newBestCourse = bestCourse[0];
  const averageRating = Number(newBestCourse?.averageRating?.toFixed(1));
  const reviewData = newBestCourse.reviewData;

  return { newBestCourse, averageRating, reviewData };
};

export const CoursesService = {
  createCourseIntoDB,
  getAllCourse,
  getCourseIdReview,
  updateCourse,
  getBestCourse,
};
