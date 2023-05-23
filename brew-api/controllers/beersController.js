import { addBeer } from "../models/beersModel.js";

const beers = [
	{ id: 1, name: "Beer 1", description: "Delicious beer" },
	{ id: 2, name: "Beer 2", description: "Tasty beer" },
	// Add more beers...
];

export const getBeers = async (req, res) => {
	res.status(200).json(beers);
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
