const Contacts = require('../models/schema')

const listContacts = async () => {
  const allContacts = await Contacts.find();
  return allContacts;
};

const getContactById = async (contactId) => {
  const result = await Contacts.findById(contactId)
  return result;
};

const removeContact = async (contactId) => {
  const removedContact = await Contacts.findByIdAndDelete(contactId)
  return removedContact || null;
};

const addContact = async (body) => {
  const newContact = await Contacts.create(body)
  return newContact;
};

const updateContact = async (contactId, body) => {
  const updatedContact = await Contacts.findByIdAndUpdate(contactId, body, {new: true})
  return updatedContact || null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
