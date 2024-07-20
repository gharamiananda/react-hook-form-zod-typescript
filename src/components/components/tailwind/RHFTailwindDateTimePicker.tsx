import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import clsx from 'clsx';

type Props<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

export function RHFDateTailwindTimePicker<T extends FieldValues>({ name, label }: Props<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, ...restField }, fieldState: { error } }) => (
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
          <Datetime
            {...restField}
            value={value ? moment(value) : null}
            onChange={(date) => onChange(moment(date).format())}
            inputProps={{
              className: clsx(
                'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                { 'border-red-500 text-red-600': error }
              )
            }}
          />
          {error && <span className="mt-2 text-sm text-red-600">{error.message}</span>}
        </div>
      )}
    />
  );
}
