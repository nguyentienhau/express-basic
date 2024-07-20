const express = require("express");
const database = require("./database");
const setupAppRouters = require("./router");
const customRouters = require("./router/custom");
const { serverConfig, databaseConfig } = require("./constants");
const { allowAccessMiddleware } = require("./middleware");

const app = express();
const expressDatabase = database(databaseConfig);
const tableNames = ["account"];

// setup middleware for app
app.use(allowAccessMiddleware).use(express.json());

// setup router for app
setupAppRouters(app, expressDatabase, tableNames, customRouters);

app.on("close", function () {
	expressDatabase.connection.end();
}).listen(serverConfig.port, function () {
	expressDatabase.connection.start();
	console.log(`Server is running on http://${serverConfig.host}:${serverConfig.port}`);
});
