const { expect } = require("@jest/globals");
const { GMap, filter } = require("./Map");
describe("GMap", () => {
  test("should set a key-value pair", () => {
    const map = new GMap(new Map());
    expect(map.set([1, 2], 3));
  });

  test("should return false if key does not exist", () => {
    const map = new GMap(new Map());
    expect(map.has([1, 2])).toBeFalsy();
  });
  test("should return true if key exists", () => {
    const map = new GMap(new Map());
    map.set([1, 2], 3);
    expect(map.has([1, 2])).toBeTruthy();
  });

  test("should return value for a given key", () => {
    const map = new GMap(new Map());
    map.set([1, 2], 3);
    expect(map.get([1, 2])).toBe(3);
  });

  test("should filter key-value pairs voor callbackFn", () => {
    const map = new GMap(new Map());
    map.set([1, 2], 3);
    map.set([1, 3], 2);
    const callbackFn = (val) => val === 3;
    const filteredMap = filter(map)(callbackFn);
    expect(filteredMap.has([1, 2])).toBeTruthy();
    expect(filteredMap.has([1, 3])).toBeFalsy();
  });

  test("should return the correct size of the map", () => {
    const map = new GMap(new Map());
    map.set([1, 2], 3);
    map.set([1, 3], 2);
    expect(map.size).toBe(2);
  });
});
