// Home.js
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export const Home = () => {
	// @ts-ignore
	const { currentUser } = useAuth();
	console.log(currentUser);
	if (currentUser) {
		return <h1>Welcome, {currentUser.name}!</h1>; // Change `currentUser.name` to the correct property that holds the user's name
	} else {
		return <h1>Please sign in.</h1>;
	}
};
