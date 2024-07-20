/* eslint-disable no-mixed-spaces-and-tabs */

import React, { useState } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import clsx from 'clsx';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  maxLength?: number; // Add schema prop of type ZodObject
};

export function RHFTailwindTextField<T extends FieldValues>({ name, label, maxLength }: Props<T>) {
  const { control } = useFormContext();
  const [focused, setFocused] = useState(false);

  // Get maxLength from the schema if it's defined
  const maxhhhhLength = maxLength ?? Infinity;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    // If maxLength is defined and the input exceeds it, slice the value
    if (maxhhhhLength && value.length > maxhhhhLength) {
      event.target.value = value.slice(0, maxhhhhLength);
    }

    // Update the field value in React Hook Form
    return value.slice(0, maxhhhhLength); // Ensure value does not exceed maxLength
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`relative z-0 w-full mb-5 group ${error ? 'shake':''}`}>
        <input 
  {...field}
        
        onBlur={() => {
          setFocused(false);
          field.onBlur();
        }}
        onFocus={() => {
          setFocused(true);
        }}


        type="email" name="floating_email" id="floating_email"
        
        className={clsx(
          'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
          { 'border-green-500 focus:ring-green-500 focus:border-green-500': !error && (field.value !== '' || focused) },
          { 'border-red-500 focus:ring-red-500 focus:border-red-500': error }
        )}
        
        placeholder=" " required />
        <label htmlFor="floating_email"
        
        className={clsx(
          'peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
          {
            'text-green-700 dark:text-green-500': !error && (field.value !== '' || focused),
            'text-red-700 dark:text-red-500 peer-focus:text-red-600 peer-focus:dark:text-red-500': error,
          },
          { 'transform -translate-y-2': focused || field.value !== '' }
        )}
        
        >{label}</label>
        
{error && (
  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
    <span className="font-medium">Oh, snap!</span> {error.message}
  </p>
)}
      </div>
      )}
    />
  );
}
