
import ContactCollection from '../db/models/Contacts.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';

export const getContacts = async({page , perPage}) => {
  const skip = (page - 1) * perPage;

  const data = await ContactCollection.find().skip(skip).limit(perPage);
  const count = await ContactCollection.find().countDocuments();
  const pagitationData = calculatePaginationData({perPage , page , count});

  return {totalItem: count , data , ...pagitationData};
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
