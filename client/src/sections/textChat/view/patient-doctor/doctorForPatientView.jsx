import React from 'react';
// import DoctorsList from '../doctorsList';
import UsersList from '../../components/UsersList';
const DoctorForPatientView = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Your Doctors</h1>
      <UsersList ioUrl={'http://localhost:3000/chat/doctor/patient'}
        contactUrl={'/chat/doctors'} />

    </div>
  );
};

export default DoctorForPatientView;
