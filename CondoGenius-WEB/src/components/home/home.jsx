import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import RoutesConfig from '../../routes';

import Navbar from '../navbar/navbar';

const Home = () => {
  const user = useSelector(state => state.user.data);
  const resident = useSelector(state => state.resident);

  const history = useHistory();
  
  useEffect(() => {
    if (!user?.id || (user.isAdmin && !resident.data)) {
      localStorage.removeItem("user");
      localStorage.removeItem("resident");
      window.location.reload();
      history.push('/');
    }
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