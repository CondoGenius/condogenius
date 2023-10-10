import React from 'react';
import RoutesConfig from '../../routes';
import { useHistory } from 'react-router-dom';

import Navbar from '../navbar/navbar';
import { useEffect } from 'react';

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/hub');
  }, []);

  return (
    <>
      <Navbar />
      <div className="content">
        <RoutesConfig />
      </div>
    </>
  )
};

export default Home;