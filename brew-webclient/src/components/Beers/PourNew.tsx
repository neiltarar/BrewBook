import { useBeerContext } from "../../contexts/BeersContext";
import { useAuth } from "../../contexts/AuthContext";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import * as Yup from "yup";

interface FormValues {
	beerName: string;
	notes: string;
	location: string;
}

interface Props {
	currentUser: { user: { name: string; id: number } };
}

export const PourNew = () => {
	const navigate = useNavigate();

	const initialValues: FormValues = {
		beerName: "",
		notes: "",
		location: "",
	};

	// @ts-ignore
	const { addBeers } = useBeerContext();
	// @ts-ignore
	const { currentUser } = useAuth();

	const validationSchema = Yup.object({
		beerName: Yup.string().required("Beer name is required"),
		notes: Yup.string(),
		location: Yup.string().required("Location is required"),
	});

	const handleSubmit = (values: FormValues) => {
		// @ts-ignore
		values.userId = currentUser.user.id;
		navigate("/my-beers");
		addBeers(values);
	};

	useEffect(() => {
		if (!currentUser) {
			navigate("/signin");
		}
	}, [currentUser, navigate]);

	if (!currentUser) {
		return <p>Loading...</p>;
	}

	return (
		<div className='max-w-md mx-auto mt-4'>
			<h1 className='text-2xl font-bold mb-4'>New Beer Pour</h1>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{() => (
					<Form>
						<div className='mb-4'>
							<label htmlFor='beerName' className='block font-semibold'>
								Beer Name
							</label>
							<Field
								type='text'
								id='beerName'
								name='beerName'
								placeholder='Enter beer name'
								className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
							/>
						</div>
						<div className='mb-4'>
							<label htmlFor='notes' className='block font-semibold'>
								Notes
							</label>
							<Field
								as='textarea'
								id='notes'
								name='notes'
								placeholder='Enter your notes'
								className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
							/>
						</div>
						<div className='mb-4'>
							<label htmlFor='location' className='block font-semibold'>
								Where You Drank It
							</label>
							<Field
								type='text'
								id='location'
								name='location'
								placeholder='Enter location'
								className='w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500'
							/>
						</div>
						<div className='flex justify-end'>
							<button
								type='submit'
								className='px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
							>
								Save
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};
