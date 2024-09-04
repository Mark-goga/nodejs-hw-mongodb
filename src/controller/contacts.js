import createHttpError from 'http-errors';
import * as contactsServices from '../secvices/contacts.js';

export const getAllContactsControler = async (req, res) => {
  const data = await contactsServices.getAllContacts();
  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data,
  });
};
export const getContactByIdControler = async (req, res) => {
  const {contactId} = req.params;
  const data = await contactsServices.getAllContactById(contactId);
  if(!data) {
    throw createHttpError(404 , "Contact not found");
  }
  res.json({
    status: 200,
    message: "Successfully found contacts!",
    data,
  });
};
