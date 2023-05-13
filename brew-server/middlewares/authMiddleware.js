import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { findRefreshToken } from "../models/sessionModel";

// Load the environment variables
dotenv.config();

export const authenticateToken = (req, res, next) => {
	const accessToken = req.cookies.accessToken;
	const refreshToken = req.cookies.refreshToken;

	if (accessToken === null) return res.sendStatus(401); // If there's no token, return 401 (Unauthorised)

	jwt.verify(
		accessToken,
		process.env.ACCESS_TOKEN_SECRET_KEY,
		async (err, user) => {
			if (err) {
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
						}
					);
				} else {
					return res.sendStatus(403); // If the token is not valid, return 403 (Forbidden)
				}
			} else {
				req.user = user;
				next(); // If everything's good, forward the request to the next handler
			}
		}
	);
};
