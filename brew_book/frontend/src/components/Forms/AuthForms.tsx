import React, {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'


interface Props {
  onLogin: (token: string) => void;
  API_URL: string;
}

export const AuthForms: React.FC<Props> = ({ onLogin, API_URL }) => {
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

  const loginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const signupSchema = Yup.object().shape({
  first_name: Yup.string()
    .required('First Name is required')
    .max(25, 'First Name must be at most 25 characters'),
  last_name: Yup.string()
    .required('Last Name is required')
    .max(25, 'Last Name must be at most 25 characters'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required').min(3, 'Password must be at least 8 characters')
});
  

  const handleLoginSubmit = async (values: { 
    username: string; 
    password: string;
  }): Promise<void> => {
    const response = await fetch(`${API_URL}/accounts/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: values.username, password: values.password }),
    });
    console.log(response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      onLogin(data.access);
    } else {
      console.log('Invalid credentials');
    }
    return;
  };

  const handleSignupSubmit = async (values: {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  }): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/accounts/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        alert('User registered successfully');
      } else {
        console.log(response);
      }
    } catch (e) {
      console.log(e)
    }
  };


  return (
    <Container maxW="lg" py={{ base: '12', md: '24' }} px={{ base: '0', sm: '8' }}>
      <Stack spacing="8">
        {isSignUpVisible ? (
          <Stack spacing="6">
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={{ base: 'xs', md: 'sm' }}>Sign up for an account</Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Already have an account?</Text>
                <Button
                  variant="link"
                  colorScheme="teal"
                  onClick={() => setIsSignUpVisible(false)}
                >
                  Sign In
                </Button>
              </HStack>
            </Stack>
          </Stack>
        ) : (
          <Stack spacing="6">
            <Stack spacing={{ base: '2', md: '3' }} textAlign="center">
              <Heading size={{ base: 'xs', md: 'sm' }}>Log in to your account</Heading>
              <HStack spacing="1" justify="center">
                <Text color="muted">Don't have an account?</Text>
                <Button
                  variant="link"
                  colorScheme="teal"
                  onClick={() => setIsSignUpVisible(true)}
                >
                  Sign up
                </Button>
              </HStack>
            </Stack>
          </Stack>
        )}
        <Box
          py={{ base: '0', sm: '8' }}
          px={{ base: '4', sm: '10' }}
          bg={{ base: 'transparent', sm: 'bg-surface' }}
          boxShadow={{ base: 'none', sm: 'md' }}
          borderRadius={{ base: 'none', sm: 'xl' }}
          textAlign='center'
          key={isSignUpVisible ? 'signup' : 'login'}
        >
          {isSignUpVisible ? (
            <SignUpForm 
              signupSchema={signupSchema} 
              handleSignupSubmit={handleSignupSubmit}
            />
            ) : (
            <SignInForm 
              loginSchema={loginSchema} 
              handleLoginSubmit={handleLoginSubmit}/>
            )}
        </Box>
      </Stack>
    </Container>
  );
}

export default AuthForms;