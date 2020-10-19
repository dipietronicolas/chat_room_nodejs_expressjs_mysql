const express = require('express'),
  http = require('http'),
  socketio = require('socket.io'),
  path = require('path'),
  morgan = require('morgan');
  
// Dotenv para guardar keys y no hardcodear datos importantes.
require('dotenv').config()

const app = express();
const server = http.createServer(app);

// Conexion de web sockets
const io = socketio.listen(server);

//settings (utiliza el puerto del sistema operativo en su variable de entorno o 3000 en su defecto)
app.set('port', process.env.PORT || 3000);

// requiero el archivo sockets.js y le paso mi constante io.
require('./sockets')(io);


// path corresponde al modulo 'path' y se encarga de unir
// direcciones para encontrar rapidamente la carpeta public.
app.use(express.static(path.join(__dirname, "public")));
app.use(morgan('dev'));


server.listen(app.get('port'), () => {
  console.log('escuchando el puerto ' + app.get('port'))
})