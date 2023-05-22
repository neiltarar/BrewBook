import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

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
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/users/signup`,
				values,
				{ withCredentials: true }
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
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/sessions/signin`,
				values,
				{ withCredentials: true }
			);
			if (response.status === 200) {
				const { user } = response.data;
				setCurrentUser({ name: user });
				setLoading(true);
				localStorage.setItem("currentUser", JSON.stringify({ name: user }));
				localStorage.setItem("loading", JSON.stringify(true));
			}
			return response;
		} catch (error) {
			localStorage.removeItem("currentUser");
			localStorage.setItem("loading", JSON.stringify(false));
			setLoading(false);
			setCurrentUser(null);
			return null;
		}
	};

	const signout = async () => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/sessions/signout`,
				{},
				{ withCredentials: true }
			);
			localStorage.removeItem("currentUser");
			localStorage.setItem("loading", JSON.stringify(false));
			setLoading(false);
			setCurrentUser(null);
			console.log(response);
			return response;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	const fetchBeers = async () => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_API_URL}/beers-brewing/serve-beers`,
				{ withCredentials: true }
			);
			if (response.status === 200) {
				setBeers(response.data);
			} else {
				console.log("Not Authorized");
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
