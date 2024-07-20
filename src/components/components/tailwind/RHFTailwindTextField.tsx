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
        <div className="form-group relative">
          <input
            {...field}
            id={name}
            className={clsx(
              'form-input bg-white dark:bg-gray-700 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5',
              { 'border-green-500 focus:ring-green-500 focus:border-green-500': !error && (field.value !== '' || focused) },
              { 'border-red-500 focus:ring-red-500 focus:border-red-500': error }
            )}
            placeholder=" "
            onBlur={() => {
              setFocused(false);
              field.onBlur();
            }}
            onFocus={() => {
              setFocused(true);
            }}
            // onChange={handleInputChange} // Custom onChange handler

			onChange={(e) => {
				const val = handleInputChange(e);
				field.onChange(val); // Set value using React Hook Form's onChange
			  }}
          />
          <label
            htmlFor={name}
            className={clsx(
              'form-label block text-sm font-medium mt-1',
              {
                'text-green-700 dark:text-green-500': !error && (field.value !== '' || focused),
                'text-red-700 dark:text-red-500': error,
              },
              { 'transform -translate-y-2': focused || field.value !== '' }
            )}
          >
            {label}
          </label>
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
