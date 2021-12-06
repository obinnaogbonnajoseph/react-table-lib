import React, { lazy, Suspense } from 'react';

const LazyTableDemo = lazy(() => import('./TableDemo'));

const TableDemo = props => (
  <Suspense fallback={null}>
    <LazyTableDemo {...props} />
  </Suspense>
);

export default TableDemo;
