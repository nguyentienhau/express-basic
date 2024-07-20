const express = require("express");
const { serverPort } = require("./constants");
const { routerConfig } = require("./router");
const {
	queryData,
	connectDatabase,
	disconnectDatabase,
	checkConnection,
} = require("./database");
const { allowAccessMiddleware } = require("./middleware");

const app = express();

// setup middleware for app
app.use(allowAccessMiddleware).use(express.json());

// setup router for app
routerConfig(app, queryData, checkConnection);

app.on("close", function () {
	disconnectDatabase();
}).listen(serverPort, function () {
	connectDatabase();
	console.log(`Server is running on http://localhost:${serverPort}`);
});
