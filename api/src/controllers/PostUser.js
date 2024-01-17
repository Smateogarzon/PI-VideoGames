const bcrypt = require('bcrypt');
const {users} = require('../db');
const Validation = require('../utils/validations');

async function postUser(req, res) {
  try {
    const {email, password, username} = req.body;
    const error = Validation(password);
    console.log(error);
    if (error && Object.keys(error).length > 0)
      return res.status(400).json(error);
    const passwordHash = await bcrypt.hash(password, 11);

    const [user, created] = await users.findOrCreate({
      where: {email: email, username: username, password: passwordHash},
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

module.exports = postUser;