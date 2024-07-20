function encryptPassword(password = "") {
	return password;
}

module.exports = [
	{
		path: "/api/account/login",
		method: "post",
		handle(request = {}, response = {}, table) {
			const { fields, conditions } = request.body;
			conditions.password = encryptPassword(conditions.password);

			table("account").select(...fields).where(conditions).query(function (error, rows, fields) {
				if (error) {
					response.status(error.code).json({ ok: false, message: error.message });
				} else {
					if (rows.length === 1) {
						response.status(200).json({ ok: true, data: rows[0], message: "Login Success" });
					} else {
						response.status(200).json({ ok: false, message: "Username or password wrong" });
					}
				}
			});
		},
	}
];
