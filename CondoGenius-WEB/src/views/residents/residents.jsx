import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loading from '../../components/loading/loading';
import useResidences from '../../states/residences/hooks/useResidences';
import useResidents from '../../states/residents/hooks/useResidents';
import ResidentActions from './containers/actions/resident_actions';
import ResidentList from './containers/list/residentList';

import 'materialize-css';
import './residents.scss';

const Residents = () => {
  const residents = useSelector((state) => state.residents);
  const { loadingResidences } = useResidences();
  const { loadingResidents }= useResidents();


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
      <Loading 
        show={
          loadingResidences ||
          loadingResidents
        }
      />
      <div className='header_content'>
        <h1>Moradores</h1>
      </div>

      <ResidentActions filters={filters} setFilters={setFilters} />
      
      <ResidentList filters={filters} setFilters={setFilters}/>
    </div>
  );
}

export default Residents;