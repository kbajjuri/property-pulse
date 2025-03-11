import Image from 'next/image';

interface PropertyHeaderImageProps {
  image: string;
}

const PropertyHeaderImage: React.FC<PropertyHeaderImageProps> = ({ image }) => {
  return (
    <section>
      <div className='container-xl m-auto'>
        <div className='grid grid-cols-1'>
          <Image
            src={image}
            alt=''
            className='object-cover h-[400px] w-full'
            width='1800'
            height='800'
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
