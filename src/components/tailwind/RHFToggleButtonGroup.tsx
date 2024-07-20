/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { useState } from 'react';

interface Option {
  id: string;
  label: string;
}

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
};

export function RHFTailwindToggleButtonGroup<T extends FieldValues>({
  name,
  options = [],
}: Props<T>) {
  const { control } = useFormContext<T>();
  const [selected, setSelected] = useState<string[]>([]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restField } }) => (
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`${
                selected.includes(option.id)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              } py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              onClick={() => {
                const newValue = selected.includes(option.id)
                  ? selected.filter((item) => item !== option.id)
                  : [...selected, option.id];
                setSelected(newValue);
                onChange(newValue);
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    />
  );
}
