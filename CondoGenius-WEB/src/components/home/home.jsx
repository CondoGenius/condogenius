import React from 'react';
import RoutesConfig from '../../routes';

import Navbar from '../navbar/navbar';

const Home = () => (
  <>
    <Navbar />
    <div className="content">
      <RoutesConfig />
    </div>
  </>
)

export default Home;