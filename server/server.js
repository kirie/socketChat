const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router');
const socketLogic = require('./socket_logic');

const port = process.env.PORT || 3000;
const app = express();

// app setup middleware
app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
router(app);

// server setup
const server = http.createServer(app);
const io = require('socket.io').listen(server);

io.on('connection', socketLogic);

server.listen(port, () => {
  console.log('Server running on port ', port);
});
