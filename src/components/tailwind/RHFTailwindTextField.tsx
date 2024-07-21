import { useState } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import clsx from 'clsx';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>; // Allow other input props

export function RHFTailwindTextField<T extends FieldValues>({ name, label, type, ...rest }: Props<T>) {
  const { control } = useFormContext();
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === 'password';

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`relative z-0 w-full mb-5 group ${error ? 'shake' : ''}`}>
          <input
            {...field}
            {...rest} // Pass other props here
            type={isPasswordField && showPassword ? 'text' : type}
            onBlur={() => {
              setFocused(false);
              field.onBlur();
            }}
            onFocus={() => {
              setFocused(true);
            }}
            className={clsx(
              'block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer',
              { 'border-green-500 focus:ring-green-500 focus:border-green-500': !error && (field.value !== '' || focused) },
              { 'border-red-500 focus:ring-red-500 focus:border-red-500': error }
            )}
            placeholder=" "
            required
          />
          <label
            htmlFor={field.name}
            className={clsx(
              'peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6',
              {
                'text-green-700 dark:text-green-500': !error && (field.value !== '' || focused),
                'text-red-700 dark:text-red-500 peer-focus:text-red-600 peer-focus:dark:text-red-500': error,
                'transform -translate-y-2': focused || field.value !== ''
              }
            )}
          >
            {label}
          </label>

          {isPasswordField && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-2.5 text-gray-600 dark:text-gray-400 border-0"
            >
              {showPassword ?
              <FaRegEye />

              :

               <FaRegEyeSlash />

              }
            </button>
          )}

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
