'use server';

import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '../config/database';
import User from '../models/User';
import { revalidatePath } from 'next/cache';

async function bookmarkProperty(propertyId: string) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You must be logged in to bookmark a property');
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);
  let isBookmarked = user.bookmarks.includes(propertyId);
  let message;
  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = 'Bookmark removed';
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = 'Bookmark added';
    isBookmarked = true;
  }
  await user.save();
  revalidatePath('/properties/saved', 'page');

  return { message, isBookmarked };
}

export default bookmarkProperty;
