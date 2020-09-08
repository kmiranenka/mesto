export default class Section {

    constructor({
        items,
        renderer
    }, containerSelector) {
        this._initialArray = items;
        this._renderer = renderer; // renderer — это функция

        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedItems.forEach(item => this._renderer(item));
    }

    addItem(element) {
        this._container.append(element);
    }
}
