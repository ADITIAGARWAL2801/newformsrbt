import { useContext, useState } from 'react';
import { StepperContext } from "../contexts/StepperContext";

export default function Payment() {
  const { userData, setUserData, handleNextStep, setCurrentStep } = useContext(StepperContext);
  const [errors, setErrors] = useState({});
  const [showmonths, setShowmonths] = useState(false);
  const [showyears, setShowyears] = useState(false);

  const validateField = (name, value) => {
    let error = '';
    switch(name) {
      case 'cardHolderName':
        const nameRegex = /^[A-Za-z\s]+$/;
        error = !value ? 'Name is required' : !nameRegex.test(value) ? 'Invalid name' : '';
        break;
      case 'cvv':
        const cvvRegex = /^[1-9][0-9]{2}$/;
        error = !value ? 'CVV is required' : !cvvRegex.test(value) ? 'Invalid CVV' : '';
        break;
      case 'cardnumber':
        const cardnumberRegex = /^[1-9][0-9]{15}$/;
        error = !value ? 'Card number is required' : !cardnumberRegex.test(value) ? 'Invalid card number' : '';
        break;
      default:
        break;
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    validateField(name, value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formIsValid = true;
    const fieldsToValidate = ['cardnumber', 'cvv', 'cardHolderName'];
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
      handleNextStep(); // Call handleNextStep from context
    }
  };

  const months = ["January", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
  const years = ["2024", "2025", "2026", "2027", "2028", "2029"];

  return (
    <form id="paymentForm" onSubmit={handleSubmit} className='flex flex-col'>
      <div className='flex flex-col'>
        <div className="flex w-full mx-2">  
          <div className='w-full mx-2 flex-1'>
            <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
              Card Number
            </div>
            <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
              <input
                onChange={handleChange}
                value={userData["cardnumber"] || ""}
                name='cardnumber'
                placeholder='Card Number'
                className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
              />
            </div>
            {errors.cardnumber && <p className='text-red-500 text-xs'>{errors.cardnumber}</p>}
          </div>

          <div className='w-full mx-2 flex-1'>
            <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
              CVV
            </div>
            <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
              <input
                onChange={handleChange}
                value={userData["cvv"] || ""}
                name='cvv'
                placeholder='CVV'
                className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
              />
            </div>
            {errors.cvv && <p className='text-red-500 text-xs'>{errors.cvv}</p>}
          </div>
        </div>

        <div className='w-full mx-2 flex-1'>
          <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
            Card Holder Name
          </div>
          <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
            <input
              onChange={handleChange}
              value={userData["cardHolderName"] || ""}
              name='cardHolderName'
              placeholder='Card Holder Name'
              className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
            />
          </div>
          {errors.cardHolderName && <p className='text-red-500 text-xs'>{errors.cardHolderName}</p>}
        </div>

        <div className='flex w-full mx-2'>
          <div className='w-full mx-2'>
            <label className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>Expiry Month</label>
            <div className='relative'>
              <div
                className='bg-white my-2 p-1 flex border border-gray-200 rounded cursor-pointer'
                onClick={() => setShowmonths(!showmonths)}
              >
                <input
                  readOnly
                  value={userData['month'] || 'Select Expiry Month'}
                  name='month'
                  className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
                />
              </div>
              {showmonths && (
                <div className='absolute z-10 mt-2 bg-white border border-gray-200 rounded w-full'>
                  {months.map(month => (
                    <div
                      key={month}
                      className='p-2 hover:bg-gray-100 cursor-pointer'
                      onClick={() => {
                        setUserData({ ...userData, month });
                        setShowmonths(false);
                      }}
                    >
                      {month}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className='w-full mx-2'>
            <label className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>Expiry Year</label>
            <div className='relative'>
              <div
                className='bg-white my-2 p-1 flex border border-gray-200 rounded cursor-pointer'
                onClick={() => setShowyears(!showyears)}
              >
                <input
                  readOnly
                  value={userData['year'] || 'Select Expiry Year'}
                  name='month'
                  className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
                />
              </div>
              {showyears && (
                <div className='absolute z-10 mt-2 bg-white border border-gray-200 rounded w-full'>
                  {years.map(year => (
                    <div
                      key={year}
                      className='p-2 hover:bg-gray-100 cursor-pointer'
                      onClick={() => {
                        setUserData({ ...userData, year });
                        setShowyears(false);
                      }}
                    >
                      {year}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}