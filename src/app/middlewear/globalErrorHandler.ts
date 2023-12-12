/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
    
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorMessage = err.message || 'An unexpected error occurred';
  let errorDetails = {};

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorDetails = err.details || {};
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    errorDetails,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};

export default globalErrorHandler;
