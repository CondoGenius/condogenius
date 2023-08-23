import React from 'react';
import Navbar from '../navbar/navbar';
import Sidebar from '../../sidebar/sidebar';

import Residents from '../residents/residents';
import Complaints from '../complaints/complaints';
import Reservations from '../reservations/reservations';

import './home.scss';

const Home = () => (
  <div>
    <div>
      <Navbar />
    </div>
    <div className='content_home'>
      <Sidebar />
      <div id='context'>
        <Reservations />
      </div>
    </div>
  </div>
);

export default Home;