function intersection(arr1, arr2) {
  return arr1.filter((x) => arr2.includes(x));
}

const isEqualSet = (set1) => (set2) => {
  if (set1.size !== set2.size) return false;
  return [...set1].every((value) => set2.has(value));
};

const isEqualArray = (arr1) => (arr2) => {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((value) => arr2.includes(value));
};

const findEquivalentSets = (sets) => {
  if (!sets || sets.length < 2) return [];
  let unusedSets = [...sets];
  let equivalentSets = [];
  while (unusedSets.length) {
    const matchSet = unusedSets[0];
    matchedSets = unusedSets.filter((set) => isEqualSet(set)(matchSet));
    if (matchedSets.length > 1) equivalentSets.push(matchedSets);
    unusedSets = unusedSets.filter((set) => !matchedSets.includes(set));
  }
  return equivalentSets;
};

const findEquivalentArrays = (arrs) => {
  if (!arrs || arrs.length < 2) return [];
  let unusedArrs = [...arrs];
  let equivalentArrs = [];
  while (unusedArrs.length) {
    const matchArr = unusedArrs[0];
    const matchedArrs = unusedArrs.filter((arr) => isEqualArray(arr)(matchArr));
    if (matchedArrs.length > 1) equivalentArrs.push(matchedArrs);
    unusedArrs = unusedArrs.filter((arr) => !matchedArrs.includes(arr));
  }
  return equivalentArrs;
};

const findEquivalentArraysInObjects = (objs, key) => {
  if (!objs || objs.length < 2) return [];
  let unusedObjs = [...objs];
  let equivalentObjs = [];
  while (unusedObjs.length) {
    const matchObj = unusedObjs[0];
    const matchedObjs = unusedObjs.filter((obj) =>
      isEqualArray(obj[key])(matchObj[key])
    );
    if (matchedObjs.length > 1) equivalentObjs.push(matchedObjs);
    unusedObjs = unusedObjs.filter((obj) => !matchedObjs.includes(obj));
  }
  return equivalentObjs;
};

module.exports = {
  intersection,
  isEqualSet,
  findEquivalentSets,
  isEqualArray,
  findEquivalentArrays,
  findEquivalentArraysInObjects,
};
