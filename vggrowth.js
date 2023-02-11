const {G2, HashMap} = require('./test')
const {timesOfIntersection} = require("./intersection");
const G = new Set();
const min_dur = 3;
const min_wei = 0.5;
const total_time = 10;
function VG_GROWTH(Graph, H, G) {
  const list_u = getListU(Graph)
  //line 1
  for (let i = 0; i <= list_u.length; i++) {
    const u = list_u[i];
    //line 2
    let H_ = new Set();
    H_.add(u)
    if (H) H_.add([...H])
    // line 3
    const VH_ = getPrefixNeighbor(Graph, u)
    //line 4
    if (VH_.length) {
      //line 5
      for (let v = 0; v < VH_.length; v++) {
        //line 6,7
        obtainValidGroup(G, H_, VH_[v])
      }
      //line 8
      let EVH_ = getDirectiveEdge(VH_, Graph)
      const VGH_ = new HashMap()
      if (EVH_.length) {
        //line 10
        for (let i = 0; i < EVH_.length; i++) {
          const singleDirectEdge = EVH_[i]
          const s = timesOfIntersection([Graph.get(singleDirectEdge), Graph.get([singleDirectEdge[0], u]), Graph.get([singleDirectEdge[1], u])])
          const validateS = isValidMinDurMinWei(s, min_dur, min_wei, total_time)
          if (!validateS) {
            EVH_[i] = -1;
          } else {
            VGH_.set(EVH_[i], validateS)
          }
        }
        //line 13
        EVH_ = EVH_.filter(item => item !== -1)
        //line-14
        if (EVH_.length) {
          //@todo line 15
          VG_GROWTH(VGH_, H_, G)
        }
      }
    }
  }
}


// tested
function getPrefixNeighbor(Graph, u) {
  const set = [];
  Graph.forEach((_, key) => {
    if (key[1] === u)
      set.push(key)
  })
  return set;
}

function obtainValidGroup(G, H_, v) {
  const newSet = [...new Set([...H_, ...v])].sort().join(',')
  G.add(newSet)
}

function getDirectiveEdge(VH_, G2) {
  const setPrefix = VH_.map(key => key[0])
  const setDirectiveEdge = [];
  G2.forEach((_, key) => {
    if (new Set([...setPrefix, ...key]).size === setPrefix.length)
      setDirectiveEdge.push(key)
  })
  return setDirectiveEdge
}

function isValidMinDurMinWei(s, min_dur, min_wei, totalTime = 10) {
  let sumTime = 0
  const filteredMinDur = s.filter((item) => {
    if (item[1] - item[0] + 1 >= min_dur) {
      sumTime += item[1] - item[0] + 1;
      return true
    }
  })
  if (sumTime / totalTime >= min_wei) return filteredMinDur;
  return false;
}

function getListU(Graph) {
  const listU = new Set();
  Graph.forEach((_, key) => {
    const [u1, u2] = key;
    listU.add(u1);
    listU.add(u2);
  });
  return Array.from(listU);
}

// console.log(G)

module.exports = {
  VG_GROWTH
}