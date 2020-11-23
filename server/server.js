const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);

// Habilitando ruta publica
const publicPath = path.resolve(__dirname, '../public/');
app.use(express.static( publicPath ));

//Configuracion para socket
module.exports.io = socketIO(server);
require('./socket/socket');

//Puerto
const port = process.env.PORT || 3100;

server.listen(port, () => console.log(`corriendo en el puerto ${port}`));