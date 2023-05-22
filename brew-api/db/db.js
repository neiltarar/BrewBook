import pkg from "pg";
import dotenv from "dotenv";

dotenv.config(); // load env variables
const { Client } = pkg;

const db = async (sqlQuery, values) => {
	try {
		const dbConnection = new Client({
			user: process.env.DB_USER,
			host: process.env.DB_HOST,
			database: process.env.DB_NAME,
			password: process.env.DB_PASSWORD,
			port: process.env.DB_PORT,
		});
		await dbConnection.connect();
		const res = await dbConnection.query(sqlQuery, values);
		await dbConnection.end();
		return res.rows;
	} catch (error) {
		console.log(error);
	}
};

export default db;
