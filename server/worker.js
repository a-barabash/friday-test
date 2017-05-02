'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.json({ limit: '1mb' }));

app.disable('x-powered-by');
app.disable('server');

const publicDirectory = path.join(__dirname, '../public');

app.use('/', express.static(publicDirectory));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicDirectory, 'index.html'));
});

app.listen(port, () => {
  console.log(`${process.env.workerName} started`);
});
