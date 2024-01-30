require('dotenv').config();
const {URL_GET, API_KEY} = process.env;
const {generes, videogame} = require('../db');
const axios = require('axios');
async function getGenerFilter(req, res) {
  try {
    const {genres, ratings, name} = req.query;

    if (genres) {
      const genresArray = [];
      const pkGenre = await generes.findOne({where: {name: genres}});
      if (pkGenre) {
        const genresDb = await pkGenre.getVideogames();
        genresDb.forEach((videogame) => {
          genresArray.push(videogame.dataValues);
        });
      }
      for (let i = 1; i <= 5; i++) {
        const url = `${URL_GET}?key=${API_KEY}&genres=${
          genres === 'RPG'
            ? 'role-playing-games-rpg'
            : genres === 'Massively Multiplayer'
            ? 'massively-multiplayer'
            : genres === 'Board Games'
            ? 'board-games'
            : genres.toLowerCase()
        }&page=${i}`;
        const {data} = await axios(url);

        const games = data.results.map((game) => {
          return {
            id: game.id,
            name: game.name,
            description: game.description,
            platforms: game.platforms.map((platform) => platform.platform.name),
            background_image: game.background_image,
            background_image_additional: game.background_image_additional,
            released: game.released,
            rating: game.rating,
            genres: game.genres.map((genre) => genre.name),
          };
        });

        genresArray.push(...games);
      }

      return res.status(200).json(genresArray);
    }
    if (ratings) {
      if (ratings === 'Top Rated') {
        const ratingArray = [];
        const pkRatings = await videogame.findAll({
          order: [['rating', 'DESC']],
        });
        if (pkRatings) {
          pkRatings.forEach((videogame) => {
            ratingArray.push(videogame.dataValues);
          });
        }
        for (let i = 1; i <= 10; i += 2) {
          const url = `${URL_GET}?key=${API_KEY}&ordering=-rating&page=${i}`;
          const {data} = await axios(url);
          const games = data.results.map((game) => {
            return {
              id: game.id,
              name: game.name,
              description: game.description,
              platforms: game.platforms.map(
                (platform) => platform.platform.name,
              ),
              background_image: game.background_image,
              background_image_additional: game.background_image_additional,
              released: game.released,
              rating: game.rating,
              genres: game.genres.map((genre) => genre.name),
            };
          });
          ratingArray.push(...games);
        }
        return res.status(200).json(ratingArray);
      }
      if (ratings === 'Lowest Rated') {
        const ratingArray = [];
        const pkRatings = await videogame.findAll({
          order: [['rating', 'ASC']],
        });
        if (pkRatings) {
          pkRatings.forEach((videogame) => {
            ratingArray.push(videogame.dataValues);
          });
        }
        for (let i = 1; i <= 5; i++) {
          const url = `${URL_GET}?key=${API_KEY}&ordering=rating&page=${i}`;
          const {data} = await axios(url);
          const games = data.results.map((game) => {
            return {
              id: game.id,
              name: game.name,
              description: game.description,
              platforms: game.platforms.map(
                (platform) => platform.platform.name,
              ),
              background_image: game.background_image,
              background_image_additional: game.background_image_additional,
              released: game.released,
              rating: game.rating,
              genres: game.genres.map((genre) => genre.name),
            };
          });
          ratingArray.push(...games);
        }
        return res.status(200).json(ratingArray);
      }
    }
    if (name) {
      if (name === 'name') {
        const nameArray = [];
        const pkName = await videogame.findAll({
          order: [['name', 'ASC']],
        });
        if (pkName) {
          pkName.forEach((videogame) => {
            nameArray.push(videogame.dataValues);
          });
        }
        for (let i = 624; i <= 628; i++) {
          const url = `${URL_GET}?key=${API_KEY}&ordering=${name}&page=${i}`;
          const {data} = await axios(url);
          const games = data.results.map((game) => {
            return {
              id: game.id,
              name: game.name,
              description: game.description,
              platforms: game.platforms.map(
                (platform) => platform.platform.name,
              ),
              background_image: game.background_image,
              background_image_additional: game.background_image_additional,
              released: game.released,
              rating: game.rating,
              genres: game.genres.map((genre) => genre.name),
            };
          });
          nameArray.push(...games);
        }
        return res.status(200).json(nameArray);
      }
      if (name === '-name') {
        const nameArray = [];
        const pkName = await videogame.findAll({
          order: [['name', 'DESC']],
        });
        if (pkName) {
          pkName.forEach((videogame) => {
            nameArray.push(videogame.dataValues);
          });
        }
        for (let i = 520; i <= 524; i++) {
          const url = `${URL_GET}?key=${API_KEY}&ordering=${name}&page=${i}`;
          const {data} = await axios(url);
          const games = data.results.map((game) => {
            return {
              id: game.id,
              name: game.name,
              description: game.description,
              platforms: game.platforms.map(
                (platform) => platform.platform.name,
              ),
              background_image: game.background_image,
              background_image_additional: game.background_image_additional,
              released: game.released,
              rating: game.rating,
              genres: game.genres.map((genre) => genre.name),
            };
          });
          nameArray.push(...games);
        }
        return res.status(200).json(nameArray);
      }
    }
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

module.exports = getGenerFilter;
