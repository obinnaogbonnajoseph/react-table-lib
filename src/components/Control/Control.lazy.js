import React, { lazy, Suspense } from 'react';

const LazyControl = lazy(() => import('./Control'));

const Control = props => (
  <Suspense fallback={null}>
    <LazyControl {...props} />
  </Suspense>
);

export default Control;
