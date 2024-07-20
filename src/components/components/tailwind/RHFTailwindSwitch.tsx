import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
}

export function RHFTailwindSwitch<T extends FieldValues>({ name, label }: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={field.value}
            onChange={field.onChange}
            className="toggle-checkbox hidden"
            id={name}
          />
          <label
            htmlFor={name}
            className="toggle-label block w-10 h-6 rounded-full bg-gray-300 cursor-pointer"
          />
          <span className="ml-2 text-sm font-medium text-gray-700">{label}</span>
        </div>
      )}
    />
  );
}
