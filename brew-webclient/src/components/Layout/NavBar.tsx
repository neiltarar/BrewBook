import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Navbar: FC = () => {
	const navigate = useNavigate();
	// @ts-ignore
	const { signout } = useAuth();

	return (
		<nav className='flex items-center justify-between bg-teal-500 p-6'>
			<div className='flex items-center flex-shrink-0 text-white mr-6'>
				<span className='font-semibold text-xl tracking-tight'>Beer App</span>
			</div>
			<div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
				<div className='text-sm lg:flex-grow'>
					<Link
						to='/'
						className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'
					>
						Main Page
					</Link>
					<Link
						to='/my-beers'
						className='block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4'
					>
						My Beers
					</Link>
				</div>
				<div>
					<button
						className='inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0'
						onClick={signout}
					>
						Sign Out
					</button>
				</div>
			</div>
		</nav>
	);
};
