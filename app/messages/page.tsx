import { getSessionUser } from '@/utils/getSessionUser';
import connectDB from '../config/database';
import Message from '../models/Message';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import MessageCard from '../components/MessageCard';

const MessagesPage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return <div>No user session found</div>;
  }
  const { userId } = sessionUser;

  const readMessages = await Message.find({ recipient: userId, read: true })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();
  const unreadMessages = await Message.find({
    recipient: userId,
    read: false,
  })
    .sort({ createdAt: -1 })
    .populate('sender', 'username')
    .populate('property', 'name')
    .lean();

  const messages = [...unreadMessages, ...readMessages].map((messageDoc) => {
    const message = convertToSerializeableObject(messageDoc);
    message.sender = convertToSerializeableObject(messageDoc.sender);
    message.property = convertToSerializeableObject(messageDoc.property);

    return message;
  });

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto py-24 max-w-6xl'>
        <div className='bg-white px-6 py8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <h1 className='text-3xl font-bold mb-4'>Your Messages</h1>
          <div className='space-y-4'>
            {messages.length === 0 ? (
              <p>You have no messages</p>
            ) : (
              messages.map((message) => (
                <h5 key={message._id} className='text-xl font-bold'>
                  <MessageCard message={message} />
                </h5>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagesPage;
