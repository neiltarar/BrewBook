// BeersContext.js
import { createContext, useContext } from "react";

// @ts-ignore
const BeersContext = createContext();

// @ts-ignore
export const BeersProvider = ({ children }) => {
	// @ts-ignore
	const addBeers = (values) => {
		try {
			console.log("addBeers invoked with values: ", values);
		} catch (error) {
			console.log(error);
		}
	};

	const value = {
		addBeers,
	};

	console.log("Context value:", value); // <-- Add this line

	return (
		<BeersContext.Provider value={value}>{children}</BeersContext.Provider>
	);
};
