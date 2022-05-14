/**
 * Array Flattern
 */
const arr = [1, [2, 3, [4, 5, 6], 7, 8], 9, 10];

const flattern = (arr, res = [], level) => {
  return arr.reduce((acc, current) => {
    if (Array.isArray(current)) {
      return flattern(current, acc);
    } else {
      return acc.concat(current);
    }
  }, res);
};

console.log(flattern(arr));

/**
 * Object Flattern
 */

const obj = {
  name: {
    fName: "Sawan",
    lName: "Nirala",
    father: {
      fName: "Ram",
      mName: "Chandra",
      lName: "Prasad",
    },
  },
  age: 25,
};

const flattern = (obj, res = {}, parentKey) => {
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && !Array.isArray(value)) {
      flattern(value, res, parentKey ? `${parentKey}.${key}` : key);
    } else {
      res[`${parentKey ? `${parentKey}.${key}` : key}`] = value;
    }
  }
  return res;
};

console.log(flattern(obj));
