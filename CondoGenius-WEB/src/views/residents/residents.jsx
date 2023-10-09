import React, { useState } from 'react';

import ResidentList from './containers/list/residentList';
import ResidentActions from './containers/actions/resident_actions';

import './residents.scss';
import 'materialize-css';

const Residents = () => {
  const [filters, setFilters] = useState({
    name: null,
    cpf: null,
    residenceId: null
  });

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