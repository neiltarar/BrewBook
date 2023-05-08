import React, { useEffect } from 'react';

interface Props {
  refreshTokenIfNeeded: () => Promise<void>;
}

const HomePage: React.FC<Props> = ({ refreshTokenIfNeeded }) => {
  const fetchUserData = async () => {
    await refreshTokenIfNeeded();
    
  };

  useEffect(() => {
    // fetchUserData();
  }, []); 

  return (
    <div>
      <h1>My Beer Notes</h1>
      <p>Welcome to My Beer Notes!</p>
    </div>
  );
};

export default HomePage;
