import {Router} from 'express';

import * as contactsControler from '../controller/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../utils/validateBody.js';
import { contactsAddSchema, contactsPatchSchema } from '../validation/contacts.js';
import isValidId from '../midllewares/isValidId.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsControler.getAllContactsControler));

contactsRouter.get('/:contactId', isValidId ,  ctrlWrapper(contactsControler.getContactByIdControler));

contactsRouter.post('/' ,validateBody(contactsAddSchema), ctrlWrapper(contactsControler.addContactControler));

contactsRouter.patch("/:contactId" ,isValidId , validateBody(contactsPatchSchema), ctrlWrapper(contactsControler.patchContactControler));

contactsRouter.put("/:contactId" ,isValidId , validateBody(contactsAddSchema), ctrlWrapper(contactsControler.upsertContactControler));

contactsRouter.delete("/:contactId" ,isValidId, ctrlWrapper(contactsControler.deleteContactControler));

export default contactsRouter;
