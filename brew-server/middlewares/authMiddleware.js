import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findRefreshToken } from "../models/sessionModel.js";
import { findUserByEmail } from "../models/userModel.js";

// Load the environment variables
dotenv.config();

export const authenticateToken = async (req, res, next) => {
	const accessToken = req.cookies.accessToken;
	const refreshToken = req.cookies.refreshToken;
	console.log("here1");
	if (accessToken === null) return res.sendStatus(401); // If there's no token, return 401 (Unauthorised)
	console.log("here2");
	jwt.verify(
		accessToken,
		process.env.ACCESS_TOKEN_SECRET_KEY,
		async (err, user) => {
			console.log("here3");
			if (err) {
				console.log("here4");

				if (err.name === "TokenExpiredError") {
					if (!refreshToken) return res.sendStatus(401);

					// Check if refresh token is valid
					const storedRefreshToken = await findRefreshToken(refreshToken);
					if (!storedRefreshToken) return res.sendStatus(403);
					jwt.verify(
						refreshToken,
						process.env.REFRESH_TOKEN_SECRET,
						(err, user) => {
							if (err)
								return res
									.status(403)
									.json({ message: "Session expired, please log in again" }); // If refresh token is not valid, return 403 (Forbidden)

							// Generate and send a new access token
							const newAccessToken = jwt.sign(
								{ email: user.email },
								process.env.ACCESS_TOKEN_SECRET,
								{ expiresIn: "10m" }
							);
							res.cookie("accessToken", newAccessToken, {
								httpOnly: true,
								secure: true,
							});
							req.user = user;
							next(); // Call next() here to continue to the next middleware/route handler
						}
					);
				} else {
					console.log("here5");

					return res.sendStatus(403); // If the token is not valid, return 403 (Forbidden)
				}
			} else {
				console.log("here6");

				req.user = user;
				const fetchedUser = await findUserByEmail(user.email); // Fetch the user information from the database
				res.user = fetchedUser.first_name; // Include the user information in the response
				next(); // If everything's good, forward the request to the next handler
			}
		}
	);
};
