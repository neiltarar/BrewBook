import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'


interface Props {
  loginSchema: Yup.Schema<any>;
  handleLoginSubmit: (values: { 
    username: string; 
    password: string 
  }) => Promise<void>;
}

const SignInForm: React.FC<Props> = ({ loginSchema, handleLoginSubmit }) => {
  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={loginSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleLoginSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <FormControl pb="5">
            <FormLabel htmlFor="username">Username:</FormLabel>
            <Field as={Input} type="text" name="username" placeholder="Username" />
          </FormControl>
          <FormControl pb="5">
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Field as={Input} type="password" name="password" placeholder="Password" />
          </FormControl>
          <Button
            type="submit"
            colorScheme="teal"
            size="lg"
            isLoading={isSubmitting} // add this to show a loading state
          >
            Sign in
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default SignInForm;