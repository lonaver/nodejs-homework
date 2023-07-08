const contacts = require("../models/contacts");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getById = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     if (error.details[0].type === "any.required") {
  //       throw HttpError(400, "missing required " + error.details[0].path[0]);
  //     } else {
  //       throw HttpError(400, error.message);
  //     }
  //   }
  const result = await contacts.addContact(req.body);
  return res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { contactId: id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  return res.status(200).json({ message: "contact deleted" });
};

const putContact = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     if (error.details[0].type === "any.required") {
  //       throw HttpError(400, "missing required " + error.details[0].path[0]);
  //     } else {
  //       throw HttpError(400, error.message);
  //     }
  //   }
  const { contactId: id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  console.log(result);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  return res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  putContact: ctrlWrapper(putContact),
};
