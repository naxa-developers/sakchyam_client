const express = require('express');
const path = require('path');
const http = require('http');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || '8018';

app.use('/', express.static(path.join(__dirname, '..', 'dist')));
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/js', express.static(path.join(__dirname, '../js')));
app.use('/css', express.static(path.join(__dirname, '../css')));
app.use('/img', express.static(path.join(__dirname, '../img')));
app.use('/', routes);
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () =>
  console.log(`Server Running on port ${port}`),
);
