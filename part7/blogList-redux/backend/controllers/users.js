const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    likes: 1,
  });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  if (password.length < 3) {
    return response
      .status(400)
      .json({
        error: `User validation failed for ('${username}'): Path password is shorter than the minimum allowed length (3)`,
      });
  } else if (username.length < 3) {
    return response
      .status(400)
      .json({
        error: `User validation failed: Path ('${username}') is shorter than the minimum allowed length (3)`,
      });
  }

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
