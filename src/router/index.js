const accountRouter = require("./account");
const adminRouter = require("./admin");
const cartRouter = require("./cart");
const categoryRouter = require("./category");
const collectionRouter = require("./collection");
const customerRouter = require("./customer");
const invoiceRouter = require("./invoice");
const orderRouter = require("./order");
const productRouter = require("./product");

const routers = [
	...accountRouter,
	...adminRouter,
	...cartRouter,
	...categoryRouter,
	...collectionRouter,
	...customerRouter,
	...invoiceRouter,
	...orderRouter,
	...productRouter,
];

function routerConfig(app, queryData, checkConnection) {
	routers.forEach((router) => {
		app[router.method](router.path, (request, response) => {
			if (checkConnection()) {
				router.func(request, response, queryData);
			} else {
				response.status(400).json({
					message: "Connect database failure",
				});
			}
		});
	});
}

module.exports = {
	routerConfig,
};
