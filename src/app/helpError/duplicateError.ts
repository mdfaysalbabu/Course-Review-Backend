/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorResponse } from "../types/errorResponse";

const handleDuplicateError = (err: any): TErrorResponse=> {
    const match = err.message.match(/{[^}]*"(.*?)"/);
    const extractedMessage = match && match[1];
    const statusCode = 400;
    return {
      statusCode,
      message: "Validation Error",
      errorMessage: `${extractedMessage} already exist!`,
      errorDetails: err,
    };
  };
  
  export default handleDuplicateError;