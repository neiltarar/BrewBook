import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Flex, Text } from '@chakra-ui/react';
import { handleLogout } from './Forms/helpers/auth';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {

  return (
    <Flex bg="gray.900" color="white" p={4} justify="space-between" alignItems="center">
      <Flex align="center" mr={5}>
        <Link to="/">
          <Text fontSize="xl" fontWeight="bold">
            BrewBook
          </Text>
        </Link>
      </Flex>

      <Flex>
        <Link to="/">
          <Text mr={6}>Home</Text>
        </Link>
        <Link to="/beers">
          <Text mr={6}>Beers</Text>
        </Link>
        <Button variant="outline" colorScheme="white" onClick={() => handleLogout(onLogout)}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
