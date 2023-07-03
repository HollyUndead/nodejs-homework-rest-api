const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");

const contactPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactPath, { encoding: "utf8" });
  return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const result = allContacts.find((item) => item.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const indexById = allContacts.findIndex((obj) => obj.id === contactId);
  let removedContact;
  if (indexById > -1) {
    removedContact = allContacts[indexById];
    allContacts.splice(indexById, 1);
    await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
  }
  return removedContact || null;
};

const addContact = async (body) => {
  const allContacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...body,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const allContacts = await listContacts();
  const indexById = allContacts.findIndex((obj) => obj.id === contactId);
  let updatedContact;
  if (indexById > -1) {
    updatedContact = allContacts[indexById];
    Object.keys(updatedContact).forEach((el) => {
      if (body[el] !== undefined) {
        updatedContact[el] = body[el];
      }
    });
    allContacts[indexById] = updatedContact;
    await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
  }
  return updatedContact || null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
