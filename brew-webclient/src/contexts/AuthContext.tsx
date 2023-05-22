import { createContext, useContext, useState, useEffect } from "react";

// @ts-ignore
const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

// @ts-ignore
export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(() => {
		const storedUser = localStorage.getItem("currentUser");
		return storedUser ? JSON.parse(storedUser) : null;
	});
	const [loading, setLoading] = useState(() => {
		const storedLoadingState = localStorage.getItem("loading");
		return storedLoadingState ? JSON.parse(storedLoadingState) : false;
	});
	const [beers, setBeers] = useState([]);

	// @ts-ignore
	const signup = async (values) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/users/signup`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
					body: JSON.stringify(values),
				}
			);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
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
				const data = await response.json();
				// @ts-ignore
				setCurrentUser({ name: data.user });
				setLoading(true);
				// Update localStorage
				localStorage.setItem(
					"currentUser",
					JSON.stringify({ name: data.user })
				);
				localStorage.setItem("loading", JSON.stringify(true));
			}
			return response;
		} catch (error) {
			localStorage.removeItem("currentUser");
			localStorage.setItem("loading", JSON.stringify(false));
			setLoading(false);
			setCurrentUser(null);
			console.log(error);
			return null;
		}
	};

	const signout = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/sessions/signout`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				}
			);
			// Update localStorage
			localStorage.removeItem("currentUser");
			localStorage.setItem("loading", JSON.stringify(false));

			setLoading(false);
			setCurrentUser(null);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	const fetchBeers = async () => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_API_URL}/beers-brewing/serve-beers`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
					credentials: "include",
				}
			);
			if (response.ok) {
				const data = await response.json();
				setBeers(data);
			} else {
				console.log("Not Authorised");
				localStorage.removeItem("currentUser");
				localStorage.setItem("loading", JSON.stringify(false));
				setLoading(false);
				setCurrentUser(null);
			}
		} catch (error) {
			localStorage.removeItem("currentUser");
			localStorage.setItem("loading", JSON.stringify(false));
			setLoading(false);
			setCurrentUser(null);
			console.log(error);
		}
	};

	useEffect(() => {
		// Fetch beers
		fetchBeers();
	}, [currentUser]);

	const value = {
		currentUser,
		signup,
		signin,
		signout,
		beers,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
