import {Router} from 'express';

import * as contactsControler from '../controller/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsControler.getAllContactsControler));

contactsRouter.get('/:contactId', ctrlWrapper(contactsControler.getContactByIdControler));

export default contactsRouter;
