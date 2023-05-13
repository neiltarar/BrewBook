import db from "../db/db.js";

export const createNewUser = async (
	firstName,
	lastName,
	email,
	passwordHash
) => {
	try {
		const result = await db(
			"INSERT INTO users (first_name, last_name, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING email",
			[firstName, lastName, email, passwordHash]
		);
		return result;
	} catch (error) {
		if (error.code === "23505" && error.constraint === "users_email_key") {
			console.log("Email already exists."); // Custom error handling
		} else {
			console.error("An error occurred during user creation:", error);
		}
	}
};

export const findUserByEmail = async (email) => {
	const result = await db("SELECT * FROM users WHERE email=$1", [email]);
	return result.length > 0 ? result[0] : null;
};
