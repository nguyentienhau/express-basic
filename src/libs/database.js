const mysql = require("mysql");

module.exports = function (databaseConfig = { host: "localhost", port: 3306, user: "root", password: "", database: "test" }) {
	const connection = mysql.createConnection(databaseConfig);
	const connectionStatusOptions = {
		connected: "authenticated",
		disconnected: "disconnect"
	};

	return {
		connection: {
			start() {
				connection && connection.connect(function (error) {
					if (error) {
						console.log(error);
					}
				});
			},
			end() {
				connection && connection.end(function (error) {
					if (error) {
						console.log(error);
					}
				});
			},
			check() {
				return connection && connection.state === connectionStatusOptions.connected;
			},
		},
		table(tableName) {
			let queryString = "";

			const processObjectValue = function (value) {
				if (typeof value === "string") {
					return `'${value}'`;
				} else {
					return value;
				}
			};

			const processConditionValue = function (value) {
				if (typeof value === "string") {
					if (value.startsWith("%") || value.endsWith("%")) {
						return ` LIKE '${value}'`;
					} else {
						return `='${value}'`;
					}
				} else {
					return `=${value}`;
				}
			};

			return {
				insert(object = {}) {
					const fieldsString = Object.keys(object).join(",");
					const valuesString = Object.values(object).map(processObjectValue).join(",");
					queryString = `INSERT INTO ${tableName}(${fieldsString}) VALUES (${valuesString})`;

					return this;
				},
				select(...fields) {
					let fieldsString = "";

					if (fields.length === 0 || fields.some((field) => (!field))) {
						fieldsString = "*";
					} else if (fields.length === 1 && Array.isArray(fields[0])) {
						fieldsString = fields[0].join(",");
					} else {
						fieldsString = fields.join(",");
					}

					queryString = `SELECT ${fieldsString} FROM ${tableName}`;

					return this;
				},
				update(object = {}) {
					const fieldDataString = Object.keys(object).map(function (field) {
						return field + "=" + processObjectValue(object[field]);
					}).join(",");
					queryString = `UPDATE ${tableName} SET ${fieldDataString}`;

					return this;
				},
				delete() {
					queryString = `DELETE FROM ${tableName}`;

					return this;
				},
				where(conditions = {}) {
					const fields = Object.keys(conditions);
					queryString += fields.length > 0 ? " WHERE " + fields.map(function (field) {
						return field + processConditionValue(conditions[field]);
					}).join(" AND ") : "";

					return this;
				},
				query(callback) {
					queryString && connection.query(queryString, callback);
				},
				create() {

				},
				drop() {

				},
				alter() {

				}
			};
		},
	};
};
