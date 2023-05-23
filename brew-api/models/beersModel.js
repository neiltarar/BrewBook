import db from "../db/db.js";

export const addBeer = async ({ beerName, notes, location, userId }) => {
	try {
		const date = new Date();
		const result = await db(
			`INSERT INTO beers (name, producer_website, place_consumed, date_consumed, notes, user_id)
			 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
			[beerName, "no website yet", location, date, notes, userId]
		);
		return result;
	} catch (error) {}
};

export const getAllBeers = async () => {
	const result = await db(`
		SELECT * FROM beers;
	`);
	return result;
};
