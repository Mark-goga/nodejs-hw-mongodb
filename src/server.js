import express  from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { env } from '../src/utils/env.js';
import * as contactsServices from '../src/secvices/contacts.js'

export function setupServer() {
  const app = express();
  const logger = pino({
    transport: {
      target: "pino-pretty"
    }
  });

  app.use(logger);
  app.use(cors());
  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    const data = await contactsServices.getAllContacts();
    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const {contactId} = req.params;
    const data = await contactsServices.getAllContactById(contactId);
    if(!data) {
      return res.status(404).json({
        message: 'Contact not found',});
    }
    res.json({
      status: 200,
      message: "Successfully found contacts!",
      data,
    });
  });
  app.use((req, res) => {
    res.status(404).json({
      message: "not found"
    });
  });

  const port = Number(env("PORT", 3000));

  app.listen(port, () => console.log(`Server running on port ${port}`));
}
