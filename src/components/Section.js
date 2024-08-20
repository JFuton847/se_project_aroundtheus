class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  // Public method to render all items
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Public method to add a single item to the container
  addItem(element) {
    this._container.prepend(element);
  }
}

export default Section;
