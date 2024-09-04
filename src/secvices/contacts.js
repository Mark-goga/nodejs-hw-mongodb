import ContactCollection from '../db/models/Contacts.js';

export const getAllContacts = () => {
  return ContactCollection.find();
};
export const getAllContactById = id => {
  return ContactCollection.findById(id);
};
