import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
import clsx from 'clsx';

type Option = {
  id: string;
  label: string;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export function RHFTailwindAutocomplete<T extends FieldValues>({
  name,
  options = [],
  label,
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ref }, fieldState: { error } }) => (
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <div className="relative mt-1">
            <input
              ref={ref}
              type="text"
              className={clsx(
                'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                { 'border-red-500 text-red-600': error }
              )}
              readOnly
              value={value.map((id: string) =>
                options.find((item) => item.id === id)?.label ?? ''
              ).join(', ')}
              onClick={() => {
                const dropdown = document.getElementById(`${name}-dropdown`);
                if (dropdown) dropdown.classList.toggle('hidden');
              }}
            />
            {error && <span className="mt-2 text-sm text-red-600">{error.message}</span>}
          </div>
          <ul
            id={`${name}-dropdown`}
            className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg hidden"
          >
            {options.map((option) => (
              <li
                key={option.id}
                className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  const selected = value.includes(option.id)
                    ? value.filter((id: string) => id !== option.id)
                    : [...value, option.id];
                  onChange(selected);
                }}
              >
                <span className="p-1">
                  {value.includes(option.id) ? (
                    <FaCheckSquare className="text-indigo-500" />
                  ) : (
                    <FaSquare className="text-gray-400" />
                  )}
                </span>
                <span className="ml-2">{option.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    />
  );
}
