// input: D, max-dis, min-dur,  min-wei
// output: G
function vg_growth(data, eps, min_samples) {
  const n_samples = data.length;
  const labels = new Array(n_samples).fill(-1);
  let current_cluster_id = 0;

  for (let i = 0; i < n_samples; i++) {
      if (labels[i] !== -1) continue;

      const sample = data[i];
      const neighbors = [];
      for (let j = 0; j < n_samples; j++) {
          if (i === j) continue;
          const distance = euclidean_distance(sample, data[j]);
          if (distance <= eps) neighbors.push(j);
      }

      if (neighbors.length >= min_samples) {
          labels[i] = current_cluster_id;
          for (const neighbor of neighbors) {
              if (labels[neighbor] === -1) labels[neighbor] = current_cluster_id;
          }
          current_cluster_id++;
      }
  }

  return labels;
}

function euclidean_distance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
      sum += (a[i] - b[i]) ** 2;
  }
  return Math.sqrt(sum);
}

const data = [
  [1, 2],
  [2, 3],
  [3, 4],
  [10, 11],
  [11, 12],
  [12, 13],
];

const eps = 4;
const min_samples = 2;

const labels = vg_growth(data, eps, min_samples);

console.log(labels);