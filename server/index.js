/**
 * Dependencies for the server
 */
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import cors from 'cors';
import session from 'express-session';
import expressValidator from 'express-validator';

import config from './config/config';
import Loader from './entities/loader';

let app = express();
let db;

const port = Number(process.env.PORT || 3100);

app.use(cors());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
	secret: config.session.SESSION_SECRET,
	resave: true,
	saveUninitialized: true,
	key: config.session.COOKIE_KEY_NAME,
}))
app.use(expressValidator({
	customValidators: {
		isArray: function(value) {
			return Array.isArray(value);
		}
	}
}));

//Conexao com o banco de dados MongoDb
mongoose.connect(config.mongoose.db);
db = mongoose.connect;

//use express load
Loader.loadData(app);

app.listen(port, () => console.log('running on localhost:3000'));