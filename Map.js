class GMap {
  constructor(map) {
    this.map = map;
  }

  _setKey(arr) {
    return arr.join("&");
  }

  _getKey(key) {
    key.split("&").map(Number);
  }

  set(arr, val) {
    this.map.set(this._setKey(arr), val);
  }

  has(arr) {
    return this.map.has(this._setKey(arr));
  }

  get(arr) {
    return this.map.get(this._setKey(arr));
  }

  get size() {
    return this.map.size;
  }
}

const filter = (map) => (callbackFn) => {
  const filteredMap = new GMap(new Map());
  map.map.forEach((value, key) => {
    if (callbackFn(value)) {
      filteredMap.map.set(key, value);
    }
  });
  return filteredMap;
};

module.exports = { GMap, filter };
