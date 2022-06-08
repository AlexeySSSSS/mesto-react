import React, { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, onMessage }) => {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const handleInformationChange = (event) => {
        setDescription(event.target.value);
    };

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateUser({
            name: name,
            info: description
        });
    };

    return (
        <PopupWithForm
            name="edit_profile"
            title="Редактировать профиль"
            buttonText={onMessage ? "Сохранение..." : "Сохранить"}
            form="form"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="edit-name"
                className="popup__input popup__input_edit_name"
                type="text"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
                value={name || ''}
                onChange={handleNameChange}
            />
            <span className="edit-name-error popup__input-error"></span>
            <input
                id="edit-job"
                className="popup__input popup__input_edit_job"
                type="text"
                name="info"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
                value={description || ''}
                onChange={handleInformationChange}
            />
            <span className="edit-job-error popup__input-error"></span>
        </PopupWithForm>
    );
};

export default EditProfilePopup;