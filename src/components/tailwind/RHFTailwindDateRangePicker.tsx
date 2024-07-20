import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import 'tailwindcss/tailwind.css';
import moment from 'moment';
import { useState } from 'react';

type Props<T extends FieldValues> = {
  name: Path<T>;
};

export function RHFTailwindDateRangePicker<T extends FieldValues>({ name }: Props<T>) {
  const { control } = useFormContext<T>();
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(null);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => (
        <div className="flex flex-col">
          <DateRangePicker
            startDate={value ? moment(value[0]) : null} // Moment date
            startDateId="your_unique_start_date_id"
            endDate={value ? moment(value[1]) : null} // Moment date
            endDateId="your_unique_end_date_id"
            onDatesChange={({ startDate, endDate }) => onChange([startDate, endDate])}
            focusedInput={focusedInput}
            onFocusChange={(input) => setFocusedInput(input)}
            numberOfMonths={1}
            showClearDates
            displayFormat="YYYY-MM-DD"
          />
        </div>
      )}
    />
  );
}
