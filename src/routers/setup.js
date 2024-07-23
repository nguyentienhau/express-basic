const routerLib = require("../libs/router");
const customRouters = require("./custom");

module.exports = function (app, database, tableNames = ["account"]) {
	const routers = tableNames.reduce(function (accumulator, tableName) {
		const basicRouters = routerLib(tableName, database.table(tableName), "api");

		return accumulator.concat([
			basicRouters.create(),
			basicRouters.all(),
			basicRouters.read(),
			basicRouters.update(),
			basicRouters.delete(),
		]);
	}, customRouters);

	routers.forEach(function (router) {
		app[router.method.toLowerCase()](router.path, function (request = {}, response = {}) {
			if (database.connection.check()) {
				router.handle(request, response);
			} else {
				response.status(400).json({ ok: false, message: "Connect database failure" });
			}
		});
	});
};
