import React, { lazy, Suspense } from 'react';

const LazyTableBody = lazy(() => import('./TableBody'));

const TableBody = props => (
  <Suspense fallback={null}>
    <LazyTableBody {...props} />
  </Suspense>
);

export default TableBody;
