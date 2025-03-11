'use server';
import cloudinary from '../config/cloudinary';
import Property from '../models/Property';
import connectDB from '../config/database';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';

async function deleteProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('Unauthorized');
  }

  const { userId } = sessionUser;

  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error('Property not found');
  }

  if (property.owner.toString() !== userId.toString()) {
    throw new Error('Unauthorized');
  }

  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split('/');
    return parts.at(-1).split('.').at(0);
  });

  if (publicIds.length > 0) {
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy('indproperties/' + publicId);
    }
  }
  await property.deleteOne();

  revalidatePath('/', 'layout');
}

export default deleteProperty;
