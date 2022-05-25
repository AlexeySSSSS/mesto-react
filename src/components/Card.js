import React from "react";

const Card = ({ card, onCardClick }) => {
    const handleClick = () => {
        onCardClick(card);
    };

    return (
        <article className="elements__element card">
            <button className="card__delete" title="Удалить"></button>
            <img className="card__item" title="Открыть в полном размере"
                src={card.link}
                alt={card.name}
                onClick={handleClick} />
            <div className="card__grid-block">
                <h2 className="card__text">{card.name}</h2>
                <div className="card__likes">
                    <span className="card__number">{card.likes.length}</span>
                    <button className="card__like" title="Нравиться"></button>
                </div>
            </div>
        </article>
    );
};

export default Card;