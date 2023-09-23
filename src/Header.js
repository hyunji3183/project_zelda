import React from 'react'
import home from './img/icon_home.png';
import heart from './img/icon_favorite_none.png';
import { Link, useLocation } from 'react-router-dom';

function Header() {

    const location = useLocation();
    const pathname = location.pathname;
    const routeName = pathname.replace('/', '');


    return (
        <header>
            <div className="head">
                <Link to="/"><img src={home} alt="" /></Link>
                <h2>{routeName}</h2>
            </div>
        </header>
    )
}

export default Header