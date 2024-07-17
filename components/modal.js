export default class Modal {
    constructor(selector) {
        this.modal = document.querySelector(selector);


        // onClick
        this.modal.addEventListener("click", (event) => {
            if (event.target.classList.contains("modal__close-button")) {
                this.close();
            }
        });

        // onMouseDown
        modalDiv.addEventListener("mousedown", (event) => {
            if (event.target.classList.contains("modal")) {
              this.close();
            }
        });

        // onKeydown
        document.addEventListener('keydown', (evt) => {
            if (evt.key === "Escape") {
                this.close();
            }
        });
    }

    open() {
        this._modal.classList.add("modal_opened");
    }

    close() {
        this._modal.classList.remove("modal_opened");
    }
}