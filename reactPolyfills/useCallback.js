import { useEffect, useState } from 'react';

export const useMyCallback = (cb, dep) => {
  const [instance, setInstance] = useState(null);

  function outer() {
    return function(...args) {
        cb(...args);
    }
  }

  useEffect(() => {
    const v = outer();
    setInstance(v);
  }, dep);

  return instance;
};
