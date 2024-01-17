require('dotenv').config();
const {URL_GETGENRES, API_KEY} = process.env;
const {generes} = require('../db');
const axios = require('axios');

async function getGenres(req, res) {
  try {
    const generesarray = [];
    const count = await generes.count();

    if (count < 19) {
      const {data} = await axios(`${URL_GETGENRES}?key=${API_KEY}`);
      data.results.forEach((genre) => {
        generesarray.push({name: genre.name});
      });
      for (const genreData of generesarray) {
        await generes.findOrCreate({
          where: {name: genreData.name},
        });
      }
    }

    const data = await generes.findAll();
    res.status(200).json(data);
  } catch (error) {
    console.error('Error al obtener los generos:', error.message);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = getGenres;
