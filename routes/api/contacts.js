const express = require("express");
const cpntactController = require("../../controller/contacts-controller.js");
const helpers = require("../../helpers/index.js");

const router = express.Router();



router.get("/", async (req, res, next) => {
  try {
    const allContacts = await cpntactController.listContacts();
    res.json({ data: allContacts });
  } catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const byId = await cpntactController.getContactById(req.params.contactId);
    if (byId === null) {
      const error = helpers.HttpError(404, "Not found");
      throw error;
    }
    res.json({ message: "template message", data: byId });
  } catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const keysArray = ["name", "email", "phone"];
    const newContactOBJ = req.body;
    keysArray.forEach((element) => {
      if (newContactOBJ[element] === undefined) {
        const error = helpers.HttpError(
          400,
          `missing required ${element} field`
        );
        throw error;
      }
    });
    const validationResult = helpers.schema.validate(newContactOBJ);
    if (validationResult.error !== undefined) {
      const error = helpers.HttpError(
        400,
        `${validationResult.error.details[0].context.label} failed validation`
      );
      throw error;
    }
    const newContact = await cpntactController.addContact(newContactOBJ);
    res.status("201").json({ message: "add contact", data: newContact });
  } catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const deletedContact = await cpntactController.removeContact(
      req.params.contactId
    );
    if (deletedContact === null) {
      const error = helpers.HttpError(404, "Not found");
      throw error;
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const bodyKeys = Object.keys(req.body);
    if (
      bodyKeys.includes("name") ||
      bodyKeys.includes("email") ||
      bodyKeys.includes("phone")
    ) {
      const validationResult = helpers.schema.validate(req.body);
      if (validationResult.error !== undefined) {
        const error = helpers.HttpError(
          400,
          `${validationResult.error.details[0].context.label} failed validation`
        );
        throw error;
      }
      const { contactId } = req.params;
      const updateContact = await cpntactController.updateContact(
        contactId,
        req.body
      );
      if (updateContact === null) {
        const error = helpers.HttpError(404, "Not found");
        throw error;
      }
      res.json({ data: updateContact });
    } else {
      const error = helpers.HttpError(400, "missing fields");
      throw error;
    }
  } catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
});

module.exports = router;
