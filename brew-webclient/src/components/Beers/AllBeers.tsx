import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

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

export const AllBeers: FC<Props> = ({ currentUser, beers }) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!currentUser) {
			navigate("/signin");
		}
	}, [currentUser, navigate]);

	if (!currentUser) {
		return <p>Loading...</p>;
	}

	return (
		<div className='text-center'>
			<section className='p-10'>
				<h1>Welcome, {currentUser.user.name}!</h1>
				<h2>Here are beers from everyone:</h2>
			</section>
			<section className='p-10'>
				<div>
					<ul className='grid grid-cols-2 md:grid-cols-3 gap-4'>
						{beers.map((beer: any) => (
							<li key={beer.id}>
								<p>Name: {beer.name}</p>
								<p> Website: {beer.producer_website} </p>
								<p> I drank it at: {beer.place_consumed}</p>
								<p> Date: {beer.date_consumed}</p>
								<p> Notes: {beer.notes}</p>
								{currentUser.user.id === beer.user_id && (
									<div className='flex justify-around m-10'>
										<button> edit </button>
										<button> delete </button>
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
