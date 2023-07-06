const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  changeFavorite
} = require("../../controller/contacts-controller.js");
const {isValidId, isBodyEmpty,validateBody} = require('../../middlewares/index.js')
const contactSchema = require('../../schema/contact-schemaJOI.js')

const router = express.Router();

router.get("/", listContacts)


router.get("/:contactId", isValidId, getContactById)


router.post("/", isBodyEmpty, validateBody(contactSchema), addContact)


router.delete("/:contactId", isValidId, removeContact)


router.put("/:contactId", isValidId, isBodyEmpty, validateBody(contactSchema), updateContact)

router.patch('/:contactId/favorite', changeFavorite)



module.exports = router;
