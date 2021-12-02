import React, { lazy, Suspense } from 'react';

const LazyMore = lazy(() => import('./More'));

const More = props => (
  <Suspense fallback={null}>
    <LazyMore {...props} />
  </Suspense>
);

export default More;
