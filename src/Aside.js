import React, { useState } from 'react'
import creatures from './img/icon_1.png';
import monsters from './img/icon_2.png';
import materials from './img/icon_3.png';
import equipmentd from './img/icon_4.png';
import treasure from './img/icon_5.png';
import master from './img/icon_6.png';
import favorite from './img/favorite.png';
import sort from './img/sort.png';
import search from './img/search.png';
import triforce from './img/icon_triforce.png';
import home from './img/icon_home.png';
import { Link } from 'react-router-dom';

function Aside({ onSortRequest }) {
    const [isSorted, setIsSorted] = useState(false);

    const toggleSort = (e) => {
        e.preventDefault()
        setIsSorted(!isSorted);
        onSortRequest(!isSorted);
    };


    const topBtn = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    return (
        <aside>
            <Link to="/"><img src={home} alt=""/></Link>
            <div className="category">
                <Link to="/Creatures"><img src={creatures} alt="creatures" /></Link>
                <Link to="/monsters"><img src={monsters} alt="monsters" /></Link>
                <Link to="/materials"><img src={materials} alt="materials" /></Link>
                <Link to="/equipment"><img src={equipmentd} alt="equipmentd" /></Link>
                <Link to="/treasure"><img src={treasure} alt="treasure" /></Link>
                <Link to="/master"><img src={master} alt="master" />"</Link>
            </div>
            <div className="toggle">
                <div className='menu'>
                    <Link to="/Favorite"><img src={favorite} alt="favorite" /></Link>
                    <a onClick={toggleSort} href=""><img src={sort} alt="sort" /></a>
                    <Link to="/Search"><img src={search} alt="search" /></Link>
                </div>
                <a><img src={triforce} alt="" className='topBtn' onClick={topBtn} /></a>
            </div>
        </aside>
    )
}

export default Aside