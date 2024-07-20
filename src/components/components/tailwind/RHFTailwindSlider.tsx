import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  min?: number;
  max?: number;
  step?: number;
}

export function RHFTailwindSlider<T extends FieldValues>({ name, label, min = 0, max = 100, step = 1 }: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-2">{label}</label>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={field.value}
            onChange={field.onChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="mt-1 text-sm text-gray-600">{field.value}</div>
        </div>
      )}
    />
  );
}
