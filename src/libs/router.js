module.exports = function (tableName = "account", basicQueries = {}, prefix = "api") {
	return {
		create() {
			return {
				path: `/${prefix}/${tableName}`,
				method: "post",
				handle(request = {}, response = {}) {
					const { object = {} } = request.body;

					basicQueries.insert(object).query(function (error, rows, fields) {
						if (error) {
							response.status(error.code).json({ ok: false, message: error.message });
						} else {
							response.status(200).json({ ok: true, data: rows, message: "Create success" });
						}
					});
				},
			};
		},
		all() {
			return {
				path: `/${prefix}/${tableName}/all`,
				method: "get",
				handle(request = {}, response = {}) {
					const { fields = [], conditions = {} } = request.body;

					basicQueries.select(...fields).where(conditions).query(function (error, rows, fields) {
						if (error) {
							response.status(error.code).json({ ok: false, message: error.message });
						} else {
							response.status(200).json({ ok: true, data: rows, message: "All success" });
						}
					});
				},
			};
		},
		read() {
			return {
				path: `/${prefix}/${tableName}/:id`,
				method: "get",
				handle(request = {}, response = {}) {
					const { id = 0 } = request.params;
					const { fields = [], conditions = {} } = request.body;

					basicQueries.select(...fields).where({ ...conditions, id }).query(function (error, rows, fields) {
						if (error) {
							response.status(error.code).json({ ok: false, message: error.message });
						} else {
							response.status(200).json({ ok: true, data: rows, message: "Read success" });
						}
					});
				},
			};
		},
		update() {
			return {
				path: `/${prefix}/${tableName}/:id`,
				method: "put",
				handle(request = {}, response = {}) {
					const { id = 0 } = request.params;
					const { object = {}, conditions = {} } = request.body;

					basicQueries.update(object).where({ ...conditions, id }).query(function (error, rows, fields) {
						if (error) {
							response.status(error.code).json({ ok: false, message: error.message });
						} else {
							response.status(200).json({ ok: true, data: rows, message: "Update success" });
						}
					});
				},
			};
		},
		delete() {
			return {
				path: `/${prefix}/${tableName}/:id`,
				method: "delete",
				handle(request = {}, response = {}) {
					const { id = 0 } = request.params;
					const { conditions = {} } = request.body;

					basicQueries.delete().where({ ...conditions, id }).query(function (error, rows, fields) {
						if (error) {
							response.status(error.code).json({ ok: false, message: error.message });
						} else {
							response.status(200).json({ ok: true, data: rows, message: "Delete success" });
						}
					});
				},
			};
		},
	};
};
