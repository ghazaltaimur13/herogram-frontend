import React, { Suspense } from 'react';
import Loading from '../Loading';

const withLoading = (Component, Fallback = Loading) => {
  return (props) => {
    return (
      <Suspense fallback={<Fallback />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export default withLoading;
