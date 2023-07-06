const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controller/contacts-controller.js");
const {isValidId, isBodyEmpty, validateBody, authentificate} = require('../../middlewares/index.js')
const {contactSchemaJoi} = require('../../schema/schemaJOI.js')

const router = express.Router();

router.use(authentificate)

router.get("/", listContacts)


router.get("/:contactId", isValidId, getContactById)


router.post("/", isBodyEmpty, validateBody(contactSchemaJoi), addContact)


router.delete("/:contactId", isValidId, removeContact)


router.put("/:contactId", isValidId, isBodyEmpty, validateBody(contactSchemaJoi), updateContact)



module.exports = router;
