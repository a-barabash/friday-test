'use strict';

const cluster = require('cluster');
const os = require('os');

const version = require('../package.json').version;
const cpuCount = os.cpus().length;
const freeMem = Math.floor(os.freemem() / 1024 / 1024);

const workersCount = process.env.WORKERS || cpuCount;
const workerNames = [];

console.log(`App version: ${version}, workers count: ${workersCount}`);
console.log(`CPU count: ${cpuCount}, free RAM: ${freeMem} Mb`);

process.title = 'Master';

const createWorker = (workerName) => {
  const worker = cluster.fork({ workerName });
  workerNames[worker.process.pid] = workerName;
};

for (let i = 1; i <= workersCount; i += 1) {
  createWorker(`Worker ${i}`);
}

console.log('Cluster started');

cluster.on('online', (worker) => {
  const workerName = workerNames[`${worker.process.pid}`];
  console.log(`${workerName} is online`);
});

cluster.on('exit', (worker) => {
  const workerName = workerNames[`${worker.process.pid}`];
  console.log(`${workerName} died. Restart...`);

  delete workerNames[worker.process.pid];
  createWorker(workerName);
});
