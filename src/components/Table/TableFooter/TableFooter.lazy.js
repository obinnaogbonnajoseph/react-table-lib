import React, { lazy, Suspense } from 'react';

const LazyTableFooter = lazy(() => import('./TableFooter'));

const TableFooter = props => (
  <Suspense fallback={null}>
    <LazyTableFooter {...props} />
  </Suspense>
);

export default TableFooter;
