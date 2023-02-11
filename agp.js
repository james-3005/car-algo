const {Data} = require("./test2");
const {HashMap} = require("./test");
const {VG_GROWTH} = require("./vggrowth");
const time = [0, 1, 2, 3, 4];

function AGP(Data, max_dis, min_dur, min_wei) {
  const G = new HashMap();
  const G1 = getG1(Data)
  const C2 = generateC2Candidate(G1);
  const CK = new HashMap()
  const CW = new HashMap()
  for (let i = 0; i < time.length; i++) {
    const currentTime = time[i]
    for (let candidate of C2) {
      const isCloseDistance = isClose(candidate, currentTime, max_dis, Data)
      if (isCloseDistance && i !== time.length - 1) {
        CK.set(candidate, !CK.get(candidate) ? 1 : CK.get(candidate) + 1)
        if (time[i + 1] - currentTime !== 1)
          calcTimeDurAndWei(CK, CW, candidate, currentTime, min_dur)
      } else {
        if (isCloseDistance) {
          CK.set(candidate, !CK.get(candidate) ? 1 : CK.get(candidate) + 1)
        }
        const isForceCalc = i === time.length - 1
        calcTimeDurAndWei(CK, CW, candidate, currentTime, min_dur, isForceCalc)
      }

    }
  }
  const wei = min_wei * time.length
  for (let i = 0; i < C2.length; i++) {
    const C2_Data = CW.get(C2[i])
    if (C2_Data.wei >= wei)
      G.set(C2[i], C2_Data.duration)
  }
  return G;
}

function calcTimeDurAndWei(CK, CW, candidate, time, min_dur, isForceCalc) {
  const currentDuration = CK.get(candidate)
  if (currentDuration >= min_dur) {
    const currentWeight = CW.get(candidate)
    const timeDuration = isForceCalc ? [time - currentDuration + 1, time] : [time - currentDuration, time - 1]
    CW.set(candidate, !currentWeight ? {
      duration: [timeDuration],
      wei: currentDuration
    } : {duration: [...currentWeight.duration, timeDuration], wei: currentWeight.wei + currentDuration})
  }
  CK.set(candidate, 0)
}

function getG1(Data) {
  const G = new Set();
  Data.forEach((_, [u]) => {
    G.add(u);
  })
  return G;
}

function generateC2Candidate(set) {
  const arrayOfArrays = [];
  const setArray = [...set];
  for (let i = 0; i < setArray.length; i++) {
    for (let j = i + 1; j < setArray.length; j++) {
      arrayOfArrays.push([setArray[i], setArray[j]]);
    }
  }
  return arrayOfArrays
}

function euclideanDistance(p1, p2) {
  // console.log(p1, p2)
  const {x: x1, y: y1} = p1;
  const {x: x2, y: y2} = p2;
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function isClose(pair, t, max_dis, Data) {
  const [u1, u2] = pair;
  return euclideanDistance(Data.get([u1, t]), Data.get([u2, t])) <= max_dis
}

const VG2 = AGP(Data, 2, 2, 0.5)
const G = new Set()
const min_dur = 2;
const min_wei = 0.5;
const total_time = 5;
VG_GROWTH(VG2, null, G)
console.log(G)