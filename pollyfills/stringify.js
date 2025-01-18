/**
 * JSON.stringify Polyfill
 */
if (!JSON.stringify) {
  JSON.stringify = function (value) {
    // Helper function to handle escaping of strings
    function escapeString(str) {
      return str.replace(/[\\"\u0000-\u001F\u2028\u2029]/g, function (char) {
        switch (char) {
          case '"':
            return '\\"';
          case "\\":
            return "\\\\";
          case "\b":
            return "\\b";
          case "\f":
            return "\\f";
          case "\n":
            return "\\n";
          case "\r":
            return "\\r";
          case "\t":
            return "\\t";
          default:
            return "\\u" + char.charCodeAt(0).toString(16).padStart(4, "0");
        }
      });
    }

    // Recursive serialization function
    function serialize(value) {
      if (value === null) {
        return "null";
      }
      if (typeof value === "boolean" || typeof value === "number") {
        return String(value);
      }
      if (typeof value === "string") {
        return '"' + escapeString(value) + '"';
      }
      if (Array.isArray(value)) {
        const elements = value.map((item) => serialize(item) || "null");
        return "[" + elements.join(",") + "]";
      }
      if (typeof value === "object") {
        const keys = Object.keys(value);
        const properties = keys
          .map((key) => {
            const serializedValue = serialize(value[key]);
            if (serializedValue !== undefined) {
              return '"' + escapeString(key) + '":' + serializedValue;
            }
          })
          .filter(Boolean);
        return "{" + properties.join(",") + "}";
      }
    }

    return serialize(value);
  };
}

/**
 * Example
 */
const test1 = "sawan";
const test2 = 123;
const test3 = false;
const test4 = ["sawan", 123];
const test5 = {
  fname: "sawan",
  age: 25,
  lname: "kumar",
  fullname: function () {
    return this.fname + this.lname;
  },
  test: { fn: "test1", f2: "test2" },
};
const test6 = function () {
  console.log("test6");
};
const test7 = {
  foo: "foo",
};

test7.bar = test7;

console.log(stringyfyFn(test5));
