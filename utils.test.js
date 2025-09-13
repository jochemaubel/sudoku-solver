const { expect } = require("@jest/globals");
const {
  intersection,
  isEqualSet,
  findEquivalentSets,
  isEqualArray,
  findEquivalentArrays,
} = require("./utils");

test("should return correct intersection", () => {
  const set1 = [1, 2, 3];
  const set2 = [2, 3, 5];
  expect(intersection(set1, set2)).toEqual([2, 3]);
});

describe("is equal set", () => {
  test("should return true if sets have different size", () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([1, 2, 3, 4]);
    expect(isEqualSet(set1)(set2)).toBeFalsy();
  });
  test("should return false if sets are not equal", () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([2, 3, 5]);
    expect(isEqualSet(set1)(set2)).toBeFalsy();
  });
  test("should return true if sets are equal", () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([2, 3, 1]);
    expect(isEqualSet(set1)(set2)).toBeTruthy();
  });
});
describe("is equal array", () => {
  test("should return true if sets have different size", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [1, 2, 3, 4];
    expect(isEqualArray(arr1)(arr2)).toBeFalsy();
  });
  test("should return false if sets are not equal", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 5];
    expect(isEqualArray(arr1)(arr2)).toBeFalsy();
  });
  test("should return true if sets are equal", () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 1];
    expect(isEqualArray(arr1)(arr2)).toBeTruthy();
  });
});

describe("findEquivalentSets", () => {
  test("should return null if there are less than two sets", () => {
    expect(findEquivalentSets()).toEqual([]);
    expect(findEquivalentSets([])).toEqual([]);
    const set1 = new Set([1, 2, 3]);
    expect(findEquivalentSets([set1])).toEqual([]);
  });

  test("should return null if there are no equivalent sets", () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([2, 3, 5]);
    expect(findEquivalentSets([set1, set2])).toEqual([]);
  });

  test("should return 2 sets that are equivalent", () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([2, 3, 1]);
    expect(findEquivalentSets([set1, set2])).toEqual([[set1, set2]]);
  });

  test("should return 3 sets that are equivalent", () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([2, 3, 1]);
    const set3 = new Set([3, 1, 2]);
    expect(findEquivalentSets([set1, set2, set3])).toEqual([
      [set1, set2, set3],
    ]);
  });
  test("should return 2 sets that are equivalent", () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([2, 3, 1]);
    const set3 = new Set([2, 3, 5]);
    expect(findEquivalentSets([set1, set3, set2])).toEqual([[set1, set2]]);
  });
  test("should return multiple sets that are equivalent", () => {
    const set1 = new Set([1, 2, 3]);
    const set2 = new Set([2, 5, 9]);
    const set3 = new Set([1, 3, 2]);
    const set4 = new Set([2, 9, 5]);
    expect(findEquivalentSets([set1, set2, set3, set4])).toEqual([
      [set1, set3],
      [set2, set4],
    ]);
  });

  describe("findEquivalentArrays", () => {
    test("should return null if there are less than two arrs", () => {
      expect(findEquivalentArrays()).toEqual([]);
      expect(findEquivalentArrays([])).toEqual([]);
      const arr1 = [1, 2, 3];
      expect(findEquivalentArrays([arr1])).toEqual([]);
    });

    test("should return null if there are no equivalent arrs", () => {
      const arr1 = [1, 2, 3];
      const arr2 = [2, 3, 5];
      expect(findEquivalentArrays([arr1, arr2])).toEqual([]);
    });

    test("should return 2 arrs that are equivalent", () => {
      const arr1 = [1, 2, 3];
      const arr2 = [2, 3, 1];
      expect(findEquivalentArrays([arr1, arr2])).toEqual([[arr1, arr2]]);
    });

    test("should return 3 arrs that are equivalent", () => {
      const arr1 = [1, 2, 3];
      const arr2 = [2, 3, 1];
      const arr3 = [3, 1, 2];
      expect(findEquivalentArrays([arr1, arr2, arr3])).toEqual([
        [arr1, arr2, arr3],
      ]);
    });
    test("should return 2 arrs that are equivalent", () => {
      const arr1 = [1, 2, 3];
      const arr2 = [2, 3, 1];
      const arr3 = [2, 3, 5];
      expect(findEquivalentArrays([arr1, arr3, arr2])).toEqual([[arr1, arr2]]);
    });
    test("should return multiple arrs that are equivalent", () => {
      const arr1 = [1, 2, 3];
      const arr2 = [2, 5, 9];
      const arr3 = [1, 3, 2];
      const arr4 = [2, 9, 5];
      expect(findEquivalentArrays([arr1, arr2, arr3, arr4])).toEqual([
        [arr1, arr3],
        [arr2, arr4],
      ]);
    });
  });
});
