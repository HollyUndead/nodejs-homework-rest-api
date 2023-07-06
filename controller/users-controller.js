const { HttpError } = require("../helpers");
const User = require("../models/user-schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const imageDB = path.resolve("public", "avatars");

const createUser = async (req, res, next) => {
  const passwordHash = await bcrypt.hash(req.body.password, 10);
  try {
    const { email } = req.body;
    const userByEmail = await User.findOne({ email });
    if (userByEmail !== null) {
      throw HttpError(409, "Email in use");
    }
    const avatarURL = gravatar.url(email, { protocol: "https" });
    console.log(avatarURL);
    const user = await User.create({
      ...req.body,
      password: passwordHash,
      avatarURL,
    });
    res
      .status(201)
      .json({ email: user.email, subscription: user.subscription });
  } catch (error) {
    const { status = 500, message = "Server errror" } = error;
    res.status(status).json({ message });
  }
};

const signup = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const compareResult = await bcrypt.compare(req.body.password, user.password);
  if (!compareResult) {
    throw HttpError(401, "Email or password is wrong");
  }
  const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "23h" });
  user.token = token;
  const updatedUser = await User.findByIdAndUpdate(user._id, user, {
    new: true,
  });
  res.json({
    token,
    user: { email: updatedUser.email, subscription: updatedUser.subscription },
  });
};

const logoutUser = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = await User.findOne({ token });
  if (!user) {
    throw HttpError(401, "Not authorized");
  }
  user.token = "";
  console.log(user);
  await User.findOneAndUpdate({ id: user.id });
  res.status(204).json();
};

const uploadAvatar = async (req, res, next) => {
    const { path: oldPath, filename } = req.file;
    const newPath = path.join(imageDB, filename);
    await fs.rename(oldPath, newPath);
    const avatar = path.join("avatars", filename);
    const user = await User.findOne({
      token: req.headers.authorization.split(" ")[1],
    });
    user.avatarURL = avatar;
    const result = await User.findByIdAndUpdate(user.id, user, { new: true });
    const image = await Jimp.read(`./public/avatars/${filename}`)
    await image.resize(250,250).writeAsync(`./public/avatars/${filename}`)
    res.json({ avatarURL: result.avatarURL });
};

module.exports = {
  createUser,
  signup,
  logoutUser,
  uploadAvatar,
};
