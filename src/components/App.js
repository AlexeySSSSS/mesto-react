import React from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
    };

    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const closeAllPopups = () => {
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    };

    return (
        <div className="page">
            <Header />
            <Main
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
            />
            <Footer />
            <PopupWithForm name="avatar_image" title="Обновить аватар" buttonText="Сохранить" form="avatar" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
                <input id="avatar-image" className="popup__input popup__input_avatar_job" type="url" name="link"
                    placeholder="Ссылка на картинку" required />
                <span className="avatar-image-error popup__input-error"></span>
            </PopupWithForm>
            <PopupWithForm name="edit_profile" title="Редактировать профиль" buttonText="Сохранить" form="form" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
                <input id="edit-name" className="popup__input popup__input_edit_name" type="text" name="name"
                    placeholder="Имя" minLength="2" maxLength="40" required />
                <span className="edit-name-error popup__input-error"></span>
                <input id="edit-job" className="popup__input popup__input_edit_job" type="text" name="info"
                    placeholder="О себе" minLength="2" maxLength="200" required />
                <span className="edit-job-error popup__input-error"></span>
            </PopupWithForm>
            <PopupWithForm name="image_card" title="Новое место" buttonText="Создать" form="image" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
                <input id="image-name" className="popup__input popup__input_image_name" type="text" name="text"
                    placeholder="Название" minLength="2" maxLength="30" required />
                <span className="image-name-error popup__input-error"></span>
                <input id="image-job" className="popup__input popup__input_image_job" type="url" name="url"
                    placeholder="Ссылка на картинку" required />
                <span className="image-job-error popup__input-error"></span>
            </PopupWithForm>
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
    );
}

export default App;