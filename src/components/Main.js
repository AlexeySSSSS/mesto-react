import React from "react";
import api from "../utils/Api";
import Card from "./Card";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) => {
    const [userName, setUserName] = React.useState("");
    const [userDescription, setUserDescription] = React.useState("");
    const [userAvatar, setUserAvatar] = React.useState("");
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api
            .uploadUserInformation()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    React.useEffect(() => {
        api
            .createInitialCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    return (
        <main className="main">
            <section className="profile">
                <button className="profile__avatar-new" title="Обновить аватар" onClick={onEditAvatar}><img className="profile__avatar"
                    src={userAvatar} alt="Аватар" /></button>
                <div className="profile__profile-info">
                    <div className="profile__block">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit-button" title="Редактировать профиль" onClick={onEditProfile}></button>
                    </div>
                    <h2 className="profile__description">{userDescription}</h2>
                </div>
                <button className="profile__add-button" title="Создать новое изображение" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                {cards.map((card) => {
                    return (
                        <Card key={card._id} card={card} onCardClick={onCardClick} />
                    );
                })}
            </section>
        </main>
    );
};

export default Main;