import React, { FC } from 'react';

interface SelectProps {
  name: string;
  onChange(): void;
  onBlur(): void;
  value: string;
  className?: string;
  isInvalid: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

const Select: FC<SelectProps> = ({ className, label, isInvalid, error, options, ...props }) => {
  return (
    <div className={[className, 'w-full flex flex-col gap-y-2'].join(' ')}>
      {label && <label className="px-4 text-sm font-bold">{label}</label>}
      <select {...props} className="w-full px-4 py-2 rounded-full bg-slate-50">
        {options.map(({ value, label }) => (
          <option key={value} value={value} className="capitalize">
            {label}
          </option>
        ))}
      </select>
      {isInvalid && <p className="px-4 text-xs font-bold text-red-500">{error}</p>}
    </div>
  );
};

export default Select;
