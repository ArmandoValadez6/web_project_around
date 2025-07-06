export default class Section {
  constructor({ item, renderer }, containerSelector) {
    this._item = item;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(item) {
    this._container.append(item);
  }

  renderer() {
    this._renderer;
  }
}
