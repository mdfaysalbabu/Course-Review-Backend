/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import ValidationError from '../helpError/validationError';
import handlerCastError from '../helpError/CastError';
import { ZodError } from 'zod';
import handlerZodError from '../helpError/ZodError';
import handleDuplicateError from '../helpError/duplicateError';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let errorMessage = 'Internal server error';
  let message = err.message || 'Something went wrong';
  let errorDetails = {};

  if (err?.name === 'ValidationError') {
    const validationError = ValidationError(err);
    statusCode = validationError.statusCode;
    message = validationError.message;
    errorMessage = validationError.errorMessage;
    errorDetails = validationError.errorDetails;
  } else if (err?.name === 'CastError') {
    const castValidationError = handlerCastError(err);
    statusCode = castValidationError.statusCode;
    message = castValidationError.message;
    errorMessage = castValidationError.errorMessage;
    errorDetails = castValidationError.errorDetails;
  } else if (err instanceof ZodError) {
    const zodValidationError = handlerZodError(err);
    statusCode = zodValidationError.statusCode;
    message = zodValidationError.message;
    errorMessage = zodValidationError.errorMessage;
    errorDetails = zodValidationError.errorDetails;
  } else if (err?.code === 11000) {
    const duplicateKeyError = handleDuplicateError(err);
    statusCode = duplicateKeyError.statusCode;
    message = duplicateKeyError.message;
    errorMessage = duplicateKeyError.errorMessage;
    errorDetails = duplicateKeyError.errorDetails;
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessage = err?.message;
    errorDetails = err;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: config.NODE_ENV === 'development' ? undefined : err.stack,
  });
};

export default globalErrorHandler;
