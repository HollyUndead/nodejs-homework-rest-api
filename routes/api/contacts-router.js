const express = require("express");
const listOfFunctions = require("../../models/contacts-controller.js");
const helpers = require("../../helpers/index.js");
const {isBodyEmpty, validateBody} = require('../../middleware/index.js')

const router = express.Router();

router.get("/", listOfFunctions.getAllContacts);

router.get("/:contactId", listOfFunctions.getContactById);

router.post("/", isBodyEmpty, validateBody(helpers.schema), listOfFunctions.addContact);

router.delete("/:contactId", listOfFunctions.removeContact);

router.put("/:contactId", isBodyEmpty, validateBody(helpers.schema), listOfFunctions.updateContact);

module.exports = router;
