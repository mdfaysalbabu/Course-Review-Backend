import mongoose from 'mongoose';
import { TErrorResponse } from '../types/errorResponse';

const ValidationError = (
  err: mongoose.Error.ValidationError,
): TErrorResponse => {
  const errorMessage = ` ${err.message}`;
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage,
    errorDetails: err,
  };
};

export default ValidationError;
