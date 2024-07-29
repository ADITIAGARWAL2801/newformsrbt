import React, { useContext } from 'react';
import { StepperContext } from '../contexts/StepperContext';

export default function Final() {
  const { userData } = useContext(StepperContext);

  return (
    <div className='p-4'>
      <h2 className='text-2xl font-bold'>User Details :</h2>
      <br></br>
      <p><strong>First Name:</strong> {userData.fname}</p>
      <p><strong>Last Name:</strong> {userData.lname}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Zip Code:</strong> {userData.zipcode}</p>
      <p><strong>Home Address:</strong> {userData.homeaddress}</p>
      <p><strong>State:</strong> {userData.state}</p>
      <p><strong>Country:</strong> {userData.country}</p>
    </div>
  );
}

