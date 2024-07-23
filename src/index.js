const express = require("express");
const databaseLib = require("./libs/database");
const allowAccessMiddleware = require("./middlewares/allow-access");
const setupRouters = require("./routers/setup");
const { serverConfig, databaseConfig } = require("./constants");

const app = express();
const expressDatabase = databaseLib(databaseConfig);
const tableNames = ["account"];

// setup middleware for app
app.use(allowAccessMiddleware).use(express.json());

// setup router for app
setupRouters(app, expressDatabase, tableNames);

app.on("close", function () {
	expressDatabase.connection.end();
}).listen(serverConfig.port, function () {
	expressDatabase.connection.start();
	console.log(`Server is running on http://${serverConfig.host}:${serverConfig.port}`);
});
