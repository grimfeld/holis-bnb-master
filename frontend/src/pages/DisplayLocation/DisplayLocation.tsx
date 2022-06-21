import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Location from '../../types/Location';

import { useParams } from 'react-router-dom';
import eventBus from '../../utils/EventBus';
import Category from '../../types/Category';
import ErrorHandler from '../../components/ErrorHandler';

type DisplayLocationPageProps = {};

const DisplayLocationPage: React.FC<DisplayLocationPageProps> = () => {
  const { locationId } = useParams();

  const [location, setLocation] = useState<Location>();
  const [category, setCategory] = useState<Category>();

  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>('');

  const getLocation = async () => {
    const res = await fetch(`http://localhost:8000/locations/${locationId}`);
    return await res.json();
  };

  const getCategory = async (id: number) => {
    const res = await fetch(`http://localhost:8000/categories/${id}`);
    return await res.json();
  };

  useEffect(() => {
    try {
      getLocation().then((data: Location) => setLocation(data));
      eventBus.on('location_data_update', () => [
        getLocation().then((data: Location) => setLocation(data))
      ]);
      return () => {
        eventBus.remove('location_data_update', () => {
          getLocation().then((data: Location) => setLocation(data));
        });
      };
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError('Something went wrong');
    }
  }, [locationId]);

  useEffect(() => {
    if (location) {
      getCategory(location.categoryId).then((data: Category) => setCategory(data));
    }
  }, [location]);

  // Create a function to handle price change and persist it to database

  const handlePriceChange = async () => {
    try {
      await fetch(`http://localhost:8000/locations/${locationId}/price`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price: price })
      });
      // if (res.status === 200) return alert('Price updated');
      eventBus.dispatch('location_data_update');
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError('Something went wrong');
    }
  };

  // Create a function to delete the location and persist it to database

  const handleLocationDeletion = async () => {
    try {
      const res = await fetch(`http://localhost:8000/locations/${locationId}`, {
        method: 'DELETE'
      });
      return await res.json();
    } catch (error) {
      if (error instanceof Error) setError(error.message);
      else setError('Something went wrong');
    }
  };

  if (error) {
    return (
      <>
        <ErrorHandler message={error} />
      </>
    );
  }

  if (!location) return <>Loading...</>;

  return (
    <div className="text-gray-600">
      <img
        src={location.picture}
        alt={location.title}
        className="object-cover w-full max-h-[500px]"
      />
      <div className="flex gap-16 px-32 py-16 m-auto">
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between">
            <h1 className="text-4xl font-bold">{location.title}</h1>
            <p>
              <span className="font-bold">€ {location.price} </span>night
            </p>
          </div>
          <p>
            <span className="capitalize">{category?.name}</span>
            <i className="bx bxs-circle text-[7px] mx-4"></i>
            {location.numberOfRooms} room
            {location.numberOfRooms > 1 ? 's' : ''}
          </p>
          <p>{location.description}</p>
        </div>
        <div className="flex flex-col p-4 border border-gray-400 rounded-xl gap-y-4">
          <h2>Modify price</h2>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            className="px-4 py-2 rounded-full shadow-sm shadow-gray-400"
          />
          <div className="flex justify-between gap-x-2">
            <button
              type="button"
              onClick={handleLocationDeletion}
              className="w-full px-4 py-2 border rounded-full border-primary text-primary">
              Delete
            </button>
            <button
              type="button"
              onClick={handlePriceChange}
              className="w-full px-4 py-2 text-white rounded-full bg-primary">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayLocationPage;
