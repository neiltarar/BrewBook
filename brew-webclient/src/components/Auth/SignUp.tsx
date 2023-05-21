import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface MyFormValues {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	passwordRepeat: string;
}

interface MyVariables {
	responseMessage: boolean | string;
}

export const SignUp: React.FC<{}> = () => {
	const navigate = useNavigate();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [responseMessage, setResponseMessage] =
		useState<MyVariables["responseMessage"]>(false);

	// @ts-ignore
	const { signup } = useAuth();

	const initialValues: MyFormValues = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		passwordRepeat: "",
	};

	const validationSchema = Yup.object({
		firstName: Yup.string().required("Required"),
		lastName: Yup.string().required("Required"),
		email: Yup.string().email("Invalid email address").required("Required"),
		password: Yup.string()
			.min(3, "Password must be at least 8 characters")
			.required("Required"),
		passwordRepeat: Yup.string()
			.oneOf([Yup.ref("password")], "Passwords must match")
			.required("Required"),
	});

	const handleSubmit = async (values: MyFormValues) => {
		setIsSubmitting(true);
		const response = await signup(values);
		if (!response.ok) {
			setResponseMessage("Account couldn't be created.");
			setIsSubmitting(false);
		} else {
			const data = await response.json();
			setResponseMessage("Account Created");
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		if (responseMessage === "Account Created") {
			const timer = setTimeout(() => {
				navigate("/signin");
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [responseMessage, navigate]);

	return (
		<div className='bg-grey-lighter min-h-screen flex flex-col'>
			<div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2'>
				<div className='bg-white px-6 py-8 rounded shadow-md text-black w-full'>
					{responseMessage ? <h1>{responseMessage}</h1> : <></>}
					<h1 className='mb-8 text-3xl text-center'>Sign Up</h1>
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						<Form>
							<Field
								className='block border border-grey-light w-full p-3 rounded mb-4'
								type='text'
								name='firstName'
								placeholder='First Name'
							/>
							<ErrorMessage name='firstName' component='div' />

							<Field
								className='block border border-grey-light w-full p-3 rounded mb-4'
								type='text'
								name='lastName'
								placeholder='Last Name'
							/>
							<ErrorMessage name='lastName' component='div' />

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

							<Field
								className='block border border-grey-light w-full p-3 rounded mb-4'
								type='password'
								name='passwordRepeat'
								placeholder='Repeat Password'
							/>
							<ErrorMessage name='passwordRepeat' component='p' />
							<div className='flex justify-center'>
								<button
									className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
									type='submit'
									disabled={isSubmitting}
								>
									Create Account
								</button>
							</div>
							<div className='flex justify-center text-gray-500 mt-6'>
								Already have an account?{" "}
								<a
									className='no-underline border-b border-blue-500 text-blue-500 ml-1 hover:text-blue-600 hover:border-blue-600 hover:cursor-pointer'
									href='../signin/'
								>
									Log in
								</a>
							</div>
						</Form>
					</Formik>
				</div>
			</div>
		</div>
	);
};
