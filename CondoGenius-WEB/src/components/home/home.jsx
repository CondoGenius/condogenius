import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import RoutesConfig from '../../routes';

import useResidents from '../../states/residents/hooks/useResidents';

import Navbar from '../navbar/navbar';

// const setResident = async(getResidentByUserId, userId) => {
//   const response = await getResidentByUserId(userId);
//   console.log(response)
// };

const Home = () => {
  const user = useSelector(state => state.user.data);
  const resident = useSelector(state => state.resident);

  const history = useHistory();

  const [, , getResidentByUserId, , , ,] = useResidents();
  
  useEffect(() => {
    if (!user.isAdmin) {
      getResidentByUserId(user.id);

      if (!resident.data) {
        localStorage.removeItem("user");
        localStorage.removeItem("resident");
        window.location.reload();
        history.push('/login');
      }
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="content">
        <RoutesConfig />
      </div>
    </>
  );
};

export default Home;