require('dotenv').config();
const {URL_GETGENRES, API_KEY} = process.env;
const {generes} = require('../db');
const axios = require('axios');

async function getGenres(req, res) {
  try {
    // Crear un array para almacenar los géneros
    const generesArray = [];

    // Contar la cantidad de géneros en la base de datos
    const count = await generes.count();

    // Si hay menos de 19 géneros en la base de datos, obtenerlos de la API externa y guardarlos
    if (count < 19) {
      const {data} = await axios(`${URL_GETGENRES}?key=${API_KEY}`);

      data.results.forEach((genre) => {
        generesArray.push({name: genre.name, Image: genre.image_background});
      });

      // Crear o actualizar los géneros en la base de datos

      for (const genreData of generesArray) {
        await generes.findOrCreate({
          where: {name: genreData.name, image: genreData.Image},
        });
      }
    }

    // Obtener todos los géneros de la base de datos
    const dataFromDB = await generes.findAll();

    res.status(200).json(dataFromDB);
  } catch (error) {
    console.error('Error al obtener los géneros:', error.message);
    res.status(500).send('Error interno del servidor');
  }
}

module.exports = getGenres;
