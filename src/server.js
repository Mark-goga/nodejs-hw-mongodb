import express  from 'express';

import cors from 'cors';

import { env } from '../src/utils/env.js';
import contactsRouter from './routers/contacts.js';
import errorHandler from './midllewares/errorHandler.js';
import notFoundHandler from './midllewares/notFoundHandler.js';
import logger from './midllewares/logger.js';


export function setupServer() {
  const app = express();


  // app.use(logger);
  app.use(cors());
  app.use(express.json());

  app.use('/contacts' , contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  const port = Number(env("PORT", 3000));

  app.listen(port, () => console.log(`Server running on port ${port}`));
}
