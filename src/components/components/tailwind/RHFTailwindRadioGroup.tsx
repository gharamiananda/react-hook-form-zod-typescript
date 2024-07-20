import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

type Option = {
  id: string;
  label: string;
};

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

export function RHFTailwindRadioGroup<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700">{label}</label>
          <div className="mt-1">
            {options?.map((option) => (
              <label key={option.id} className="flex items-center p-2 hover:bg-gray-100">
                <input
                  type="radio"
                  value={option.id}
                  checked={field.value === option.id}
                  onChange={field.onChange}
                  className="form-radio text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-2">{option.label}</span>
              </label>
            ))}
          </div>
          {error && <span className="mt-2 text-sm text-red-600">{error.message}</span>}
        </div>
      )}
    />
  );
}
