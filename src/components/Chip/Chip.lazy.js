import React, { lazy, Suspense } from 'react';

const LazyChip = lazy(() => import('./Chip'));

const Chip = props => (
  <Suspense fallback={null}>
    <LazyChip {...props} />
  </Suspense>
);

export default Chip;
