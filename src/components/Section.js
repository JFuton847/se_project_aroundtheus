class Section {
    constructor ({items, renderer}, containerSelector){
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    }

    // Public method to render all items
    renderItems () {
        this._items.forEach (item =>{
            this._renderer(item);
        });
    }

    // Public method to add a single item to the container
    addItem(element) {
        this._container.append(element);
    }
}

    const renderer = (item) => {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.textContent = item.name;
        Section.addItem(cardElement);
    }

    // Sample data array
    const items = [
        {name: "Card 1"},
        {name: "Card 2"},
        {name: "Card 3"}
    ];

    // Instantiate the Section Class
    const section = new Section ({items, renderer} ".cards-container");

    // Render all items when the page loads
    section.renderItems();