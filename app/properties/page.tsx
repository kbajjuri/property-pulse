import Pagination from '../components/Pagination';
import PropertyCard from '../components/PropertyCard';
import connectDB from '../config/database';
import Property from '../models/Property';

const PropertiesPage = async ({
  searchParams: { page = '1', pageSize = '9' },
}) => {
  await connectDB();
  const skip = (parseInt(page) - 1) * parseInt(pageSize);

  const total = await Property.countDocuments({});
  const properties = await Property.find({})
    .skip(skip)
    .limit(parseInt(pageSize));

  return (
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        {properties.length === 0 ? (
          <p>No Properies found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Pagination
          page={parseInt(page)}
          pageSize={parseInt(pageSize)}
          totalItems={total}
        />
      </div>
    </section>
  );
};

export default PropertiesPage;
