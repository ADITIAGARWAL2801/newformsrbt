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
      case 'lname':
        error = /^[a-zA-Z\s]*$/.test(value) ? '' : `${name === 'fname' ? 'First' : 'Last'} name should contain only letters`;
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        error = !value ? 'Email address is required' : !emailRegex.test(value) ? 'Invalid email address' : '';
        break;
      case 'zipcode':
        const zipRegex = /^\d{6}$/; // Example for 5-digit zip code
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
  const states = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", 
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", 
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
  ];

  // List of countries
  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus",
    "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
    "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
    "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
    "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece",
    "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
    "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan",
    "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg",
    "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania",
    "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
    "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua",
    "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino",
    "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
    "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka",
    "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
    "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
    "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

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
      <div className='w-full mx-2'>
        <label className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>State</label>
        <div className='relative'>
          <div
            className='bg-white my-2 p-1 flex border border-gray-200 rounded cursor-pointer'
            onClick={() => setShowStates(!showStates)}
          >
            <input
              readOnly
              onChange={handleChange}
              value={userData['state'] || 'Select State'}
              name='state'
              className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
            />
          </div>
          {showStates && (
            <div className='absolute z-10 mt-2 bg-white border border-gray-200 rounded w-full'>
              {states.map(state => (
                <div
                  key={state}
                  className='p-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => {
                    setUserData({ ...userData, state });
                    setShowStates(false);
                  }}
                >
                  {state}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className='w-full mx-2'>
        <label className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>Country</label>
        <div className='relative'>
          <div
            className='bg-white my-2 p-1 flex border border-gray-200 rounded cursor-pointer'
            onClick={() => setShowCountries(!showCountries)}
          >
            <input
              readOnly
              onChange={handleChange}
              value={userData['country'] || 'Select Country'}
              name='country'
              className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
            />
          </div>
          {showCountries && (
            <div className='absolute z-10 mt-2 bg-white border border-gray-200 rounded w-full'>
              {countries.map(country => (
                <div
                  key={country}
                  className='p-2 hover:bg-gray-100 cursor-pointer'
                  onClick={() => {
                    setUserData({ ...userData, country });
                    setShowCountries(false);
                  }}
                >
                  {country}
                </div>
              ))}
            </div>
          )}
        </div>
        </div>
    </form>
  );
}

