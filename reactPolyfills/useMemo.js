import { useCallback, useEffect, useState } from 'react';

export const useMyMemo = (cb, dep) => {
  const [value, setValue] = useState(null);

  const instance = useCallback(cb, dep);

  useEffect(() => {
    const v = instance();
    setValue(v)
  }, dep);

  return value;
};
