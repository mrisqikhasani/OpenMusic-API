require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const songs = require('./api/songs');
const AlbumsService = require('./services/postgres/AlbumsServices');
const AlbumsValidator = require('./validator/albums');
const SongsService = require('./services/postgres/SongsServices');
const SongsValidator = require('./validator/songs');

const init = async () => {
  const albumService = new AlbumsService();
  const songsService = new SongsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([{
    plugin: albums,
    options: {
      service: albumService,
      validator: AlbumsValidator,
    },
  }, {
    plugin: songs,
    options: {
      services: songsService,
      validator: SongsValidator,
    },
  }]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
