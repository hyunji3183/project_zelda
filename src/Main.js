import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useHistory } from 'react-router-dom';

import trailer from './videos/BOTW_trailer.mp4';
import skip from './img/skip_btn.png';
import notice from './img/notice.png';
import Bgm from './comp/Bgm';
import axios from 'axios';

export default function Main() {
    const navigate = useNavigate();
    const videoRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    const [data, setData] = useState([]);

    const url = {
        creatures: '/project_zelda/db/botw/data/compendium/creatures.json',
        equipment: '/project_zelda/db/botw/data/compendium/equipment.json',
        materials: '/project_zelda/db/botw/data/compendium/materials.json',
        monsters: '/project_zelda/db/botw/data/compendium/monsters.json',
        treasure: '/project_zelda/db/botw/data/compendium/treasure.json',
        master: '/project_zelda/db/botw/data/compendium/master.json'
    };

    useEffect(() => {
        const fetchData = async () => {
            const requests = Object.values(url).map(url => axios.get(url));
            const responses = await Promise.all(requests);
            const allData = responses.map(response => response.data);
            const mergedData = [].concat(...allData);
            setData(mergedData);
        };
        fetchData();
    }, []);


    const openapp = (e) => {
        e.preventDefault();
        navigate('/Creatures',{ state: { data: data } });
    }

    const behind = (type) => {
        const playVideoElement = document.querySelector('.playVideo');
        const skipBtn = document.querySelector('.skip');
        const videoElement = videoRef.current;
        switch (type) {
            case 'on':
                videoElement.muted = false;
                break;
            default:
                videoElement.muted = true;
        }
        playVideoElement.classList.add('behind');
        skipBtn.classList.add('on');
        videoElement.play();
    }

    useEffect(() => {
        return () => {
            const videoElement = videoRef.current;
            if (videoElement) {
                videoElement.pause();
            }
        };
    }, []);

    return (
        <div className="intro">
            <div className='playVideo'>
                <p className='sheikah_slate'>
                    <img src={notice} ref={imageRef} />
                </p>
                <div className='soundtxt' ref={textRef}>
                    <span className='on' onClick={() => { behind('on') }}>on</span>
                    <span className='bar'>|</span>
                    <span className='off' onClick={() => { behind('off') }}>off</span>
                </div>
            </div>
            <div className="videobox">
                <video autoPlay loop ref={videoRef}>
                    <source src={trailer} type="video/mp4" />
                </video>
                <p className='skip'><img src={skip} onClick={openapp} /></p>
            </div>
        </div>
    );
}
