import { useField } from 'formik';
import React, { FC } from 'react';

interface StarsProps {
  name: string;
}

const Stars: FC<StarsProps> = ({ name }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta, helpers] = useField(name);

  return (
    <div>
      <label className="px-4 text-sm font-bold">Choose a rating</label>
      <div className="flex gap-2 mt-2">
        <i
          className={[
            'bx text-primary cursor-pointer text-2xl',
            field.value >= 1 ? 'bxs-star' : 'bx-star'
          ].join(' ')}
          onClick={() => helpers.setValue(1)}
        />
        <i
          className={[
            'bx text-primary cursor-pointer text-2xl',
            field.value >= 2 ? 'bxs-star' : 'bx-star'
          ].join(' ')}
          onClick={() => helpers.setValue(2)}
        />
        <i
          className={[
            'bx text-primary cursor-pointer text-2xl',
            field.value >= 3 ? 'bxs-star' : 'bx-star'
          ].join(' ')}
          onClick={() => helpers.setValue(3)}
        />
        <i
          className={[
            'bx text-primary cursor-pointer text-2xl',
            field.value >= 4 ? 'bxs-star' : 'bx-star'
          ].join(' ')}
          onClick={() => helpers.setValue(4)}
        />
        <i
          className={[
            'bx text-primary cursor-pointer text-2xl',
            field.value >= 5 ? 'bxs-star' : 'bx-star'
          ].join(' ')}
          onClick={() => helpers.setValue(5)}
        />
      </div>
    </div>
  );
};

export default Stars;
