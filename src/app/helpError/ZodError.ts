import { ZodError, ZodIssue } from 'zod';
import { TErrorResponse } from '../types/errorResponse';

const handlerZodError = (err: ZodError): TErrorResponse => {
  const errorMessage = err.issues
    .map((issue: ZodIssue) => `${issue.path.join('.')} is ${issue.message}`)
    .join('. ');

  return {
    message: 'Validation Error',
    errorMessage,
    errorDetails: err,
  };
};

export default handlerZodError;
