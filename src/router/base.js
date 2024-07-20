const RequestMethod = {
	get: "get",
	post: "post",
	put: "put",
	delete: "delete",
};

const routerBasic = {
	all(tableName = "accounts") {
		return {
			path: `/api/${tableName}/all`,
			method: RequestMethod.get,
			func(request = {}, response = {}, queryData = function () { }) {
				const queryString = `SELECT * FROM ${tableName}`;

				queryData(queryString, (error, rows, fields) => {
					if (error) {
						console.log(error.message);
					} else {
						response.json(rows);
					}
				});
			},
		};
	},
	create(tableName = "accounts") {
		return {
			path: `/api/${tableName}/create`,
			method: RequestMethod.post,
			func(request = {}, response = {}, queryData = function () { }) {
				const data = request.body;
				const keys = Object.keys(data);
				const values = Object.values(data).map((value) => {
					return typeof value === "string" ? `'${value}'` : value;
				});
				const queryString = `INSERT INTO ${tableName}(${keys.join(",")}) VALUES (${values.join(",")})`;

				queryData(queryString, (error, rows, fields) => {
					if (error) {
						console.log(error.message);
					} else {
						response
							.status(200)
							.json({ message: "Create success" });
					}
				});
			},
		};
	},
	show(tableName = "accounts") {
		return {
			path: `/api/${tableName}/:id/show`,
			method: RequestMethod.get,
			func(request = {}, response = {}, queryData = function () { }) {
				const { id } = request.params;
				const queryString = `SELECT * FROM users WHERE id=${id}`;

				queryData(queryString, (error, rows, fields) => {
					if (error) {
						console.log(error.message);
					} else {
						response.json(rows);
					}
				});
			},
		};
	},
	update(tableName = "accounts") {
		return {
			path: `/api/${tableName}/:id/update`,
			method: RequestMethod.put,
			func(request = {}, response = {}, queryData = function () { }) {
				const { id } = request.params;
				const data = request.body;
				const keys = Object.keys(data);
				const values = Object.values(data).map((value) => {
					return typeof value === "string" ? `'${value}'` : value;
				});
				const queryString = `UPDATE ${tableName} SET ${keys
					.map((key, index) => {
						return `${key}=${values[index]}`;
					})
					.join(",")} WHERE id=${id}`;

				queryData(queryString, (error, rows, fields) => {
					if (error) {
						console.log(error.message);
					} else {
						response
							.status(200)
							.json({ message: "Update success" });
					}
				});
			},
		};
	},
	delete(tableName = "accounts") {
		return {
			path: `/api/${tableName}/:id/delete`,
			method: RequestMethod.delete,
			func(request = {}, response = {}, queryData = function () { }) {
				const { id } = request.params;
				const queryString = `DELETE FROM ${tableName} WHERE id=${id}`;

				queryData(queryString, (error, rows, fields) => {
					if (error) {
						console.log(error.message);
					} else {
						response
							.status(200)
							.json({ message: "Delete success" });
					}
				});
			},
		};
	},
};

module.exports = { RequestMethod, routerBasic };
