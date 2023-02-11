function timesOfIntersection(intervals) {
  const n = intervals.length
  let result = intervals[0];
  for (let i = 1; i < n; i++) {
    let current = [];
    for (let j = 0; j < intervals[i].length; j++) {
      for (let k = 0; k < result.length; k++) {
        let [start, end] = result[k];
        let [t1, t2] = intervals[i][j];
        if (t2 >= start && end >= t1) {
          current.push([Math.max(start, t1), Math.min(end, t2)]);
        }
      }
    }
    result = Array.from(new Set(current.map(JSON.stringify)), JSON.parse);
  }
  return result;
}

module.exports = {timesOfIntersection}
// console.log(timesOfIntersection([[[0, 3], [7, 9]], [[3, 9]], [[0, 9]]]))
// The time complexity of the current code is O(n^3) where n is the number of items. It can be improved to O(n^2) by breaking out of the innermost loop (for each interval of the second item) as soon as we find an intersection. This can be done by sorting the intervals in the second item and using binary search to find the intersecting interval, but this will require O(nlogn) time to sort the intervals.