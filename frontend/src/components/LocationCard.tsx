import React from 'react';
import Location from '../types/Location';

interface LocationCardProps extends Location {
  className?: string;
  onClick?: () => void;
}

const LocationCard: React.FC<LocationCardProps> = ({
  title,
  description,
  picture,
  price,
  className,
  onClick
}) => {
  return (
    <div className={['text-gray-600 cursor-pointer', className].join(' ')} onClick={onClick}>
      <img src={picture} alt={title} className="aspect-square w-full rounded-xl object-cover" />
      <div className="mt-3">
        <h4 className="font-bold">{title}</h4>
        <p className="truncate">{description}</p>
        <p>
          <span className="font-bold">€ {price} </span>night
        </p>
      </div>
    </div>
  );
};

export default LocationCard;
