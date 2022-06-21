import React, { FC } from 'react';

interface ErrorHandlerProps {
  message: string;
}

const ErrorHandler: FC<ErrorHandlerProps> = ({ message }) => {
  return (
    <div className="search">
      <h1 className="text-3xl font-bold text-red-500">Oops, something went wrong</h1>
      <p>{message}</p>
    </div>
  );
};

export default ErrorHandler;
