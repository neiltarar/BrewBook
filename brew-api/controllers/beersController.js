const beers = [
	{ id: 1, name: "Beer 1", description: "Delicious beer" },
	{ id: 2, name: "Beer 2", description: "Tasty beer" },
	// Add more beers...
];

export const getBeers = async (req, res) => {
	res.status(200).json(beers);
};

export const addBeers = async (req, res) => {
	console.log(req.body);
};
