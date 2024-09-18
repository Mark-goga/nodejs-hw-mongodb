
import { SORT_ORDER } from '../constants/index.js';
import ContactCollection from '../db/models/Contacts.js';
import calculatePaginationData from '../utils/calculatePaginationData.js';

export const getContacts = async({page ,
   perPage ,
   sortOrder = SORT_ORDER[0] ,
   sortBy = "_id" ,
   filter = {}
  }) => {
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactCollection.find();

  if(filter.isFavourite !== undefined) {
    contactsQuery.where("isFavourite").equals(filter.isFavourite);
  }
  console.log(filter);

  if(filter.contactType) {
    contactsQuery.where("contactType").equals(filter.contactType);
  }

  const count = await ContactCollection.find().merge(contactsQuery).countDocuments();
  const data = await contactsQuery.skip(skip).limit(perPage).sort({[sortBy]: sortOrder});

  // const data = await ContactCollection.find().skip(skip).limit(perPage).sort({[sortBy]: sortOrder});
  // const count  = await ContactCollection.find().countDocuments();

  const pagitationData = calculatePaginationData({perPage , page , count});

  return {totalItem: count,perPage ,page , data , ...pagitationData};
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
