import React, { FC, PropsWithChildren } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  className?: string;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={[className, 'bg-primary text-white px-8 py-2 rounded-full font-bold'].join(' ')}>
      {children}
    </button>
  );
};

export default Button;
