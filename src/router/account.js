const { RequestMethod, routerBasic } = require("./base");
const tableName = "accounts";

module.exports = [
	routerBasic.all(tableName),
	routerBasic.create(tableName),
	routerBasic.show(tableName),
	routerBasic.update(tableName),
	routerBasic.delete(tableName),
	{
		path: "/api/accounts/login",
		method: RequestMethod.post,
		func(request, response, queryData) {
			const { username, password } = request.body;
			const queryString = `SELECT * FROM accounts WHERE username='${username}'`;
			queryData(queryString, (error, rows, fields) => {
				if (error) {
					console.log(error);
				} else {
					if (rows.length === 1) {
						if (rows[0].password === password) {
							response.json({
								success: true,
								message: "Login Success",
								data: rows[0],
							});
						} else {
							response.json({
								success: false,
								message: "Password wrong",
							});
						}
					} else {
						response.json({
							success: false,
							message: "Username invalid",
						});
					}
				}
			});
		},
	},
];
