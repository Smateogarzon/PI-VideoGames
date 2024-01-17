const {Router} = require('express');
const getVideogame = require('../controllers/GetAllVideoGames');
const postVideoGame = require('../controllers/PostVideoGame');
const getGenres = require('../controllers/GetGenres');

const router = Router();

router.get('/videogames/:id', getVideogame);
router.post('/create_videogames', postVideoGame);
router.get('/genres', getGenres);

module.exports = router;
