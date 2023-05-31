import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useBeerContext } from "../../contexts/BeersContext";

const API_URL =
	process.env.NODE_ENV === "production"
		? process.env.REACT_APP_API_URL_DEPLOY
		: process.env.REACT_APP_API_URL_DEV;

interface Props {
	currentUser: { user: { name: string; id: number } };
	beers: [
		{
			id: number;
			name: string;
			producer_website: string;
			place_consumed: string;
			date_consumed: any;
			notes: string;
			user_id: number;
		}
	];
}

export const MyBeers: FC<Props> = ({ currentUser, beers }) => {
	const navigate = useNavigate();
	//@ts-ignore
	const { loading } = useAuth();
	//@ts-ignore
	const { deleteBeer } = useBeerContext();
	const [myBeers, setMyBeers] = useState([]);

	useEffect(() => {
		if (!currentUser) {
			navigate("/signin");
		} else {
			//@ts-ignore
			setMyBeers(beers.filter((beer) => beer.user_id === currentUser.user.id));
		}
	}, [currentUser, navigate, beers]);

	const handleDelete = (beerId: number) => {
		deleteBeer(currentUser.user.id, beerId);
		//@ts-ignore
		setMyBeers((prevBeers) => prevBeers.filter((beer) => beer.id !== beerId));
	};

	if (!currentUser || loading) {
		return <p>Loading...</p>;
	}
	return (
		<div className='text-center'>
			<section className='p-10'>
				<h1>Welcome, {currentUser.user.name}!</h1>
				<h2>Your beers:</h2>
			</section>
			<section className='p-10'>
				<div>
					<ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
						{myBeers.map((beer: any) => (
							<li
								key={beer.id}
								className='bg-white shadow-md rounded-md p-4 w-full'
							>
								<p>Name: {beer.name}</p>
								<a href={beer.producer_website} className='text-green-500'>
									{" "}
									Website{" "}
								</a>
								<p> I drank it at: {beer.place_consumed}</p>
								<p> Date: {beer.date_consumed}</p>
								<p> Notes: {beer.notes}</p>
								<div>
									{process.env.NODE_ENV === "production" ? (
										<img
											className='mx-auto h-48 w-48 object-cover'
											src={`${API_URL}/images/${beer.images}`}
											alt={beer.name}
										/>
									) : (
										<img
											className='mx-auto h-48 w-48 object-cover'
											src={`http://localhost/images/${beer.images}`}
											alt={beer.name}
										/>
									)}
								</div>
								{currentUser.user.id === beer.user_id && (
									<div className='flex justify-around m-10'>
										<Link to={`/tweak-beer/${beer.id}`}> edit </Link>
										<button onClick={() => handleDelete(beer.id)}>
											delete
										</button>
									</div>
								)}
							</li>
						))}
					</ul>
				</div>
			</section>
		</div>
	);
};
