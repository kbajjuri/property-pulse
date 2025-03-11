'use server';
import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '../config/database';
import Message from '../models/Message';

async function getUnreadMessageCount() {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You must be logged in to mark a message as read');
  }
  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });
  return { count };
}

export default getUnreadMessageCount;
