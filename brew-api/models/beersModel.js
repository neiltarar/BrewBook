import db from "../db/db.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const BeerModels = {
	addBeer: async ({ beerName, notes, location, userId, imageName }) => {
		try {
			const date = new Date();
			const result = await db(
				`INSERT INTO beers (name, producer_website, place_consumed, date_consumed, notes, user_id, images)
				 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
				[beerName, "no website yet", location, date, notes, userId, imageName]
			);
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	getAllBeers: async () => {
		try {
			const result = await db(`
			SELECT * FROM beers;
		`);
			return result;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	editBeerById: async (beerId, values) => {
		const { beerName, notes, location, date_consumed, userId } = values;
		try {
			const result = await db(
				`UPDATE beers SET name = $1, notes = $2, producer_website = $3, place_consumed=$4, date_consumed = $5 WHERE id = $6 AND user_id = $7 RETURNING *`,
				[beerName, notes, "N/A", location, date_consumed, beerId, userId]
			);
			return result.length > 0 ? true : false;
		} catch (error) {
			console.log(error);
			return null;
		}
	},

	deleteBeerById: async (beerId) => {
		try {
			const result = await db(`DELETE FROM beers WHERE id = $1 RETURNING *`, [
				beerId,
			]);
			// If the beer was successfully deleted
			if (result.length > 0) {
				// And if the beer has an image
				if (result[0].images) {
					// Construct the image path
					const imagePath = path.resolve(
						process.cwd(),
						"uploadedImages",
						result[0].images
					);

					// Delete the image
					fs.unlink(imagePath, (err) => {
						if (err) {
							console.error("Error while deleting image: ", err);
						}
					});
				}
				return true;
			} else {
				return false;
			}
		} catch (error) {
			console.log(error);
			return null;
		}
	},
};
