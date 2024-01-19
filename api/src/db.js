require('dotenv').config();
const {DB_USER, DB_PASSWORD, DB_HOST} = process.env;
const Sequialize = require('sequelize');
const Videogame = require('./models/Videogame');
const Generes = require('./models/Genres');
const Users = require('./models/Users');
const Plataforms = require('./models/Plataforms');
const Library = require('./models/Library');

const sequelize = new Sequialize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
  {logging: console.log('BD_connected...'), native: false},
);

Videogame(sequelize);
Generes(sequelize);
Users(sequelize);
Plataforms(sequelize);
Library(sequelize);

const {videogame, generes, users, plataforms, library} = sequelize.models;

videogame.belongsToMany(generes, {through: 'genres_videogame'});
generes.belongsToMany(videogame, {through: 'genres_videogame'});

users.belongsToMany(library, {through: 'user_library'});
library.belongsToMany(users, {through: 'user_library'});

plataforms.belongsToMany(videogame, {through: 'videogame_plataforms'});
videogame.belongsToMany(plataforms, {through: 'videogame_plataforms'});

users.hasMany(videogame);
videogame.belongsTo(users);

module.exports = {...sequelize.models, conn: sequelize};
