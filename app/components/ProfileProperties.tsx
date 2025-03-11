'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import deleteProperty from '../actions/deleteProperty';
import { toast } from 'react-toastify';

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);

  const handleDeleteProperty = async (propertyId) => {
    const confirmation = window.confirm(
      'Are you sure you want to delete this property?'
    );
    if (!confirmation) {
      return;
    }

    await deleteProperty(propertyId);
    const updatedProperties = properties.filter(
      (property) => property._id !== propertyId
    );
    setProperties(updatedProperties);

    toast.success('Property deleted successfully');
  };

  return properties.map((property) => (
    <div className='mb-10' key={property._id}>
      <Link href={`/properties/${property._id}`}>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={property.images[0]}
          width={400}
          height={200}
          alt='Property 1'
        />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{property.name}</p>
        <p className='text-gray-600'>
          Address: {property.location.street} {property.location.city}{' '}
          {property.location.state} {property.location.zipcode}
        </p>
      </div>
      <div className='mt-2'>
        <Link
          href={`/properties/${property._id}/edit`}
          className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
        >
          Edit
        </Link>
        <button
          className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
          type='button'
          onClick={() => handleDeleteProperty(property._id)}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
