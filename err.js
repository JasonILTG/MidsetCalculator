let errorHandler = function(err, request, response, next) {
	console.log(err);

	if (err === 'Invalid session') {
		response.status(403);
	} else {
		response.status(500);
	}

	response.end();
}

exports.errorHandler = errorHandler;