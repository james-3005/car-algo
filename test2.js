const {HashMap} = require("./test");

const Data = new HashMap();
Data.set([1, 0], {x: 1, y: 0})
Data.set([1, 1], {x: 2, y: 0})
Data.set([1, 2], {x: 3, y: 0})
Data.set([1, 3], {x: 4, y: 0})
Data.set([1, 4], {x: 4, y: 0})

Data.set([2, 0], {x: 1, y: 0})
Data.set([2, 1], {x: 2, y: 0})
Data.set([2, 2], {x: 6, y: 0})
Data.set([2, 3], {x: 6, y: 0})
Data.set([2, 4], {x: 6, y: 0})

Data.set([3, 0], {x: 1, y: 0})
Data.set([3, 1], {x: 2, y: 0})
Data.set([3, 2], {x: 6, y: 0})
Data.set([3, 3], {x: 6, y: 0})
Data.set([3, 4], {x: 6, y: 0})

module.exports = {
  Data
}