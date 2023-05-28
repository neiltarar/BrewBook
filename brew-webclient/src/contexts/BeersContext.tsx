import { createContext, useContext } from "react";
import axios from "axios";

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
			const { beerName, notes, location, userId } = values;
			const payloadPostData = {
				userId: userId,
				beerName: beerName,
				notes: notes,
				location: location,
			};
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/beers-brewing/pour-new`,
				payloadPostData,
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
				.put(
					`${process.env.REACT_APP_API_URL}/beers-brewing/tweak-beer/${id}`,
					values,
					{ withCredentials: true }
				)
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
				.delete(
					`${process.env.REACT_APP_API_URL}/beers-brewing/throw-beer/${beerId}`,
					{
						data: { userId: userId },
						withCredentials: true,
					}
				)
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
