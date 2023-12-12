/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express';

import cors from 'cors';

import notFound from './app/middlewear/notFound';
import router from './app/routes';
import globalErrorHandler from './app/middlewear/globalErrorHandler';
import config from './app/config';

// application routes
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send(`Server Running on port ${config.port}`);
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
