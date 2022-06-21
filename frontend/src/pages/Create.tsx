import React, { FC, useEffect, useState } from 'react';
import { Formik, Form, Field, FormikProps } from 'formik';
import * as yup from 'yup';
import Button from '../components/Form/Button';
import Input from '../components/Form/Input';
import Stars from '../components/Form/Stars';
import Select from '../components/Form/Select';
import Category from '../types/Category';

interface CreatePageProps {}

interface CreateLocationDto {
  title: string;
  description: string;
  location: string;
  picture: string;
  price: number;
  categoryName: string;
  stars: 1 | 2 | 3 | 4 | 5;
  numberOfRooms: number;
}

const CreatePage: FC<CreatePageProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = async (): Promise<Category[]> => {
    const res = await fetch(`http://localhost:8000/categories`);
    return await res.json();
  };

  useEffect(() => {
    getCategories().then((categories: Category[]) => {
      setCategories(categories);
    });
  }, []);

  const initialValues: CreateLocationDto = {
    title: '',
    description: '',
    location: '',
    picture: 'https://cdn.pixabay.com/photo/2017/04/10/22/28/residence-2219972_1280.jpg',
    price: 0,
    categoryName: '',
    stars: 1,
    numberOfRooms: 0
  };

  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    location: yup.string().required('Location is required'),
    picture: yup.string().required('Picture is required'),
    price: yup.number().required('Price is required'),
    categoryName: yup.string().required('Category is required'),
    stars: yup.number().required('Stars is required'),
    numberOfRooms: yup.number().required('Number of rooms is required')
  });

  const handleSubmit = async (values: CreateLocationDto) => {
    try {
      const res = await fetch(`http://localhost:8000/locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      if (res.status === 200) return alert('Location created');
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      else alert('Something went wrong');
    }
  };

  return (
    <div className="p-16">
      <h1 className="mb-16 text-3xl font-bold">Create a new location</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        {({ errors, touched }: FormikProps<CreateLocationDto>) => (
          <Form>
            <div className="flex flex-col gap-y-8">
              <Field
                name="title"
                type="text"
                label="Title"
                as={Input}
                isInvalid={touched.title && errors.title}
                error={errors.title}
              />
              <Field
                name="description"
                type="text"
                label="Description"
                as={Input}
                isInvalid={touched.description && errors.description}
                error={errors.description}
              />
              <Field
                name="location"
                type="text"
                label="Location"
                as={Input}
                isInvalid={touched.location && errors.location}
                error={errors.location}
              />
              <Field
                name="price"
                type="number"
                label="Price"
                as={Input}
                isInvalid={touched.price && errors.price}
                error={errors.price}
              />
              <Field
                name="numberOfRooms"
                type="number"
                label="Number of rooms"
                as={Input}
                isInvalid={touched.numberOfRooms && errors.numberOfRooms}
                error={errors.numberOfRooms}
              />
              <Stars name="stars" />
              <Field
                name="categoryName"
                as={Select}
                options={categories.map((cat) => {
                  return {
                    value: cat.name,
                    label: cat.name
                  };
                })}
                label="Choose a category"
              />
              <Field
                name="categoryName"
                type="text"
                label="Or create a new one"
                as={Input}
                isInvalid={touched.categoryName && errors.categoryName}
                error={errors.categoryName}
              />

              <Button type="submit">Submit</Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreatePage;
