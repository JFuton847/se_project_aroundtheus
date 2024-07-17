export default class Profile {
    constructor({ name, title }) {
        this._name = name;
        this._title = title;

        _profileNameInput = document.querySelector("#profile-name-input");
        _profileTitleInput = document.querySelector("#profile-title-input");
        _profileName = document.querySelector(".profile__name");
        _profileTitle = document.querySelector(".profile__title");
        _profileEditModal = document.querySelector("#profile-edit-modal");
    }

    handleEdit() {
        _profileNameInput.value = _profileName.textContent;
        _profileTitleInput.value = _profileTitle.textContent;
    }

    handleEditSubmit() {
        profileName.textContent = profileNameInput.value;
        profileTitle.textContent = profileTitleInput.value;
    }
}