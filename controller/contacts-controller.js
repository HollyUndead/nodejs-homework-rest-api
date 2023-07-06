const Contacts = require('../models/contancts-schema')
const {HttpError} = require('../helpers/index')

const listContacts = async (req,res,next) => {
  try{
    const {_id: owner} = req.user
    const allContacts = await Contacts.find({owner});
    res.json({data: allContacts})
  }catch(error){
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
};

const getContactById = async (req,res,next) => {
  try{
    const byId = await Contacts.findById(req.params.contactId)
    if (!byId) {
      const error = HttpError(404, "Not found");
      throw error;
    }
    res.json({ data: byId });
  }catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
};

const addContact = async (req,res,next) => {
  try{
    const {_id: owner} = req.user
    const newContact = await Contacts.create({...req.body, owner})
    res.status("201").json({ message: "add contact", data: newContact });
  }catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
};

const removeContact = async (req,res,nexr) => {
  try{
    const removedContact = await Contacts.findByIdAndDelete(req.params.contactId)
    if(!removedContact){
      throw HttpError(404, "Not found");;
    }
    res.json({message: 'contact deleted'})
  }catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
};

const updateContact = async (req,res,next) => {
  try{
    const updatedContact = await Contacts.findByIdAndUpdate(req.params.contactId, req.body, {new: true})
    res.json({data: updatedContact})
  }catch (error) {
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
};
