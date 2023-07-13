const express = require("express");
const router = express.Router();

const {
  validateBody,
  isValidId,
  validateFavorite,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post(
  "/",
  validateBody(schemas.addSchema),
  validateBody(schemas.addSchemaFields),
  ctrl.addContact
);

router.delete("/:contactId", isValidId, ctrl.deleteContact);

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  validateBody(schemas.addSchemaFields),
  ctrl.putContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
);

module.exports = router;
