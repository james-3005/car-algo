const G2 = new Map();

G2.set([1, 2].join('+'), [[0, 3], [7, 9]]);
G2.set([1, 4].join('+'), [[3, 9]]);
G2.set([1, 5].join('+'), [[1, 3], [5, 9]]);
G2.set([2, 4].join('+'), [[0, 9]]);
G2.set([2, 5].join('+'), [[3, 9]]);
G2.set([2, 6].join('+'), [[0, 3], [5, 7]]);
G2.set([4, 5].join('+'), [[3, 9]]);
G2.set([4, 6].join('+'), [[0, 6]])

// G2.forEach((item, key) =>{
//   console.log(key)
// })
module.exports = { G2 }
