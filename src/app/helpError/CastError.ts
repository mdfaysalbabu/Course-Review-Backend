import mongoose from 'mongoose';
import { TErrorResponse } from '../types/errorResponse';

const handlerCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const errorMessage = `${err.value} is not a valid ID!`;
  const statusCode = 400;
  return {
    statusCode,
    message: 'Invalid ID',
    errorMessage,
    errorDetails: err,
  };
};

export default handlerCastError;
