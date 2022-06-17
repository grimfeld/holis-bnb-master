import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Location from '../../types/Location';

import { useParams } from 'react-router-dom';
import eventBus from '../../utils/EventBus';
import Category from '../../types/Category';

type DisplayLocationPageProps = {};

const DisplayLocationPage: React.FC<DisplayLocationPageProps> = () => {
  const { locationId } = useParams();

  const [location, setLocation] = useState<Location>();
  const [category, setCategory] = useState<Category>();

  const [price, setPrice] = useState<number>(0);

  const getLocation = async () => {
    const res = await fetch(`http://localhost:8000/locations/${locationId}`);
    return await res.json();
  };

  const getCategory = async (id: number) => {
    const res = await fetch(`http://localhost:8000/categories/${id}`);
    return await res.json();
  };

  useEffect(() => {
    getLocation().then((data: Location) => setLocation(data));

    eventBus.on('location_data_update', () => [
      getLocation().then((data: Location) => setLocation(data))
    ]);
    return () => {
      eventBus.remove('location_data_update', () => {
        getLocation().then((data: Location) => setLocation(data));
      });
    };
  }, [locationId]);

  useEffect(() => {
    if (location) {
      getCategory(location.categoryId).then((data: Category) => setCategory(data));
    }
  }, [location]);

  if (!location) return <>Loading...</>;

  // Create a function to handle price change and persist it to database

  const handlePriceChange = async () => {
    await fetch(`http://localhost:8000/locations/${locationId}/price`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ price: price })
    });
    // if (res.status === 200) return alert('Price updated');
    eventBus.dispatch('location_data_update');
  };

  // Create a function to delete the location and persist it to database

  // const handleLocationDeletion = async () => {
  //   const res = await fetch(`http://localhost:8000/locations/${locationId}`, {
  //     method: 'DELETE'
  //   });
  //   return await res.json();
  // };

  return (
    <div className="text-gray-600">
      <img
        src={location.picture}
        alt={location.title}
        className="object-cover w-full max-h-[500px]"
      />
      <div className="flex gap-16 py-16 px-32 m-auto">
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
        <div className="border border-gray-400 p-4 rounded-xl flex flex-col gap-y-4">
          <h2>Modify price</h2>
          <input
            type="number"
            onChange={(e) => setPrice(e.target.valueAsNumber)}
            className="py-2 px-4 rounded-full shadow-sm shadow-gray-400"
          />
          <div className="flex justify-between gap-x-2">
            <button
              type="button"
              className="w-full border py-2 px-4 rounded-full border-primary text-primary">
              Delete
            </button>
            <button
              type="button"
              onClick={handlePriceChange}
              className="w-full py-2 px-4 rounded-full bg-primary text-white">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayLocationPage;
