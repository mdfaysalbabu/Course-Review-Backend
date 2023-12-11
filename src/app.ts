/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { Application, Request, Response } from 'express';

import cors from 'cors';


const app: Application = express();

app.use(express.json());
app.use(cors());

// application routes



// parser

const test = async (req: Request, res: Response) => {
  res.send('Hello World!');
};



export default app;
