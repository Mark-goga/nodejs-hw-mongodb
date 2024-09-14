import createHttpError from 'http-errors';
import * as contactsServices from '../secvices/contacts.js';
import parsePaginationParams from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Contacts.js';


export const getAllContactsControler = async (req, res) => {
  const {page , perPage} = parsePaginationParams(req.query);
  const {sortBy , sortOrder} = parseSortParams({...req.query , sortFields});

  const data = await contactsServices.getContacts({page , perPage , sortOrder , sortBy});

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
export const addContactControler = async (req , res) => {
  const data = await contactsServices.addContact(req.body);

  res.status(201).json({
    status: 201,
		message: "Successfully created a contact!",
		data
  });
};

export const patchContactControler = async (req , res) => {
  const {contactId} = req.params;
  const result = await contactsServices.updateContact({"_id": contactId} , req.body);

  if (!result) {
    throw createHttpError(404, `Contact not found`);
  };
  res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: result.data
  });
};
export const upsertContactControler =  async (req , res) => {
  const {contactId} = req.params;
  const {data , isNew} = await contactsServices.updateContact({"_id": contactId} , req.body , {upsert: true});

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: "Contact upsert successfully",
    data,
  });
};
export const deleteContactControler  = async (req, res) => {
  const {contactId} = req.params;
  const data = await contactsServices.deleteContact({"_id": contactId});

  if(!data) {
    throw createHttpError(404 , 'Contact not found');
  }

  res.status(204).send();
};
