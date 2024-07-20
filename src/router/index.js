const basicRouter = require("./basic");
const customRouters = require("./custom");

module.exports = function (app, database, tableNames = ["account"], initRouters = customRouters) {
	const routers = tableNames.reduce(function (accumulator, tableName) {
		const basicRouters = basicRouter(tableName, "api");

		return accumulator.concat([
			basicRouters.create(),
			basicRouters.all(),
			basicRouters.read(),
			basicRouters.update(),
			basicRouters.delete(),
		]);
	}, initRouters);

	routers.forEach(function(router) {
		app[router.method.toLowerCase()](router.path, function (request = {}, response = {}) {
			if (database.connection.check()) {
				router.handle(request, response, database.table);
			} else {
				response.status(400).json({ ok: false, message: "Connect database failure" });
			}
		});
	});
};
