'use server';
import connectDB from '../config/database';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import Message from '../models/Message';

async function deleteMessage(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('Unauthorized');
  }

  const { userId } = sessionUser;

  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error('Message not found');
  }

  if (message.recipient.toString() !== userId.toString()) {
    throw new Error('Unauthorized');
  }

  await message.deleteOne();

  revalidatePath('/', 'layout');
}

export default deleteMessage;
