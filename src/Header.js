import React from 'react';
import { useLocation } from 'react-router-dom';
import Bgm from './comp/Bgm';

function Header() {
    const location = useLocation();
    const pathname = location.pathname;
    const routeName = pathname.replace('/', '');


    return (
        <header>
            <div className="head">
                <h2>{routeName}</h2>
            </div>
        </header>
    );
}

export default Header;
