export default class Section {
  constructor({ renderer }, container) {
    this._container = container;
    this._renderer = renderer;
  }

  renderItems(items) {
    this._items = items;
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
