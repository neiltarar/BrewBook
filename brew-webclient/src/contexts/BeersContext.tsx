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
			const payloadPostDatat = {
				userId: userId,
				beerName: beerName,
				notes: notes,
				location: location,
			};
			const response = await axios.post(
				`${process.env.REACT_APP_API_URL}/beers-brewing/pour-new`,
				payloadPostDatat,
				{
					withCredentials: true,
				}
			);
		} catch (error) {
			console.log(error);
		}
	};

	// @ts-ignore
	const editBeer = async (values) => {
		const result = await axios.put(
			`${process.env.REACT_APP_API_URL}/beers-brewing/tweak-beer`
		);
	};
	const value = {
		addBeers,
		editBeer,
	};

	return (
		<BeersContext.Provider value={value}>{children}</BeersContext.Provider>
	);
};