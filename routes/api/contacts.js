const express = require("express");
const router = express.Router();

const { validateBody } = require("../../middlewares");
const schemas = require("../../schemas/contacts");

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post(
  "/",
  validateBody(schemas.addSchema),
  validateBody(schemas.addSchemaFilds),
  ctrl.addContact
);

router.delete("/:contactId", ctrl.deleteContact);

router.put(
  "/:contactId",
  validateBody(schemas.addSchema),
  validateBody(schemas.addSchemaFilds),
  ctrl.putContact
);

module.exports = router;
