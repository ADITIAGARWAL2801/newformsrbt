import { useContext, useState } from 'react';
import { StepperContext } from '../contexts/StepperContext';

export default function Details() {
  const { userData, setUserData, handleNextStep } = useContext(StepperContext);
  const [errors, setErrors] = useState({});
  const [showStates, setShowStates] = useState(false);
  const [showCountries, setShowCountries] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'fname': 
      const nameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
      error = !value ? 'first name is required' : !nameRegex.test(value) ? 'Invalid name' : '';
      break;  
      case 'lname': 
      const lnameRegex = /^[A-Za-z\s]+$/; // Allows only letters and spaces
      error = !value ? 'last name is required' : !lnameRegex.test(value) ? 'Invalid name' : '';
      break;      
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = !value ? 'Email address is required' : !emailRegex.test(value) ? 'Invalid email address' : '';
        break;
      case 'zipcode':
        const zipRegex = /^[1-9][0-9]{5}$/; // Example for 5-digit zip code
        error = !value ? 'Zip code is required' : !zipRegex.test(value) ? 'Invalid zip code' : '';
        break;
      case 'homeaddress':
        error = !value ? 'Home address is required' : '';
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'fname' || name === 'lname') {
      // Restrict input to letters and spaces only
      if (/^[a-zA-Z\s]*$/.test(value)) {
        setUserData({ ...userData, [name]: value });
      }
    } else {
      setUserData({ ...userData, [name]: value });
    }
    validateField(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let formIsValid = true;
    const fieldsToValidate = ['fname', 'lname', 'email', 'zipcode', 'homeaddress'];
    const newErrors = {};

    fieldsToValidate.forEach(field => {
      if (!userData[field]) {
        formIsValid = false;
        newErrors[field] = `${field} is required`;
      } else {
        validateField(field, userData[field]);
        if (errors[field]) formIsValid = false;
      }
    });

    setErrors(newErrors);

    if (formIsValid) {
      handleNextStep();
    }
  };

  return (
    <form id="detailsForm" onSubmit={handleSubmit} className='flex flex-col'>
      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          First Name
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData['fname'] || ''}
            name='fname'
            placeholder='First Name'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
        {errors.fname && <p className='text-red-500 text-xs'>{errors.fname}</p>}
      </div>

      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Last Name
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData['lname'] || ''}
            name='lname'
            placeholder='Last Name'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
        {errors.lname && <p className='text-red-500 text-xs'>{errors.lname}</p>}
      </div>

      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Email
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData['email'] || ''}
            name='email'
            placeholder='Email'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
        {errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}
      </div>

      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Zip Code
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData['zipcode'] || ''}
            name='zipcode'
            placeholder='Zip Code'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
        {errors.zipcode && <p className='text-red-500 text-xs'>{errors.zipcode}</p>}
      </div>

      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Home Address
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData['homeaddress'] || ''}
            name='homeaddress'
            placeholder='Home Address'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
        {errors.homeaddress && <p className='text-red-500 text-xs'>{errors.homeaddress}</p>}
      </div>
    </form>
  );
}


