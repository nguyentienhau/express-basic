module.exports = function (request, response, next) {
	const allowDomains = ["*"];
	const allowMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];
	const allowHeaders = ["X-Requested-With", "Content-Type"];
	const allowCredentials = true;

	response.setHeader("Access-Control-Allow-Origin", allowDomains.join(", "));
	response.setHeader("Access-Control-Allow-Methods", allowMethods.join(", "));
	response.setHeader("Access-Control-Allow-Headers", allowHeaders.join(", "));
	response.setHeader("Access-Control-Allow-Credentials", allowCredentials);

	next();
};
