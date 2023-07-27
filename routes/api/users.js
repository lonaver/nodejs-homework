const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/users");
const {
  validateBody,
  authenticate,
  validateSubscription,
  upload,
} = require("../../middlewares");
const { schemas } = require("../../models/user");

//signup;
router.post(
  "/register",
  validateBody(schemas.registratorSchema),
  ctrl.register
); //

//signin
router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/",
  authenticate,
  validateSubscription(schemas.updateSubscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
