const timesOfIntersection = (intervals, n) => {
  let result = [];
  for (let i = 0; i < intervals[0].length; i++) {
    let [start, end] = intervals[0][i];
    let intersected = true;
    for (let j = 1; j < n; j++) {
      let found = false;
      const currentIntervals = intervals[j];
      for (let k = 0; k < currentIntervals.length; k++) {
        const [t1, t2] = currentIntervals[k];
        if (t2 >= start && end >= t1) {
          found = true;
          start = Math.max(start, t1);
          end = Math.min(end, t2);
          break;
        }
      }
      if (!found) {
        intersected = false;
        break;
      }
    }
    if (intersected) {
      result.push([start, end]);
    }
  }
  return result;
};

// module.exports = {timesOfIntersection}
console.log(timesOfIntersection([[[0, 9]], [[0, 3], [7, 9]], [[3,9]]], 3))
// The time complexity of the current code is O(n^3) where n is the number of items. It can be improved to O(n^2) by breaking out of the innermost loop (for each interval of the second item) as soon as we find an intersection. This can be done by sorting the intervals in the second item and using binary search to find the intersecting interval, but this will require O(nlogn) time to sort the intervals.