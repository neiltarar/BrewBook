import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface MyFormValues {
	email: string;
	password: string;
}

interface MyVariables {
	responseMessage: boolean | string;
}

export const SignIn: React.FC<{}> = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [responseMessage, setResponseMessage] =
		useState<MyVariables["responseMessage"]>(false);

	const navigate = useNavigate();

	// @ts-ignore
	const { signin } = useAuth();

	const initialValues: MyFormValues = {
		email: "",
		password: "",
	};

	const validationSchema = Yup.object({
		email: Yup.string().email("Invalid email address").required("Required"),
		password: Yup.string().required("Required"),
	});

	const handleSubmit = async (values: MyFormValues) => {
		setIsSubmitting(false);
		// @ts-ignore
		const response = await signin(values);
		if (response.status !== 200) {
			setResponseMessage("Login failed.");
		} else {
			const data = await response;
			setResponseMessage("Logged in");
			navigate("/"); // This line will navigate to the home page
		}
	};

	return (
		<div className='bg-grey-lighter min-h-screen flex flex-col'>
			<div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
				<div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
					{responseMessage ? <h1>{responseMessage}</h1> : <></>}
					<h1 className='mb-8 text-3xl text-center'>Sign In</h1>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						<Form>
							<Field
								className='block border border-grey-light w-full p-3 rounded mb-4'
								type='email'
								name='email'
								placeholder='Email'
							/>
							<ErrorMessage name='email' component='div' />

							<Field
								className='block border border-grey-light w-full p-3 rounded mb-4'
								type='password'
								name='password'
								placeholder='Password'
							/>
							<ErrorMessage name='password' component='p' />

							<div className='flex justify-center'>
								<button
									className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
									type='submit'
									disabled={isSubmitting}
								>
									Sign In
								</button>
							</div>
							<div className='flex justify-center text-gray-500 mt-6'>
								Don't have an account?{" "}
								<a
									className='no-underline border-b border-blue-500 text-blue-500 ml-1 hover:text-blue-600 hover:border-blue-600 hover:cursor-pointer'
									href='../signup/'
								>
									Sign up
								</a>
							</div>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};
