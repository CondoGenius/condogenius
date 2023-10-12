import { toast } from 'materialize-css';
import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import RoutesConfig from '../../routes';

import useResidents from '../../states/residents/hooks/useResidents';

import Navbar from '../navbar/navbar';

const Home = () => {
  const user = useSelector(state => state.user.data);
  const resident = useSelector(state => state.resident);

  const [, , getResidentByUserId , , , ,] = useResidents();

  if (!user.isAdmin) {
    getResidentByUserId(user.id);
  }

  useEffect(() => {
    if(resident?.error) {
      toast.error(resident.error)
      localStorage.removeItem("user");
  
      window.location.reload()
    }
  }, [resident.error]);

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