'use client';
import { ClipLoader } from 'react-spinners';
const LoadingPage = () => {
  const override = {
    display: 'block',
    margin: '100px, auto',
  };
  return (
    <ClipLoader
      color='#3B82F6'
      cssOverride={override}
      size={150}
      aria-label='Loading Spinner'
    />
  );
};

export default LoadingPage;
