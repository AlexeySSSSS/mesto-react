import React from "react";

import Vector from '../images/Vector.svg';

const Header = () => {
    return (
        <header className="header">
            <img className="header__logo" src={Vector} alt="Логотип место" />
        </header>
    );
};

export default Header;