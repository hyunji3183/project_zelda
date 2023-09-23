import React from 'react';
import { useNavigate } from 'react-router-dom';

import trailer from './videos/breath_of_the_wild_1St_trailer.mp4';

export default function Main() {
    const navigate = useNavigate();

    const openapp = (e) => {
        e.preventDefault();
        navigate('/Creatures');
    }

    return (
        <div className="intro">
            <div className="videobox">
                <video autoPlay loop={true} muted={true} onClick={openapp}>
                    <source src={trailer} type="video/mp4" />
                </video>
            </div>
        </div>
    );
}
