import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../models/userModel.js";
import {
	saveRefreshToken,
	deleteRefreshToken,
	deleteRefreshTokenForUser,
} from "../models/sessionModel.js";
import dotenv from "dotenv";

dotenv.config();

export const signin = async (req, res) => {
	const { email, password } = req.body;
	const user = await findUserByEmail(email);
	const passwordHash = user["password_hash"];
	if (user && (await bcrypt.compare(password, passwordHash))) {
		const accessToken = jwt.sign(
			{ email },
			process.env.ACCESS_TOKEN_SECRET_KEY,
			{ expiresIn: "10m" }
		);
		const refreshToken = jwt.sign(
			{ email },
			process.env.REFRESH_TOKEN_SECRET_KEY,
			{ expiresIn: "48h" }
		);
		await deleteRefreshTokenForUser(user.id);
		const result = await saveRefreshToken(user.id, refreshToken);
		if (result) {
			res.cookie("accessToken", accessToken, { httpOnly: true, secure: false });
			res.cookie("refreshToken", refreshToken, {
				httpOnly: true,
				secure: false,
			});
			res
				.status(200)
				.json({ message: "Successful Login", user: user.first_name });
		} else {
			console.log("Error: Couldn't save the refresh token");
			return res.status(500).json({ message: "Internal Server Error" }); // Add return statement here to prevent further execution
		}
	} else {
		res.status(400).json({ message: "Unauthorised" });
	}
};

export const signout = async (req, res) => {
	const accessToken = req.cookies.accessToken;
	const refreshToken = req.cookies.refreshToken;
	// If there's a refresh token, delete it from the database
	if (accessToken || refreshToken) {
		try {
			await deleteRefreshToken(refreshToken);
		} catch (error) {
			console.error("Failed to delete refresh token:", error);
			return res.sendStatus(500);
		}
	}

	// Clear the access token and refresh token cookies
	res.clearCookie("accessToken");
	res.clearCookie("refreshToken");

	res.status(200).json({ message: "Successfully logged out" });
};
