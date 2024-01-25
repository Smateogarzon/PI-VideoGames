const {Router} = require('express');
const getVideogame = require('../controllers/GetAllVideoGames');
const postVideoGame = require('../controllers/PostVideoGame');
const getGenres = require('../controllers/GetGenres');
const getNameVideoGame = require('../controllers/GetNameVideoGame');
const PostUser = require('../controllers/PostUser');
const postLibrary = require('../controllers/PostLibrary');
const login = require('../controllers/Login');
const logout = require('../controllers/Logout');
const getUserVideoGames = require('../controllers/GetVideoGameCreated');
const getLibrary = require('../controllers/GetVideoGamesLibrary');
const getGenerFilter = require('../controllers/GetGenerFilter');

const router = Router();

router.get('/library', getLibrary);
router.get('/videogames_user', getUserVideoGames);
router.get('/videogames/:idn', getVideogame);
router.get('/genres', getGenres);
router.get('/filter/', getGenerFilter);
router.get('/videogames', getNameVideoGame);
router.post('/login', login);
router.post('/create_videogames', postVideoGame);
router.post('/create_user', PostUser);
router.post('/add_library/:id', postLibrary);
router.post('/logout', logout);

module.exports = router;
