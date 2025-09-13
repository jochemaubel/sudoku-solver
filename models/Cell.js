class Cell {
  constructor(
    row,
    col,
    value = 0,
    maxValue = 9,
    options = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ) {
    this.row = row;
    this.col = col;
    this.value = value;
    this.maxValue = maxValue;
    this.options = value ? [] : options;
    if (!this.isValid) throw new Error("Not a valid value for this cell");
  }

  setValue(val) {
    if (this.value) {
      throw new Error("Cell already set");
    }
    if (!this.options.includes(val)) {
      throw new Error("Not a valid option for this cell");
    }
    this.value = val;
    this.options = [];
  }

  setOptions(options) {
    if (!this.value) this.options = options;
  }

  reset(options = [1, 2, 3, 4, 5, 6, 7, 8, 9]) {
    this.value = 0;
    this.setOptions(options);
  }

  removeOption(value) {
    const options = this.options.filter((option) => option !== value);
    this.setOptions(options);
  }

  get isValid() {
    return this.value >= 0 && this.value <= this.maxValue;
  }
}

module.exports = Cell;
