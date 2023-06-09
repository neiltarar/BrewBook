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
		console.log("here");
		try {
			const requestBodyUserId = req.body.userId;
			const userIdExtractedFromCookies = req.user.userId;

			console.log(
				Number(requestBodyUserId) === Number(userIdExtractedFromCookies)
			);
			// check if the userId has been manipulated on the browser
			// if there is a malicious userId manipulation
			if (Number(requestBodyUserId) === Number(userIdExtractedFromCookies)) {
				console.log("body: ", req.body);
				const image = req.file;
				console.log("image first: ", image);
				if (image === undefined) {
					console.log("in if statement");
					req.file = "2023-05-30-2102a75a-bf4a-4752-84e7-ec41a591af41.png";
				}
				console.log("image second: ", image);
				const result = await BeerModels.addBeer({
					...req.body,
					imageName: req.file.filename,
				});
				res.status(200).json({ message: "beer is succesfully added" });
			} else {
				console.log("user id has been manipulated while making the request");
				res.status(403).json({ message: "Unauthorized request" });
			}
		} catch (error) {
			res.status(500).json({
				message: "Internal Server Error",
				error: error,
			});
		}
	},

	editBeer: async (req, res) => {
		const requestBodyUserId = req.body.userId;
		const userIdExtractedFromCookies = req.user.userId;
		const editedBeerId = req.params.id;
		const values = req.body;
		try {
			// check if the userId has been manipulated on the browser
			// if there is a malicious userId manipulation
			if (requestBodyUserId === userIdExtractedFromCookies) {
				const result = await BeerModels.editBeerById(editedBeerId, values);
				if (!result) {
					res
						.status(404)
						.json({ message: `No beer found with id ${editedBeerId}` });
					return;
				} else {
					res.status(200).json({
						message: `Beer with id ${editedBeerId} has been successfully edited`,
					});
				}
			} else {
				console.log("user id has been manipulated while making the request");
				res.status(403).json({ message: "Unauthorized request" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: `Error editing beer with id ${editedBeerId}: ${error.message}`,
			});
		}
	},

	deleteBeer: async (req, res) => {
		try {
			console.log(req.params);
			console.log(req.body);
			console.log(req.user);
			let userIdExtractedFromCookies;
			const requestBodyUserId = req.body.userId;
			req.user
				? (userIdExtractedFromCookies = req.user.userId)
				: (userIdExtractedFromCookies = undefined);
			const deleteReqBeerId = req.params.id;
			// check if the userId has been manipulated on the browser
			// if there is a malicious userId manipulation
			if (requestBodyUserId === userIdExtractedFromCookies) {
				const result = await BeerModels.deleteBeerById(deleteReqBeerId);
				if (!result) {
					res
						.status(404)
						.json({ message: `No beer found with id ${deleteReqBeerId}` });
					return;
				} else {
					res.status(200).json({
						message: `Beer with id ${deleteReqBeerId} has been successfully deleted`,
					});
				}
			} else {
				console.log("user id has been manipulated while making the request");
				res.status(403).json({ message: "Unauthorized request" });
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({
				message: `Error deleting beer with id ${deleteReqBeerId}: ${error.message}`,
			});
		}
	},
};
