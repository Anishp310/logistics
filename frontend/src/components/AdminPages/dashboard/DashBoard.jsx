import React from 'react';
import Header from '../../common/Header';
import ComponentTable from '../../common/ComponentTable';
import RequestJob from '../Job/RequestJob';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <Header heading="Dashboard" /> 
      <div className="mt-4">
        <RequestJob/>
      </div>
    </div>
  );
};

export default AdminDashboard;
