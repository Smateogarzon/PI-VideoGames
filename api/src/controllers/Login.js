const { users } = require("../db");
const bcrypt = require("bcrypt");

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const existUser = await users.findOne({ where: { username: username } });
    if (!existUser) {
      return res.status(409).json({ Error: "usuario o contraseña incorrecta" });
    }
    bcrypt.compare(password, existUser.password, (error, result) => {
      if (error) {
        return res
          .status(409)
          .json({ Error: "Error al comparar contraseñas:", err });
      }
      if (result) {
        req.session.user = existUser.username;
        return res.status(200).send({ acces: true });
      } else {
        return res
          .status(409)
          .json({ Error: "usuario o contraseña incorrecta" });
      }
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

module.exports = login;
