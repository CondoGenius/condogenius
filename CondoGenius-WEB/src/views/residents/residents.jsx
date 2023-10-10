import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ResidentList from './containers/list/residentList';
import ResidentActions from './containers/actions/resident_actions';
import { toast } from 'react-toastify';

import './residents.scss';
import 'materialize-css';

const Residents = () => {
  const residents = useSelector((state) => state.residents);

  const [filters, setFilters] = useState({
    name: null,
    cpf: null,
    residenceId: null
  });

  useEffect(() => {
    toast.error(residents.error)
  }, [residents.error]);

  return (
    <div className='content_residents'>
      <div className='header_content'>
        <h1>Moradores</h1>
      </div>

      <ResidentActions filters={filters} setFilters={setFilters} />
      
      <ResidentList filters={filters} setFilters={setFilters}/>
    </div>
  );
}

export default Residents;