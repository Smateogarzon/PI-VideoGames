const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const app = require('../../src/app');

describe('GET /videogames/:id', () => {
  it('debería devolver un videojuego de la base de datos si existe', async () => {
    const existingGameId = 1;
    const response = await request(app).get(`/videogames/${existingGameId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('name');
  });

  it('deberia devolver un videojuego de la API externa si no existe en la base de datos', async () => {
    const nonExistingGameId = 9999;
    const response = await request(app).get(`/videogames/${nonExistingGameId}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property('name');
  });

  it('debería devolver un error si el id no existe', async () => {
    const nonExistingGameId = 99999999;
    const response = await request(app).get(`/videogames/${nonExistingGameId}`);
    expect(response.status).to.equal(500);
  });
});

describe('GET /genres', () => {
  it('debería devolver todos los geêneros de la base de datos', async () => {
    const response = await request(app).get('/genres');
    expect(response.status).to.equal(200);
    expect(response.body.length).to.be.above(18);
    expect(response.body[0]).to.have.property('name');
  });
});

describe('GET /nameVideogame', () => {
  it('deberia obtener nombres de video juegos de la base de datos', async () => {
    // agregar este id 3946
    const response = await request(app).get(
      '/videogames/?name=Metal Gear Solid: The Legacy Collection',
    );

    expect(response.status).to.equal(200);
    expect(response.body[0]).to.have.property('name');
  });
});
