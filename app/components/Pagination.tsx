'use client';
import Link from 'next/link';
import React, { useEffect } from 'react';

interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  pageSize,
  totalItems,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  const [disablePrev, setDisablePrev] = React.useState(false);
  const [disableNext, setDisableNext] = React.useState(false);
  useEffect(() => {
    setDisablePrev(page === 1);
    setDisableNext(page === totalPages);
  }, [page, totalPages]);
  if (totalPages === 1) {
    return null;
  }

  return (
    <section className='container mx-auto flex justify-center items-center my-8'>
      {disablePrev ? (
        <span className='mr-2 px-2 py-1 border border-gray-300 rounded text-gray-500 cursor-not-allowed'>
          Previous
        </span>
      ) : (
        <Link
          href={`/properties?page=${page - 1}`}
          className='mr-2 px-2 py-1 border border-gray-300 rounded'
        >
          Previous
        </Link>
      )}
      <span className='mx-2'>
        Page {page} of {totalPages}
      </span>
      {disableNext ? (
        <span className='ml-2 px-2 py-1 border border-gray-300 rounded text-gray-500 cursor-not-allowed'>
          Next
        </span>
      ) : (
        <Link
          href={`/properties?page=${page + 1}`}
          className='ml-2 px-2 py-1 border border-gray-300 rounded'
        >
          Next
        </Link>
      )}
    </section>
  );
};

export default Pagination;
