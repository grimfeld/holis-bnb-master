import React, { useEffect, useState } from 'react';
import Category from '../../types/Category';
import Location from '../../types/Location';
import LocationCard from '../../components/LocationCard';
import './Search.css';
import eventBus from '../../utils/EventBus';
import { useNavigate } from 'react-router-dom';
import ErrorHandler from '../../components/ErrorHandler';
import Button from '../../components/Form/Button';

type SearchPageProps = {};

const SearchPage: React.FC<SearchPageProps> = () => {
  const navigate = useNavigate();

  // Create a function to fetch all locations from database

  const [pending, setPending] = useState(true);
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string>('');
  const [query, setQuery] = useState<string>('');

  const getLocations = async (): Promise<Location[]> => {
    const res = await fetch(`http://localhost:8000/locations`);
    return await res.json();
  };

  const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(`http://localhost:8000/categories`);
    return await res.json();
  };

  useEffect(() => {
    Promise.all([getLocations(), getCategories()])
      .then(([locations, categories]) => {
        setLocations(locations);
        setCategories(categories);
        eventBus.on('search_input_changed', (query: string) => setQuery(query));
        setPending(false);
      })
      .catch((err) => {
        if (err instanceof Error) setError(err.message);
        else setError('Something went wrong');
      });
  }, []);

  // Create a function to sort locations by categories & by number of rooms

  // Did it directly in the JSX, found it more straightforward

  // Bonus: Create a search function linked to the search input in the header

  useEffect(() => {
    if (query) {
      getLocations().then((locations: Location[]) => {
        const filteredLocations = locations.filter((location: Location) => {
          return location.title.toLowerCase().includes(query.toLowerCase());
        });
        setLocations(filteredLocations);
      });
    } else {
      getLocations().then((data: Location[]) => setLocations(data));
    }
  }, [query]);

  if (error) {
    return (
      <>
        <ErrorHandler message={error} />
      </>
    );
  }

  if (pending) return <div className="search">Loading...</div>;

  return (
    /* List of sorted locations card */
    <div className="search">
      <div className="flex justify-end">
        <Button className="my-4 " onClick={() => navigate('/locations/create')}>
          Create a new location
        </Button>
      </div>
      {categories.map((category: Category) => (
        <div
          key={category.id}
          // Removing the empty categories from the results using display none
          className={[
            locations.filter((location: Location) => location.categoryId === category.id).length ===
            0
              ? 'hidden'
              : '',
            'mb-20'
          ].join(' ')}>
          <h2 className="text-4xl font-bold capitalize">{category.name}</h2>
          <div className="w-full h-px my-6 bg-gray-300" />
          <div className="flex flex-col gap-y-8">
            {/* Creating an array containing only once the different number of rooms from the list of locations in the category */}
            {Array.from(
              new Set(
                locations
                  .filter((location: Location) => location.categoryId === category.id)
                  .map((location: Location) => location.numberOfRooms)
                  .sort((a, b) => a - b)
              )
            ).map((numberOfRooms: number) => (
              <div
                key={numberOfRooms}
                className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                <div>
                  <h3 className="text-2xl font-bold">
                    {numberOfRooms} room{numberOfRooms > 1 ? 's' : ''}
                  </h3>
                </div>
                {/* Adding a new location card for each location with the correct number of rooms */}
                {locations
                  .filter((location: Location) => location.categoryId === category.id)
                  .filter((location: Location) => location.numberOfRooms === numberOfRooms)
                  .map((location: Location) => (
                    <LocationCard
                      key={location.id}
                      {...location}
                      onClick={() => navigate(`/locations/${location.id}`)}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
