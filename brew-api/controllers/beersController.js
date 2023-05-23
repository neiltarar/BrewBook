import { addBeer, getAllBeers } from "../models/beersModel.js";

export const getBeers = async (req, res) => {
	const result = await getAllBeers();
	result.forEach((beer) => {
		const date = new Date(beer.date_consumed);
		const options = { day: "numeric", month: "long", year: "numeric" };
		const formattedDate = date.toLocaleDateString(undefined, options);
		beer.date_consumed = formattedDate;
	});
	res.status(200).json(result);
};

export const addBeers = async (req, res) => {
	try {
		const result = await addBeer(req.body);
		res.status(200).json({ message: "beer is succesfully added" });
	} catch (error) {
		res.status(500).json({
			message: "Internal Server Error",
			error: error,
		});
	}
};
