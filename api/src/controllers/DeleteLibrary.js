const { library } = require("../db");
async function deleteLibrary(req, res) {
  const { id } = req.params;

  library
    .destroy({
      where: {
        id,
      },
    })
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.status(500).send({ Error: err.message });
    });
}

module.exports = deleteLibrary;
