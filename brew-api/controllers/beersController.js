import { BeerModels } from "../models/beersModel.js";

export const BeersControllers = {
	getBeers: async (req, res) => {
		const result = await BeerModels.getAllBeers();
		result.forEach((beer) => {
			const date = new Date(beer.date_consumed);
			const options = { day: "numeric", month: "long", year: "numeric" };
			const formattedDate = date.toLocaleDateString(undefined, options);
			beer.date_consumed = formattedDate;
		});
		res.status(200).json(result);
	},

	addBeers: async (req, res) => {
		try {
			const result = await BeerModels.addBeer(req.body);
			res.status(200).json({ message: "beer is succesfully added" });
		} catch (error) {
			res.status(500).json({
				message: "Internal Server Error",
				error: error,
			});
		}
	},

	editBeer: async (req, res) => {
		const editedBeerId = req.params.id;
		const values = req.body;
		try {
			const beer = await BeerModels.editBeerById(editedBeerId, values);
			if (!beer) {
				res
					.status(404)
					.json({ message: `No beer found with id ${editedBeerId}` });
				return;
			} else {
				res
					.status(200)
					.json({
						message: `Beer with id ${editedBeerId} has been successfully edited`,
					});
			}
			// Edit the beer...
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: `Error editing beer with id ${editedBeerId}: ${error.message}`,
			});
		}
	},
};
