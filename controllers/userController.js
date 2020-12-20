const monk = require("monk");

// connects to data base through Monk
const db = monk(process.env.MONGO_URI);

// To get Specific collection just do db.get
const users = db.get("users");

// schema validation
const joi = require("@hapi/joi");

const userSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().trim().required(),
  password: joi.string().trim().required(),
});

const getUsers = async (req, res, next) => {
  try {
    let allUsers = await users.find({});
    res.json(allUsers);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await users.findOne({ _id: id });
    if (!user) return next();

    res.json(user);
  } catch (error) {
    next(error);
  }
};

const postUsers = async (req, res, next) => {
  try {
    console.log("body------>", req.body);
    const obj = {
      name: "test1",
      email: "test1@exampl.com",
      password: "test1123",
    };
    const value = await userSchema.validateAsync(req.body);
    const inserted = await users.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
};

const putUsers = async (req, res, next) => {
  try {
    console.log("body------>", req.body);
    const value = await userSchema.validateAsync(req.body);
    const inserted = await users.insert(value);
    res.json(inserted);
  } catch (error) {
    next(error);
  }
};

const deleteUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    await users.remove({ _id: id });
    res.json({
      message: "user deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getUsers, getUserById, postUsers, putUsers, deleteUsers };
