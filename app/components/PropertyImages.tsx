'use client';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';

const PropertyImages = ({ images }) => {
  return (
    <Gallery id='property-gallery'>
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            {images.length === 1 ? (
              <Item
                id='property-gallery'
                original={images[0]}
                thumbnail={images[0]}
                width='1000'
                height='600'
              >
                {({ ref, open }) => (
                  <Image
                    src={images[0]}
                    alt=''
                    ref={ref}
                    className='object-cover h-[400px] mx-auto rounded-xl'
                    width={1800}
                    height={400}
                    priority={true}
                    onClick={open}
                  />
                )}
              </Item>
            ) : (
              <div className='grid grid-cols-2 gap-4'>
                {images.map((image, index) => (
                  <div key={index} className='w-full col-span-1'>
                    <Item
                      id={index}
                      original={image}
                      thumbnail={image}
                      width='1000'
                      height='600'
                    >
                      {({ ref, open }) => (
                        <Image
                          src={image}
                          alt=''
                          ref={ref}
                          className='object-cover h-[400px] w-full rounded-xl'
                          width={1800}
                          height={400}
                          priority={true}
                          onClick={open}
                        />
                      )}
                    </Item>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </Gallery>
  );
};

export default PropertyImages;
