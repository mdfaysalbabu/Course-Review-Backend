/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse } from '../types/errorResponse';

const handleDuplicateError = (err: any): TErrorResponse => {
  const match = err.message.match(/{[^}]*"(.*?)"/);
  const extractedMessage = match && match[1];

  return {
    message: 'Validation Error',
    errorMessage: `${extractedMessage} already exist!`,
    errorDetails: err,
  };
};

export default handleDuplicateError;
