const SongsHandler = require('./songsHandler');
const routes = require('./songsRoutes');

module.exports = {
  name: 'musics',
  version: '1.0.0',
  register: async (server, { services, validator }) => {
    const songsHandler = new SongsHandler(services, validator);
    server.route(routes(songsHandler));
  },
};
