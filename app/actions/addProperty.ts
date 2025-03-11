'use server';

import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '../config/database';
import Property from '../models/Property';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import cloudinary from '../config/cloudinary';

async function addProperty(formData: FormData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You must be logged in to add a property');
  }
  const { userId } = sessionUser;

  //access all values from ameneties
  let amenities = formData.getAll('amenities');

  const images = formData.getAll('images').filter((image) => image !== '');
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

  const impageUrls = [];
  for (const imageFile of images) {
    const imageBuffer = await imageFile.arrayBuffer();
    const imageBufferArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageBufferArray);

    const imageBase64 = imageData.toString('base64');
    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${imageBase64}`,
      { folder: 'indproperties' }
    );
    impageUrls.push(result.secure_url);
  }

  propertyData.images = impageUrls;

  const newProperty = new Property(propertyData);
  await newProperty.save();

  revalidatePath('/', 'layout');

  redirect(`/properties/${newProperty._id}`);
}

export default addProperty;
