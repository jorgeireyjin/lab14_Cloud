// .sequelizerc.cjs
const path = require('path');

module.exports = {
   'config': path.resolve('src/db/config', 'config.cjs'), // O config.js según uses json o js
   'models-path': path.resolve('src/db', 'models'),
   'seeders-path': path.resolve('src/db', 'seeders'),
   'migrations-path': path.resolve('src/db', 'migrations')
};