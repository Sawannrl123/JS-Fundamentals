import React from "react";

export function memo(Component) {
  let cache = {};
  return function (props) {
    let propsString = JSON.stringify(props);

    // console.log('cache', cache);
    if (propsString in cache) {
      console.log("From cache");
      return cache[propsString];
    } else {
      const result = <Component {...props} />;
      cache[propsString] = result;
      return result;
    }
  };
}

export default memo;
