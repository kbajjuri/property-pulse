import PropertyCard from '@/app/components/PropertyCard';
import PropertySearchForm from '@/app/components/PropertySearchForm';
import connectDB from '@/app/config/database';
import Property from '@/app/models/Property';
import { convertToSerializeableObject } from '@/utils/convertToObject';
import Link from 'next/link';
import { FaArrowAltCircleLeft } from 'react-icons/fa';

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}) => {
  await connectDB();
  const locationPattern = new RegExp(location, 'i');
  let query = {
    $or: [
      { name: locationPattern },
      { description: locationPattern },
      { 'location.street': locationPattern },
      { 'location.city': locationPattern },
      { 'location:state': locationPattern },
      { 'location.zipcode': locationPattern },
    ],
  };
  if (propertyType && propertyType !== 'All') {
    const propertyTypePattern = new RegExp(propertyType, 'i');
    query.type = propertyTypePattern;
  }

  const propertiesQueryResults = await Property.find(query).lean();
  const properties = convertToSerializeableObject(propertiesQueryResults);

  return (
    <>
      <section className='bg-blue-700 py-4'>
        <div className='max-w-7xl mx-auto px-4 flex-col items-start sm:px-6 lg:px-8'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowAltCircleLeft className='fas fa-arrow-left mr-2'></FaArrowAltCircleLeft>{' '}
            Back to Properties
          </Link>
          <h1 className='text-2xl mb-4'>Search Results</h1>
          {properties.length === 0 ? (
            <p>No search results</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
