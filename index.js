'use strict';

require('dotenv').config();
const cluster = require('cluster');

process.on('uncaughtException', (err) => {
  console.log(err);
  process.exit(1);
});

require(`./server/${(cluster.isMaster) ? 'master' : 'worker'}`);
