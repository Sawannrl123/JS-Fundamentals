class ElementCollection extends Array {
  constructor(props) {
    super(props);
    this.promise = Promise.resolve();
  }

  ready(cb) {
    const isReady = this.some(e => e.readyState !== null && e.readyState !== 'loading');
    if(isReady) {
      console.log("ready");
      cb()
    } else {
      document.addEventListener('DOMContentLoaded', cb);
    }
  }

  delay(ms) {
    this.promise = new Promise((resolve, _) => {
      setTimeout(resolve, ms);
    });
    return this;
  }

  addClass(classToAdd) {
    this.promise.then(() => {
      this.forEach(elem => elem.classList.add(classToAdd));
    });
    return this;
  }

  removeClass(classToremove) {
    this.promise.then(() => {
      this.forEach(elem => elem.classList.remove(classToremove));
    });
    return this;
  }
}

function $(params) {
  if (typeof params === 'string' || params instanceof String) {
    return new ElementCollection(...document.querySelectorAll(params));
  } else {
    return new ElementCollection(params);
  }
}

class AjaxPromise {
  constructor(promise) {
    this.promise = promise
  }

  done(cb) {
    this.promise = this.promise.then(data => {
      cb(data);
      return data;
    })
    return this;
  }

  fail(cb) {
    this.promise = this.promise.catch(cb)
    return this;
  }

  always(cb) {
    this.promise = this.promise.finally(cb)
    return this;
  }
}

$.get = function({ url, data = {}, success = () => {}, dataType }) {
  const queryString = Object.entries(data).map(([key, value]) => `${key}=${value}`).join('&');
  return new AjaxPromise(
    fetch(`${url}?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': dataType
      }
    })
    .then(res => {
      if(res.ok) 
        return res.json()
      else 
        throw new Error(res.status);
    })
    .then(data => {
      success(data);
      return data;
    })
  );
}


$(document).ready(function(){
  $('.red').delay(2000).removeClass('red').addClass('blue').delay(5000).removeClass('blue').addClass('green');
  $('.green').removeClass('green').addClass('red');

  $.get({
    url: 'https://jsonplaceholder.typicode.com/todos/1',
    success: data => {
      console.log("First Success ", data)
    }
  })
  .done(data => {
    console.log("Second Success", data)
  })
  .done(data => {
    console.log("Third Success", data)
  })
  .fail(err => {
    console.log(err)
  })
  .always(() => {
    console.log('Always');
  })
});

