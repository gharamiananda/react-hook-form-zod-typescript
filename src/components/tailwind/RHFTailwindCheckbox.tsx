import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { FaCheckSquare, FaSquare } from 'react-icons/fa';
// import clsx from 'clsx';

type Option = {
  id: string;
  label: string;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export function RHFTailwindCheckbox<T extends FieldValues>({ name, options, label }: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <div className="mt-1">
            {options?.map((option) => (
              <div key={option.id} className="flex items-center p-2 hover:bg-gray-100">
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    if (value.includes(option.id)) {
                      onChange((value as string[]).filter((item) => item !== option.id));
                    } else {
                      onChange([...value, option.id]);
                    }
                  }}
                >
                  {value.includes(option.id) ? (
                    <FaCheckSquare className="text-indigo-500" />
                  ) : (
                    <FaSquare className="text-gray-400" />
                  )}
                </span>
                <span className="ml-2">{option.label}</span>
              </div>
            ))}
          </div>
          {error && <span className="mt-2 text-sm text-red-600">{error.message}</span>}
        </div>
      )}
    />
  );
}
