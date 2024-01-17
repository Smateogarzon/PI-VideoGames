const {Router} = require('express');
const getVideogame = require('../controllers/GetAllVideoGames');
const postVideoGame = require('../controllers/PostVideoGame');
const getGenres = require('../controllers/GetGenres');
const getNameVideoGame = require('../controllers/GetNameVideoGame');
const PostUser = require('../controllers/PostUser');

const router = Router();

router.get('/videogames/:id', getVideogame);
router.get('/genres', getGenres);
router.get('/videogames', getNameVideoGame);
router.post('/create_videogames', postVideoGame);
router.post('/create_user', PostUser);

module.exports = router;
