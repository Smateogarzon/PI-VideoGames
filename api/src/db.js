require('dotenv').config();
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;
const Sequialize = require('sequelize');
const Videogame = require('./models/Videogame');
const Generes = require('./models/Genres');
const Users = require('./models/Users');
const Plataforms = require('./models/Plataforms');

const sequelize = new Sequialize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
  {logging: console.log('BD_connected...'), native: false},
);

Videogame(sequelize);
Generes(sequelize);
Users(sequelize);
Plataforms(sequelize);

const {videogame, generes, users, plataforms} = sequelize.models;

videogame.belongsToMany(generes, {through: 'genres_videogame'});
generes.belongsToMany(videogame, {through: 'genres_videogame'});

users.belongsToMany(videogame, {through: 'user_library'});
videogame.belongsToMany(users, {through: 'user_library'});

plataforms.belongsToMany(videogame, {through: 'videogame_plataforms'});
videogame.belongsToMany(plataforms, {through: 'videogame_plataforms'});

module.exports = {...sequelize.models, conn: sequelize};
