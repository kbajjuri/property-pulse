'use server';

import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '@/app/config/database';
import User from '@/app/models/User';

async function checkBookmarkStatus(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You must be logged in to bookmark a property');
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);
  let isBookmarked = user.bookmarks.includes(propertyId);
  return { isBookmarked };
}
export default checkBookmarkStatus;
