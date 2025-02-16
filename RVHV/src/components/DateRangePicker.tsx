// components/DateRangePicker.tsx
import React from 'react';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onStartDateChange: (date: Date) => void;
  onEndDateChange: (date: Date) => void;
}

export function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) {
  return (
    <div className="flex space-x-4">
      <input
        type="date"
        value={startDate.toISOString().slice(0, 10)}
        onChange={(e) => onStartDateChange(new Date(e.target.value))}
        className="p-2 border rounded"
      />
      <span>to</span>
      <input
        type="date"
        value={endDate.toISOString().slice(0, 10)}
        onChange={(e) => onEndDateChange(new Date(e.target.value))}
        className="p-2 border rounded"
      />
    </div>
  );
}
