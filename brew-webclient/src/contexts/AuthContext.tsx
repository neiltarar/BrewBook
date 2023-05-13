import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context that will hold the authentication state and methods
// @ts-ignore
const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

// @ts-ignore
export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// @ts-ignore
	const signup = async (email, password) => {
		// signup function
		// Here, you might call an API to sign up the user
		// Once signed up, you could set the currentUser state
	};

	// @ts-ignore
	const signin = async (values) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/sessions/signin`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify(values),
				}
			);
			if (response.ok) {
				// If the login was successful, you could set the currentUser state here
				const data = await response.json();
				console.log(data.user);
				setCurrentUser(data.user); // Adjust this line based on your API's response structure
			}
			return response; // Return the response so it can be used in the SignIn component
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	const signout = async () => {
		// signout function
		// Here, you might invalidate the user's session or token
		// Once signed out, you could clear the currentUser state
	};

	useEffect(() => {
		// Function to check if user is authenticated
		const checkAuth = async () => {
			// Send a request to your server to check if the user is authenticated
			// If authenticated, set the currentUser state
			// You might store a user's session or token in localStorage, cookies, etc.
			// If the user is authenticated, you might get the user data and set the currentUser state
		};

		checkAuth();
		setLoading(false);
	}, []);

	const value = {
		currentUser,
		signup,
		signin,
		signout,
	};

	return (
		<AuthContext.Provider value={value}>
			{!loading && children}
		</AuthContext.Provider>
	);
};
