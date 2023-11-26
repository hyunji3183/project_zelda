import React, { useEffect, useRef, useState } from 'react'
import note from '../img/note.png';
import note_none from '../img/note_none.png';
import hateno_BGM from '../videos/Hateno_Village.mp3';

function Bgm() {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const audioElementRef = useRef(new Audio(hateno_BGM));

    const toggleAudio = () => {
        const audioElement = audioElementRef.current;
        if (audioElement.paused) {
            audioElement.play();
            setIsAudioPlaying(true);
        } else {
            audioElement.load();
            setIsAudioPlaying(false);
        }
    };

    useEffect(() => {
        // return () => {
        //     const audioElement = audioElementRef.current;
        //     if (audioElement) {
        //         audioElement.pause();
        //     }
        // };
    }, []);

    return (
        <>
            <p>
                <img src={isAudioPlaying ? note : note_none} onClick={toggleAudio} alt="Audio Control" />
            </p>
        </>
    )


}

export default Bgm

