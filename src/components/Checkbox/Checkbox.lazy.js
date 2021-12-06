import React, { lazy, Suspense } from 'react';

const LazyCheckbox = lazy(() => import('./Checkbox'));

const Checkbox = props => (
  <Suspense fallback={null}>
    <LazyCheckbox {...props} />
  </Suspense>
);

export default Checkbox;
