const bcrypt = require("bcrypt");
const { users } = require("../db");
const Validation = require("../utils/validations");

async function postUser(req, res) {
  try {
    const { email, password, username } = req.body;

    const error = Validation(password);
    const requiredFields = ["email", "password", "username"];
    const missingFields = requiredFields.filter((file) => !req.body[file]);
    if (missingFields.length > 0) {
      return res.status(400).send(`faltan datos: ${missingFields.join(", ")}`);
    }
    if (error && Object.keys(error).length > 0) {
      return res.status(400).json(error);
    }
    const existignUser = await users.findOne({ where: { username: username } });
    const existignEmail = await users.findOne({
      where: { email: email },
    });

    if (existignUser) {
      return res.status(409).send("el usuario ya existe intenta cambiarlo");
    }
    if (existignEmail) {
      return res
        .status(409)
        .send("el email ya ha sido registrado anterior mente");
    }
    const passwordHash = await bcrypt.hash(password, 11);

    const [user, created] = await users.findOrCreate({
      where: { email: email, username: username, password: passwordHash },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = postUser;
