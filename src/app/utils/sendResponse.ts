/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

type TSuccessResponse<T> = {
  statusCode: number;
  message?: string;
  success: boolean;
  meta?:any;
  data: T | T[] | null;
};

const sendSuccessResponse = <T>(res: Response, data: TSuccessResponse<T>) => {
  res.status(data.statusCode).json({
    status: data.success,
    message: data.message,
    statusCode: data.statusCode,
    meta:data.meta,
    data: data.data,
  });
};

export default sendSuccessResponse;
