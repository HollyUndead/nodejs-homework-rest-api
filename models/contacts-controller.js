const path = require("path");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const { HttpError } = require("../helpers/index");

const contactPath = path.resolve("./models/contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactPath, { encoding: "utf8" });
  return JSON.parse(allContacts);
};

const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    res.json(allContacts);
  } catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
};

const getContactById = async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    const byId = allContacts.find((item) => item.id === req.params.contactId);
    if (!byId) {
      const error = HttpError(404, "Not found");
      throw error;
    }
    res.json(byId);
  } catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
};

const removeContact = async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    const indexById = allContacts.findIndex(
      (obj) => obj.id === req.params.contactId
    );
    let removedContact;
    if (indexById > -1) {
      removedContact = allContacts[indexById];
      allContacts.splice(indexById, 1);
      await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
    }
    if (!removedContact) {
      const error = HttpError(404, "Not found");
      throw error;
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
};

const addContact = async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...req.body,
    };
    allContacts.push(newContact);
    await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
    res.status("201").json(newContact);
  } catch (error) {
    console.log(error);
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const allContacts = await listContacts();
    const indexById = allContacts.findIndex(
      (obj) => obj.id === req.params.contactId
    );
    let updatedContact;
    if (indexById > -1) {
      updatedContact = allContacts[indexById];
      Object.keys(updatedContact).forEach((el) => {
        if (req.body[el] !== undefined) {
          updatedContact[el] = req.body[el];
        }
      });
      allContacts[indexById] = updatedContact;
      await fs.writeFile(contactPath, JSON.stringify(allContacts, null, 2));
    }
    if (!updatedContact) {
      const error = HttpError(404, "Not found");
      throw error;
    }
    res.json(updatedContact);
  } catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  getAllContacts,
};
