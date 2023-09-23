import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../App.css';
import Header from '../Header';
import Aside from '../Aside';

function Favorite() {
    const [data, setData] = useState([]);
    const [isSorted, setIsSorted] = useState(false);
    const navigate = useNavigate();

    const bodys = document.querySelector('body');
    bodys.classList.remove('detail');

    const url = {
        Creatures: '../db/botw/data/compendium/Creatures.json',
        Equipment: '../db/botw/data/compendium/Equipment.json',
        Materials: '../db/botw/data/compendium/Materials.json',
        Monsters: '../db/botw/data/compendium/Monsters.json',
        Treasure: '../db/botw/data/compendium/Treasure.json'
    };

    const favorites = localStorage.getItem('fa') ? JSON.parse(localStorage.getItem('fa')) : [];

    const favoriteData = () => {
        const allData = []; // 모든 결과를 저장할 배열

        const axiosRequests = favorites.map((v, k) => {
            return axios.get(url[v.catagory])
            .then((res) => {
                    let filterData = res.data.filter(n => n.id == v.id);
                    allData.push(...filterData);
                });
        });

        // 모든 axios 요청이 완료되면 데이터 설정
        Promise.all(axiosRequests)
            .then(() => {
                setData(allData);
            });
    };

    useEffect(() => {
        favoriteData();
    }, []);


    const removeFavorite = (item) => {
        // 로컬 스토리지에서 현재 저장된 즐겨찾기 목록을 가져옵니다.
        const favorites = JSON.parse(localStorage.getItem('fa') || '[]');
        // 현재 아이템을 즐겨찾기에서 제거한 새로운 배열을 생성합니다.
        const updateData = favorites.filter((fav) => !(fav.id == item.id));
        // 로컬 스토리지를 업데이트합니다.
        localStorage.setItem('fa', JSON.stringify(updateData));
        // 화면에서 해당 데이터를 제거합니다.
        setData((prevData) => prevData.filter((dataItem) => !(dataItem.id == item.id && dataItem.category == item.category)));
    };

    const isFavorite = (id, category) => {
        const favorites = JSON.parse(localStorage.getItem('fa') || '[]');
        //로컬 스토리지에서 fa라는 키로 저장된 데이터를 가져와서 해당 데이터 배열에서 특정 id와 category 값이 일치하는지 확인
        return favorites.some((item) => item.id == id && item.category == category);
    };



    const dataSort = () => {
        const sorted = isSorted
            ? [...data].sort((a, b) => a.name.localeCompare(b.name))
            : [...data].sort((b, a) => a.name.localeCompare(b.name))
        setData(sorted);
        setIsSorted(!isSorted);
    };


    const favoriteDetail = (category, id) => {
        const str = category;
        const str2 = str.charAt(0).toUpperCase() + str.slice(1)
        navigate(`/detail/${str2}-${id}`);
    };


    return (
        <>
            <Header />
            <main>
                <Aside onSortRequest={dataSort} />
                <div className='favorite'>
                    <div className='favorite_data'>
                        {data.length === 0 ? (
                            <p>목록이 비어있습니다.</p>
                        ) : (
                            <ul>
                                {data.map((item) => (
                                    <li key={item.id}>
                                        <figure>
                                            <a href="">
                                                <img src={item.image} alt={item.name} onClick={() => favoriteDetail(item.category, item.id)} />
                                                <span className={`material-symbols-outlined ${isFavorite(item.id, item.category) ? 'active' : ''}`}
                                                    onClick={() => { removeFavorite(item); }}>favorite</span>
                                            </a>
                                            <figcaption>
                                                <b>{item.kname}</b>
                                            </figcaption>
                                        </figure>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </main>
        </>
    );
}

export default Favorite;
