class HashMap {
  constructor() {
    this.map = new Map();
  }

  set(key, value) {
    let stringifiedKey = JSON.stringify(key);
    this.map.set(stringifiedKey, value);
  }

  get(key) {
    let stringifiedKey = JSON.stringify(key);
    return this.map.get(stringifiedKey);
  }

  has(key) {
    let stringifiedKey = JSON.stringify(key);
    return this.map.has(stringifiedKey);
  }

  delete(key) {
    let stringifiedKey = JSON.stringify(key);
    return this.map.delete(stringifiedKey);
  }

  clear() {
    this.map.clear();
  }

  size() {
    return this.map.size;
  }

  forEach(callback) {
    this.map.forEach((value, key) => {
      let parsedKey = JSON.parse(key);
      callback(value, parsedKey);
    });
  }
}

const G2 = new HashMap();



G2.set([1, 2], [[0, 3], [7, 9]]);
G2.set([1, 4], [[3, 9]]);
G2.set([1, 5], [[1, 3], [5, 9]]);
G2.set([2, 4], [[0, 9]]);
G2.set([2, 5], [[3, 9]]);
G2.set([2, 6], [[0, 3], [5, 7]]);
G2.set([4, 5], [[3, 9]]);
G2.set([4, 6], [[0, 6]])


// G2.forEach((item, key) =>{
//   console.log(key)
// })
module.exports = { G2, HashMap }
