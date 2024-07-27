import React, { useContext, useEffect } from 'react';
import { StepperContext } from '../contexts/StepperContext';
import { useForm } from 'react-hook-form';

export default function Accounts() {
  const { userData, setUserData, handleNextStep } = useContext(StepperContext);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      setUserData({ ...userData, [name]: value[name] });
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit = (data) => {
    handleNextStep();
  };

  return (
    <form id="accountForm" onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Username
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            {...register('username', {
              required: 'Username is required!',
              minLength: {
                value: 6,
                message: 'Username must be at least 6 characters long',
              },
              maxLength: {
                value: 20,
                message: 'Username cannot exceed 20 characters',
              },
              pattern: {
                value: /^[a-zA-Z0-9]+$/,
                message: 'Username can only contain letters, numbers, and underscores',
              },
            })}
            name='username'
            placeholder='Username'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
        {errors.username && <p className='text-red-500 text-xs'>{errors.username.message}</p>}
      </div>

      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Password
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            {...register('password', {
              required: 'Password is required!',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
            })}
            name='password'
            type='password'
            placeholder='Password'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
        {errors.password && <p className='text-red-500 text-xs'>{errors.password.message}</p>}
      </div>

      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Confirm Password
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            {...register('confirmPassword', {
              required: 'Please confirm your password!',
              validate: value => value === watch('password') || 'Passwords do not match',
            })}
            name='confirmPassword'
            type='password'
            placeholder='Confirm Password'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
        {errors.confirmPassword && <p className='text-red-500 text-xs'>{errors.confirmPassword.message}</p>}
      </div>

      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Email
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            {...register('email', {
              required: 'Email is required!',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
            name='email'
            type='email'
            placeholder='Email'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
        {errors.email && <p className='text-red-500 text-xs'>{errors.email.message}</p>}
      </div>
    </form>
  );
}