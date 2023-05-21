import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { MyBeers } from "../Beers/MyBeers";
import { AllBeers } from "../Beers/AllBeers";
import { useLocation } from "react-router-dom";

export const Home = () => {
	const navigate = useNavigate();
	const location = useLocation();
	// @ts-ignore
	const { currentUser, beers } = useAuth();

	useEffect(() => {
		if (!currentUser) {
			navigate("/signin");
		}
	}, [currentUser, navigate]);

	if (!currentUser) {
		return <p>Loading...</p>;
	}
	// render MyBeers if pathname is /my-beers
	if (location.pathname === "/all-beers") {
		return <AllBeers currentUser={currentUser} beers={beers} />;
	}
	return <MyBeers currentUser={currentUser} beers={beers} />;
};
