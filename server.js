import express from 'express';
const app = express();

import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import { logger, sendIndex, end } from './serverUtil.js';
import { errorHandler } from './err.js';

app.use(bodyParser.json());

app.use(cookieParser());

app.use(logger);

app.use(express.static('./public'));

app.get(/^\/(?!api)/, sendIndex);

app.use(end);

app.use(errorHandler);

let serverPort = 4242;
app.listen(serverPort, function () {
	console.log("Listening on port " + serverPort + "!");
});