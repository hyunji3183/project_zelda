import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import react from 'react';

import './App.css';

import Main from './Main';
import Creatures from './comp/Creatures';
import Monsters from './comp/Monsters';
import Materials from './comp/Materials';
import Equipment from './comp/Equipment';
import Treasure from './comp/Treasure';
import Favorite from './comp/Favorite';
import Search from './comp/Search';
import Detail from './comp/Detail';
import DetailWeapon from './comp/DetailWeapon';
import Master from './comp/Master';
import Bgm from './comp/Bgm';
import Alldata from './comp/Alldata';

const App = () => {
    return (
        <>
            <BrowserRouter basename='/project_zelda'>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/Creatures" element={<Creatures />} />
                    <Route path="/Monsters" element={<Monsters />} />
                    <Route path="/Materials" element={<Materials />} />
                    <Route path="/Equipment" element={<Equipment />} />
                    <Route path="/Treasure" element={<Treasure />} />
                    <Route path="/Master" element={<Master />} />
                    <Route path="/Favorite" element={<Favorite />} />
                    <Route path="/Search" element={<Search />} />
                    <Route path="/alldata" element={<Alldata />} />
                    <Route path="/Detail/:param" element={<Detail />} />
                    <Route path="/DetailWeapon/:param" element={<DetailWeapon />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};



export default App;
