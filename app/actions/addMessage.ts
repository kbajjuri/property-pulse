'use server';

import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '../config/database';
import Message from '../models/Message';

async function addMessage(previousState, formData: FormData) {
  await connectDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('You must be logged in to add a property');
  }
  const { userId } = sessionUser;
  const recipient = formData.get('recipient');

  if (userId === recipient) {
    return { error: 'You cannot send a message to yourself' };
  }

  const newMessage = new Message({
    sender: userId,
    recipient,
    property: formData.get('property'),
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    body: formData.get('body'),
  });

  await newMessage.save();
  return { submitted: true };
}

export default addMessage;
