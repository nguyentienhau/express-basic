function allowAccessMiddleware(request, response, next) {
	const allowDomains = "*";
	const allowMethods = "GET, POST, PUT, PATCH, DELETE";
	const allowHeaders = "X-Requested-With, Content-Type";

	response.setHeader("Access-Control-Allow-Origin", allowDomains);
	response.setHeader("Access-Control-Allow-Methods", allowMethods);
	response.setHeader("Access-Control-Allow-Headers", allowHeaders);
	response.setHeader("Access-Control-Allow-Credentials", true);

	next();
}

module.exports = {
	allowAccessMiddleware,
};
