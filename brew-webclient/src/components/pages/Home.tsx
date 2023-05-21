import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Home = () => {
	const navigate = useNavigate();
	// @ts-ignore
	const { currentUser, beers } = useAuth();
	console.log(currentUser);
	useEffect(() => {
		if (!currentUser) {
			navigate("/signin");
		}
	}, [currentUser, navigate]);

	if (!currentUser) {
		return <p>Loading...</p>;
	}

	return (
		<div>
			<h1>Welcome, {currentUser.name}!</h1>
			<h2>Your beers:</h2>
			<ul>
				{beers.map((beer: any) => (
					<li key={beer.id}>
						{beer.name}: {beer.description}
					</li>
				))}
			</ul>
		</div>
	);
};
