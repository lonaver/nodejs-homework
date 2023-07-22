const express = require("express");
const router = express.Router();

const {
  validateBody,
  isValidId,
  validateFavorite,
  authenticate,
} = require("../../middlewares");
const { schemas } = require("../../models/contact");

const ctrl = require("../../controllers/contacts");

router.get("/", authenticate, ctrl.getAll); //

router.get("/:contactId", authenticate, isValidId, ctrl.getById); //

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  validateBody(schemas.addSchemaFields),
  ctrl.addContact
); //

router.delete("/:contactId", isValidId, ctrl.deleteContact); //, authenticate

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  validateBody(schemas.addSchemaFields),
  ctrl.putContact
); //

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateFavorite(schemas.updateFavoriteSchema),
  ctrl.updateStatusContact
); //

module.exports = router;
