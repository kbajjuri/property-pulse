'use server';

import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '../config/database';
import Property from '../models/Property';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function updateProperty(propertyId: string, formData: FormData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You must be logged in to add a property');
  }
  const { userId } = sessionUser;

  const existingProperty = await Property.findById(propertyId);
  if (existingProperty.owner.toString() !== userId) {
    throw new Error('Current user does not won this property');
  }
  let amenities = formData.getAll('amenities');
  const propertyData = {
    owner: userId,
    type: formData.get('type'),
    name: formData.get('name'),
    description: formData.get('description'),
    location: {
      street: formData.get('location.street'),
      city: formData.get('location.city'),
      state: formData.get('location.state'),
      zipcode: formData.get('location.zipcode'),
    },
    beds: formData.get('beds'),
    baths: formData.get('baths'),
    square_feet: formData.get('square_feet'),
    amenities,
    rates: {
      nightly: formData.get('rates.nightly'),
      weekly: formData.get('rates.weekly'),
      monthly: formData.get('rates.monthly'),
    },
    seller_info: {
      name: formData.get('seller_info.name'),
      phone: formData.get('seller_info.phone'),
      email: formData.get('seller_info.email'),
    },
  };

  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    propertyData
  );
  revalidatePath('/', 'layout');
  redirect(`/properties/${updatedProperty._id}`);
}

export default updateProperty;
