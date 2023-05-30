import { createContext, useContext } from "react";
import axios from "axios";

const API_URL =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_API_URL_DEPLOY
		: process.env.REACT_APP_API_URL_DEV;

// @ts-ignore
const BeersContext = createContext();

export const useBeerContext = () => {
	return useContext(BeersContext);
};

// @ts-ignore
export const BeersProvider = ({ children }) => {
	// @ts-ignore
	const addBeers = async (values) => {
		try {
			console.log("values: ", values);
			let formData = new FormData();
			Object.entries(values).forEach(([key, value]) => {
				console.log(key, value);
				//@ts-ignore
				formData.append(key, value);
			});
			//@ts-ignore
			for (let pair of formData.entries()) {
				console.log(pair[0] + ", " + pair[1]);
			}
			const response = await axios.post(
				`${API_URL}/beers-brewing/pour-new`,
				formData,
				{
					withCredentials: true,
				}
			);
		} catch (error) {
			//@ts-ignore
			console.log(error.response.data.message);
		}
	};

	// @ts-ignore
	const editBeer = async (values, id) => {
		try {
			await axios
				.put(`${API_URL}/beers-brewing/tweak-beer/${id}`, values, {
					withCredentials: true,
				})
				.then((response) => {
					console.log(response.data.message);
				});
		} catch (error) {
			//@ts-ignore
			console.log(error.response.data.message);
		}
	};

	//@ts-ignore
	const deleteBeer = async (userId, beerId) => {
		try {
			await axios
				.delete(`${API_URL}/beers-brewing/throw-beer/${beerId}`, {
					data: { userId: userId },
					withCredentials: true,
				})
				.then((response) => {
					console.log(response.data.message);
				});
		} catch (error) {
			//@ts-ignore
			console.log(error.response.data.message);
		}
	};

	const value = {
		addBeers,
		editBeer,
		deleteBeer,
	};

	return (
		<BeersContext.Provider value={value}>{children}</BeersContext.Provider>
	);
};
