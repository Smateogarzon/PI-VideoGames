const { Router } = require("express");
const getVideogame = require("../controllers/GetAllVideoGames");
const postVideoGame = require("../controllers/PostVideoGame");
const getGenres = require("../controllers/GetGenres");
const getNameVideoGame = require("../controllers/GetNameVideoGame");
const PostUser = require("../controllers/PostUser");
const postLibrary = require("../controllers/PostLibrary");
const login = require("../controllers/Login");

const router = Router();

router.get("/videogames/:id", getVideogame);
router.get("/genres", getGenres);
router.get("/videogames", getNameVideoGame);
router.get("/login", login);
router.post("/create_videogames", postVideoGame);
router.post("/create_user", PostUser);
router.post("/add_library/:id", postLibrary);

module.exports = router;
