import bodyParser from 'body-parser'
import express from 'express'
import cors from 'cors'
import favicon from 'serve-favicon'
import fs from 'fs'
import mongoose from 'mongoose'
import path from 'path'
import compression from 'compression'
import logUtil from 'keys-translations-manager-core/lib/logUtil'
import config from './../../ktm.config'
import { LANGUAGES } from './../../constants/Languages'
import TranslationController from './controllers/TranslationController'
import HistoryController from './controllers/HistoryController'
import KeyController from './controllers/KeyController'
import CountController from './controllers/CountController'
import DownloadController from './controllers/DownloadController'
import ImportController from './controllers/ImportController'
import VisController from './controllers/VisController'

const log = logUtil.log,
	port = process.env.PORT || 3000,
	app = express(),
	server = require('http').Server(app),
	io = require('socket.io')(server);

mongoose.Promise = global.Promise; //mpromise (mongoose's default promise library) is deprecated
mongoose.connect(config.database, {
	useNewUrlParser: true,
	socketTimeoutMS: 90000,
	connectTimeoutMS: 90000
}).then(
	() => {
		// console.log('Connect to database successfully.');
	},
	err => {
		log('error', 'Failed to connect database');
		log('error', err);
		process.exit(1);
	}
);

server.listen(port, err => {
	if (err) {
		log('error', err);
		process.exit(1);
	}

	if (process.env.NODE_ENV === 'development') {
		log('info', `Dev-server (at http://${config.server.hostname}:${config.server.port}) is starting, please wait ...`);
	} else {
		log('info', `The server (at http://${config.server.hostname}:${config.server.port}) has started.`);
	}
});

if (config.enableNotifications) {
	io.on('connection', function (socket) {

		socket.on('keyUpdated', (item) => {
			socket.broadcast.emit('keyUpdated', item)
		})

		socket.on('ktm', function (data) {
			if (data && data.action === "datachanged") {
				// sending to all clients except sender
				socket.broadcast.emit('ktm', {action: "datachanged"});
			}
		});
	});
}

const frontendFolder = path.resolve(__dirname, '../../frontend/dist')

// Check if the `frontendFolder` is missing
const frontendFolderIsMissing = !fs.existsSync(frontendFolder)

// If the `frontendFolder` is missing...
if (frontendFolderIsMissing) {
  // If the `frontendFolder` is missing in production...
  if (process.env.NODE_ENV === 'production') {
    // Display an error letting the user know what they should do.
    console.error(
      'Directory `frontend/dist` does not exist. You must run `yarn build` before starting the app in production.'
    )
    // Abort starting up the app.
    process.exit(1)
  }
  // Or, if the `frontendFolder` is missing another environment...
  else {
    // Create the `frontendFolder` to avoid errors in development.
    fs.mkdirSync(frontendFolder)
  }
}

// app.set('view engine', 'ejs');
app.use(cors())
app.use(compression());
app.use(favicon(path.join(__dirname, '../../frontend/public', '/', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/translation", TranslationController);
app.use("/api/history", HistoryController);
app.use("/api/key", KeyController);
app.use("/api/count", CountController);
app.use("/api/download", DownloadController);
app.use("/api/import", ImportController);
app.use("/api/vis", VisController);

app.use(express.static(frontendFolder));
//Store all HTML files in view folder.
app.use('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../../frontend/dist', '/', 'index.html'))
})
