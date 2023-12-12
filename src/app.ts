/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express';

import cors from 'cors';

import notFound from './app/middlewear/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewear/globalErrorHandler';

// application routes
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api', router);

const test = async (req: Request, res: Response) => {
  res.send('Hello World!');
};

app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
