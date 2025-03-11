'use client';
import { useSession } from 'next-auth/react';
import { FaBookmark } from 'react-icons/fa';
import { toast } from 'react-toastify';
import bookmarkProperty from '../actions/bookmarkProperty';
import { useEffect, useState } from 'react';
import checkBookmarkStatus from '@/app/actions/checkBookmarkStatus';

const BookmarkButton = ({ property }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    checkBookmarkStatus(property._id).then((res) => {
      if (res.isBookmarked) setIsBookmarked(res.isBookmarked);
      setLoading(false);
    });
  }, [property._id, userId, checkBookmarkStatus]);

  const handlePress = async () => {
    if (!userId) {
      toast.error('You must be logged in to bookmark a property');
      return;
    }
    bookmarkProperty(property._id).then((res) => {
      if (!res.isBookmarked)
        return toast.error('Failed to bookmark the property');
      setIsBookmarked(res.isBookmarked);
      toast.success(res.message);
    });
  };
  if (loading) {
    return <p className='text-center'>Loading...</p>;
  }
  return isBookmarked ? (
    <button
      className='bg-red-500 hover:bg-red-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
      onClick={handlePress}
    >
      <FaBookmark className='fas fa-bookmark mr-2'></FaBookmark> Remove Bookmark
    </button>
  ) : (
    <button
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center'
      onClick={handlePress}
    >
      <FaBookmark className='fas fa-bookmark mr-2'></FaBookmark> Bookmark
      Property
    </button>
  );
};

export default BookmarkButton;
