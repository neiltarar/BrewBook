import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'

interface Props {
  signupSchema: Yup.Schema<any>;
  handleSignupSubmit: (values: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password2: string;
  }) => Promise<void>;
}

const SignUpForm: React.FC<Props> = ({ signupSchema, handleSignupSubmit }) => {
  return (
    <Formik
      initialValues={{ first_name: '', last_name: '', email: '', password: '', password2: '' }}
      validationSchema={signupSchema}
      onSubmit={handleSignupSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <FormControl pb="5">
            <FormLabel htmlFor="first_name">First Name</FormLabel>
            <Field
              as={Input}
              name="first_name"
              placeholder="First Name"
              isInvalid={errors.first_name && touched.first_name}
            />
          </FormControl>
          <FormControl pb="5">
            <FormLabel htmlFor="last_name">Last Name</FormLabel>
            <Field
              as={Input}
              name="last_name"
              placeholder="Last Name"
              isInvalid={errors.last_name && touched.last_name}
            />
          </FormControl>
          <FormControl pb="5">
            <FormLabel htmlFor="email">Email</FormLabel>
            <Field
              as={Input}
              type="email"
              name="email"
              placeholder="Email"
              isInvalid={errors.email && touched.email}
            />
          </FormControl>
          <FormControl pb="5">
            <FormLabel htmlFor="password">Password</FormLabel>
            <Field
              as={Input}
              type="password"
              name="password"
              placeholder="Password"
              isInvalid={errors.password && touched.password}
            />
          </FormControl>
          <FormControl pb="5">
            <FormLabel htmlFor="password2">Repeat Password</FormLabel>
            <Field
              as={Input}
              type="password"
              name="password2"
              placeholder="Password-repeat"
              isInvalid={errors.password && touched.password}
            />
          </FormControl>
          <Button type="submit" colorScheme='teal' size='lg'>
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default SignUpForm
