import mongoose from 'mongoose';
import { TErrorResponse } from '../types/errorResponse';

const handlerCastError = (err: mongoose.Error.CastError): TErrorResponse => {
  const errorMessage = `${err.value} is not a valid ID!`;
  return {
    message: 'Invalid ID',
    errorMessage,
    errorDetails: err,
  };
};

export default handlerCastError;
