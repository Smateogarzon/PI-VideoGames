const { users } = require("../db");
const bcrypt = require("bcrypt");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Buscar al usuario en la base de datos
    const existUser = await users.findOne({ where: { email: email } });

    // Verificar si el usuario existe
    if (!existUser) {
      return res.status(409).json({ Error: "Usuario o contraseña incorrecta" });
    }

    // Comparar la contraseña proporcionada con la almacenada en la base de datos
    bcrypt.compare(password, existUser.password, (error, result) => {
      if (error) {
        // Manejar errores al comparar contraseñas
        return res
          .status(409)
          .json({ Error: "Error al comparar contraseñas", err });
      }
      if (result) {
        req.session.user = existUser.username;
        console.log(req.session.user);
        return res
          .status(200)
          .send({ access: true, userName: req.session.user });
      } else {
        return res
          .status(409)
          .json({ Error: "Usuario o contraseña incorrecta" });
      }
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

module.exports = login;
