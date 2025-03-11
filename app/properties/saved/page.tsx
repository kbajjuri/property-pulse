import PropertyCard from '@/app/components/PropertyCard';
import User from '@/app/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

const SavedPropertiesPage = async () => {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    throw new Error('You must be logged in to view saved properties');
  }

  const { userId } = sessionUser;

  const { bookmarks } = await User.findById(userId).populate('bookmarks');

  return (
    <section className='px-4 py-6'>
      <div className='container lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Saved Properties</h1>
        {bookmarks.length === 0 ? (
          <h1 className='text-center text-2xl font-bold mt-10'>
            You have no saved properties
          </h1>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
