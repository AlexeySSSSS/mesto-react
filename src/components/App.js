import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [messageLoading, setMessageLoading] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        Promise.all([api.uploadUserInformation(), api.createInitialCards()])
            .then(([userInformation, initialCards]) => {
                setCurrentUser(userInformation);
                setCards(initialCards);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }, []);

    const handleUpdateUser = (data) => {
        setMessageLoading(true);
        api.changeUserInformation(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setMessageLoading(false);
            });
    };

    const handleUpdateAvatar = (data) => {
        setMessageLoading(true);
        api.changeAvatar(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setMessageLoading(false);
            });
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some((i) => i._id === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleCardDelete(cardId) {
        api.deleteImageCard(cardId)
            .then(() => {
                setCards((cards) => cards.filter((card) => card._id !== cardId));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    const handleAddPlaceSubmit = (Data) => {
        setMessageLoading(true);
        api.newImageCard(Data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
            .finally(() => {
                setMessageLoading(false);
            });
    };

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
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <Header />

                <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                />

                <Footer />

                <EditAvatarPopup
                    isOpen={isEditAvatarPopupOpen}
                    onClose={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                    onMessage={messageLoading}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                    onMessage={messageLoading}
                />

                <AddPlacePopup
                    isOpen={isAddPlacePopupOpen}
                    onClose={closeAllPopups}
                    onAddPlace={handleAddPlaceSubmit}
                    onMessage={messageLoading}
                />

                <ImagePopup
                    card={selectedCard}
                    onClose={closeAllPopups}
                />
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;