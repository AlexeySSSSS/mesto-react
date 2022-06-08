import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, onMessage }) => {
    const [text, setText] = useState('');
    const [url, setUrl] = useState('');

    const handleImageChange = (event) => {
        setUrl(event.target.value);
    };

    const handleInformationChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onAddPlace({
            text: text,
            url: url
        });
    };

    return (
        <PopupWithForm
            name="image_card"
            title="Новое место"
            buttonText={onMessage ? "Сохранение..." : "Создать"}
            form="image"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="image-name"
                className="popup__input popup__input_image_name"
                type="text"
                name="text"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                onChange={handleInformationChange}
            />
            <span className="image-name-error popup__input-error"></span>
            <input id="image-job"
                className="popup__input popup__input_image_job"
                type="url"
                name="url"
                placeholder="Ссылка на картинку"
                required
                onChange={handleImageChange}
            />
            <span className="image-job-error popup__input-error"></span>
        </PopupWithForm>
    );
};

export default AddPlacePopup;