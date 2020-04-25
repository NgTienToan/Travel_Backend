const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');

const userController = require('./controllers/user');
const roomController = require('./controllers/room');
const auth = require('./middlewares/authentication');
// const { createProxyMiddleware } = require('http-proxy-middleware');
const databaseConnection = require('./configs/dbConnect').databaseConnection;

const corsOptions = {
    exposedHeaders: 'x-auth-token'
  };
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger());

databaseConnection();

app.post('/login', userController.logIn)
app.post('/signup', userController.signUp)
app.post('/update-password',auth, userController.updatePassword);
app.get('/me',cors(), auth, userController.getme);

app.post('/createRoom', roomController.createRoom);
app.get('/rooms/:roomID', roomController.getRoomById);
app.post('/bookRoom', auth, roomController.bookRoom);
app.get('/rooms', roomController.getAllRoomEmpty);

const port = process.env.PORT || 8888;
app.listen(port, () => console.log(`Listening on port ${port}...`));