import React, { lazy, Suspense } from 'react';

const LazyTableHead = lazy(() => import('./TableHead'));

const TableHead = props => (
  <Suspense fallback={null}>
    <LazyTableHead {...props} />
  </Suspense>
);

export default TableHead;
