import React from 'react';
import RoutesConfig from '../../routes';

import Navbar from '../navbar/navbar';

const Home = () => {

  

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