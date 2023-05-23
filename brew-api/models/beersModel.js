import db from "../db/db.js";

export const addBeer = async ({ beerName, notes, location, userId }) => {
	try {
		const date = new Date();
		console.log(beerName, notes, location, userId);
		const result = await db(
			`INSERT INTO beers (name, producer_website, place_consumed, date_consumed, notes, user_id)
			 VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
			[beerName, "no website yet", location, date, notes, userId]
		);
		return result;
	} catch (error) {}
};
