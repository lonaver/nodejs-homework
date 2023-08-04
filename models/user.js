const Joi = require("joi");

const { Schema, model } = require("mongoose");

const { handleMongooseError } = require("../helpers");

const listSubscriptions = ["starter", "pro", "business"];

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: listSubscriptions,
      default: "starter",
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    avatarURL: String,
    token: String,
  },
  { versionKey: false, timestamps: false }
);

userSchema.post("save", handleMongooseError);

const registratorSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const emailSchema = Joi.object({
  email: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});
const updateSubscriptionSchema = Joi.object({
  subscription: Joi.string()
    .valid(...listSubscriptions)
    .required(),
});

const schemas = {
  registratorSchema,
  emailSchema,
  loginSchema,
  updateSubscriptionSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
