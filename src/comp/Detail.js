import React, { useEffect, useState } from 'react'
import '../Detail.css';
import back from '../img/icon_arrow_back.png'
import creatures from '../img/icon_1.png';
import monsters from '../img/icon_2.png';
import materials from '../img/icon_3.png';
import equipmentd from '../img/icon_4.png';
import treasure from '../img/icon_5.png';
import master from '../img/icon_6.png';
import deLplace from '../img/detail_line_place_left.png'
import deRplace from '../img/detail_line_place_right.png'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


function Detail() {


    const bodys = document.querySelector('body')
    bodys.classList.add('detail_body')

    const { param } = useParams();
    const [catagory, id] = param.split('-');


    const [data, setData] = useState([]);
    const [fa, setFa] = useState([]);
    const [isFavorite, setIsFavorite] = useState(true);
    const navigate = useNavigate();

    const url = {
        Creatures: '/project_zelda/db/botw/data/compendium/creatures.json',
        Equipment: '/project_zelda/db/botw/data/compendium/equipment.json',
        Materials: '/project_zelda/db/botw/data/compendium/materials.json',
        Monsters: '/project_zelda/db/botw/data/compendium/monsters.json',
        Treasure: '/project_zelda/db/botw/data/compendium/treasure.json',
        Master: '/project_zelda/db/botw/data/compendium/master.json'
    }

    let favorite, filterData;
    function favoriteStorage() {
        favorite = localStorage.fa || [];
        favorite = (favorite.length) ? JSON.parse(favorite) : [];

        filterData = favorite.filter(obj => obj.id == id && obj.catagory == catagory);
        if (!data.length) {
            filterData.length ? setIsFavorite(true) : setIsFavorite(false);
        } else {
            setIsFavorite(!isFavorite)
        }
    }


    function OnFavorite() {
        favoriteStorage();

        if (filterData.length) {
            let setFa = favorite.filter(obj => (obj.id !== id))
            localStorage.setItem('fa', JSON.stringify(setFa));
        }
        else {
            localStorage.setItem('fa', JSON.stringify([...favorite, { catagory, id }]));
        }
    }

    useEffect(() => {
        favoriteStorage();
        axios.get(url[catagory])
            .then(res => {
                let data = res.data.filter(n => n.id == id)
                setData(data)
            })
    }, []);

    const handleBackClick = () => {
        navigate(-1)
    };


    if (!data && data.length == 0) return <></>;
    return (
        <>
            <header>
                <div className="head">
                    <p><img src={back} alt="back" onClick={handleBackClick} /></p>
                    <h2>Detail</h2>
                    <span className={`material-symbols-outlined ${isFavorite === true ? 'active' : ''} `} onClick={() => { OnFavorite(catagory, id) }}>favorite</span>
                </div>
            </header>
            <div className='detail'>
                <aside className='d_aside'>
                    <div className="category">
                        <Link to="/Creatures"><img src={creatures} alt="" /></Link>
                        <Link to="/monsters"><img src={monsters} alt="" /></Link>
                        <Link to="/materials"><img src={materials} alt="" /></Link>
                        <Link to="/equipment"><img src={equipmentd} alt="" /></Link>
                        <Link to="/treasure"><img src={treasure} alt="" /></Link>
                        <Link to="/master"><img src={master} alt="" /></Link>
                    </div>
                </aside>
                {data && data
                    .map((item) => (
                        <div className='contents' key={item.id}>
                            <div className='left_contents'>
                                <div className='left'>
                                    <div className='left_txt'>
                                        <p>no. {item.id}</p>
                                        <div className='txt'>
                                            <p>{item.kname}</p>
                                            <span>{item.name}</span>
                                        </div>
                                    </div>
                                    <p className='image'><img src={item.image} /></p>
                                </div>
                            </div>
                            <div className='right_contents'>
                                <div className='place'>
                                    <div className='location'>
                                        <p><img src={deLplace} /></p>
                                        <span>발견장소</span>
                                        <p><img src={deRplace} /></p>
                                    </div>
                                    <div className='place_data'>
                                        {
                                            item.common_locations && item.common_locations.map((v, k) => (
                                                <span key={k}>{v}</span>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className='get_item'>
                                    <div className='item'>
                                        <p><img src={deLplace} /></p>
                                        <span> {catagory == 'Materials' && item.cooking_effect ? "요리효과" : "관련아이템" && item.cooking_effect ? "요리효과" : "관련아이템"} </span>
                                        <p><img src={deRplace} /></p>
                                    </div>
                                    <div className='item_data'>
                                        {
                                            item.drops === undefined ? <span>{item.cooking_effect}</span> : item.drops.map((v, k) => (<span key={k}>{v}</span>))
                                        }
                                    </div>
                                </div>
                                <div className='description'>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    )
}

export default Detail