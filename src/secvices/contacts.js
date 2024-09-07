
import ContactCollection from '../db/models/Contacts.js';

export const getAllContacts = () => {
  return ContactCollection.find();
};
export const getAllContactById = id => {
  return ContactCollection.findById(id);
};
export const addContact = payload => {
  return ContactCollection.create(payload);
};
export const updateContact = async (filter , data , options = {}) => {
  const rawResult = await ContactCollection.findOneAndUpdate(filter , data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if(!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted)
  };
};
export const deleteContact = filter => {
  return ContactCollection.findOneAndDelete(filter);
};
