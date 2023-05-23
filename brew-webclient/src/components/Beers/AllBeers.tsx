import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface Props {
	currentUser: { user: { name: string; id: number } };
	beers: [{ id: number; name: string; description: string }];
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
								{beer.name}: {beer.description}
							</li>
						))}
					</ul>
				</div>
			</section>
		</div>
	);
};
