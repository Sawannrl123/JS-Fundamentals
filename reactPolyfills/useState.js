import { useReducer, useCallback, useMemo } from 'react';

export const useMyState = (_state) => {
  // FORCE RERENDER
  const [, rerender] = useReducer(() => ({}));
  const forceUpdate = useCallback(() => rerender({}), []);

  // INITIALIZE STATE AS A MEMOIZED PROXY
  const { proxy, set } = useMemo(() => {
    const target = {
      state: _state,
    };
    // Place a trap on setter, to trigger a component rerender
    const handler = {
      set(target, prop, value) {
        console.log('SETTING', target, prop, value);
        target[prop] = value;
        forceUpdate();
        return true;
      },
    };

    const proxy = new Proxy(target, handler);

    const set = (d) => {
      const value = typeof d === 'function' ? d(proxy.state) : d;
      if (value !== proxy.state) proxy.state = value;
    };

    return { proxy, set };
  }, []);

  return [proxy.state, set];
};
