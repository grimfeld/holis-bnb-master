import React, { FC } from 'react';

const Input: FC<{
  name: string;
  onChange(): void;
  onBlur(): void;
  value: string;
  type: string;
  className?: string;
  isInvalid: boolean;
  placeholder?: string;
  label?: string;
  error?: string;
}> = ({ className, label, ...props }) => {
  return (
    <div className={[className, 'flex flex-col gap-y-2'].join(' ')}>
      {label && <label className="px-4 text-sm font-bold">{label}</label>}
      <input {...props} className="w-full px-4 py-2 rounded-full bg-slate-50" />
      {props.isInvalid && <p className="px-4 text-xs font-bold text-red-500">{props.error}</p>}
    </div>
  );
};

export default Input;
