const Contacts = require('../models/schema')
const {HttpError} = require('../helpers/index')

const listContacts = async (req,res,next) => {
  try{
    const allContacts = await Contacts.find();
    res.json(allContacts)
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
    res.json(byId);
  }catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
};

const addContact = async (req,res,next) => {
  try{
    const newContact = await Contacts.create(req.body)
    res.status("201").json(newContact);
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
    res.json(updatedContact)
  }catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
};

const changeFavorite = async (req,res,next) =>{
  try{
    if(req.body.favorite === undefined){
      throw HttpError(400, 'missing field favorite')
    }
    console.log(req.params);
    const result = await Contacts.findByIdAndUpdate(req.params.contactId, req.body, {new:true})
    res.json(result)
  }catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  changeFavorite
};
