import React, { ComponentType, Suspense } from 'react';
import { PreloaderForApp } from '../components/Preloader/Preloader';

export function withSuspense<T>(Component: ComponentType<T>) {
  return (props: T) => {
    return (
      <Suspense fallback={<PreloaderForApp />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
