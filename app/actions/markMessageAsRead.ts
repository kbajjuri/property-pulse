'use server';
import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '../config/database';
import User from '../models/User';
import Message from '../models/Message';
import { revalidatePath } from 'next/cache';

async function markMessageAsRead(messageId: string) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You must be logged in to mark a message as read');
  }
  const { userId } = sessionUser;

  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error('Message not found');
  }
  if (message.recipient.toString() !== userId) {
    throw new Error('You are not authorized to mark this message as read');
  }
  message.read = !message.read;
  revalidatePath('/messages', 'page');
  await message.save();
  return message.read;
}

export default markMessageAsRead;
