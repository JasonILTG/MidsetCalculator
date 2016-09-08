import express from 'express';
const app = express();

app.use((request, response, next) => {
	console.log(Date.now() + ": Request received.");
	next();
});

app.use(express.static('./public'));

app.get(/^\/(?!api)/, (request, response, next) => {
	response.sendFile(__dirname + '/index.html');
});

app.use((request, response) => {
	response.end();
});

app.use((err, request, response, next) => {
	console.log(err);

	if (err === 'Invalid session') {
		response.status(403);
	} else {
		response.status(500);
	}

	response.end();
});

let serverPort = 4242;
app.listen(serverPort, function () {
	console.log("Listening on port " + serverPort + "!");
});