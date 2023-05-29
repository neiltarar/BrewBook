import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
	user: process.env.DB_USER,
	host: "db",
	database: process.env.DB_NAME,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

const db = async (sqlQuery, values) => {
	const client = await pool.connect();
	try {
		const res = await client.query(sqlQuery, values);
		return res.rows;
	} catch (error) {
		console.log(error);
	} finally {
		client.release();
	}
};

export default db;
