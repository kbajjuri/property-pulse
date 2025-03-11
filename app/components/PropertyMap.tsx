'use client';

import { useEffect, useState } from 'react';
import { fromAddress, setDefaults, OutputFormat } from 'react-geocode';
import Spinner from './Spinner';
import pin from '@/assets/images/pin.svg';
import Image from 'next/image';
import Map, { Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const PropertyMap = ({ property }) => {
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 13,
    width: '100%',
    height: '500px',
  });
  const [loading, setLoading] = useState(true);
  const [geocodeError, setGeocodeError] = useState(false);

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
    language: 'en',
    region: 'us',
    outputFormat: OutputFormat.JSON,
  });

  useEffect(() => {
    const fetchCoords = async () => {
      try {
        const res = await fromAddress(
          `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipcode}`
        );

        //Check geocode results
        if (res.results.length === 0) {
          setGeocodeError(true);
          return;
        }
        const { lat, lng } = res.results[0].geometry.location;
        setLat(lat);
        setLng(lng);
        setViewport({ ...viewport, latitude: lat, longitude: lng });
      } catch (error) {
        console.log(error);
        setGeocodeError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, []);

  if (loading) return <Spinner />;
  if (geocodeError) return <h3 className='text-xl'>No location map</h3>;
  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: lng ?? viewport.longitude,
          latitude: lat ?? viewport.latitude,
          zoom: 15,
        }}
        style={{ width: '100%', height: 500 }}
        mapStyle='mapbox://styles/mapbox/streets-v11'
      >
        {lng !== null && lat !== null && (
          <Marker longitude={lng} latitude={lat} anchor='bottom'>
            <Image src={pin} alt='location' width={40} height={40} />
          </Marker>
        )}
      </Map>
    )
  );
};

export default PropertyMap;
