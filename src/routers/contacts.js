import {Router} from 'express';

import * as contactsControler from '../controller/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsControler.getAllContactsControler));

contactsRouter.get('/:contactId', ctrlWrapper(contactsControler.getContactByIdControler));

contactsRouter.post('/' , ctrlWrapper(contactsControler.addContactControler));

contactsRouter.patch("/:contactId" , ctrlWrapper(contactsControler.patchContactControler));

contactsRouter.put("/:contactId" , ctrlWrapper(contactsControler.upsertContactControler));

contactsRouter.delete("/:contactId" , ctrlWrapper(contactsControler.deleteContactControler));

export default contactsRouter;
