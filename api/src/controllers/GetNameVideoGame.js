require('dotenv').config();
const {URL_GETNAME, API_KEY} = process.env;
const {videogame} = require('../db');
const {Op} = require('sequelize');
const axios = require('axios');

async function getNameVideoGame(req, res) {
  const {name} = req.query;
  try {
    const count = await videogame.count();
    if (count) {
      try {
        const nameDb = await videogame.findAll({
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
          limit: 15,
        });

        if (nameDb.length === 0) {
          throw new Error(
            'No se encontró el videojuego en la DB buscando en api externa',
          );
        }
        const finalName = nameDb.map((name) => name.name);
        return res.status(200).json(finalName);
      } catch (error) {
        const nameApi = await getNameApi(name);
        return res.status(200).json(nameApi);
      }
    }
    res.status(200).json(await getNameApi(name));
  } catch (error) {
    console.error('Nombre no encontrado:', error.message);
    res.status(500).send(error.message);
  }
}

const getNameApi = async (name) => {
  try {
    const {data} = await axios(`${URL_GETNAME}=${name}&key=${API_KEY}`);
    if (data.count === 0) {
      console.log('hola');
      throw new Error();
    }
    const firstElement = data.results.slice(0, 15).map((name) => {
      return {id: name.id, name: name.name};
    });
    return firstElement;
  } catch (error) {
    throw new Error('No se encontro el videojuego intentelo de nuevo');
  }
};
module.exports = getNameVideoGame;
