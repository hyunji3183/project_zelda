import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Alldata() {

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


    const creaturesData = data.filter(item => item.category === 'creatures');
    const masterData = data.filter(item => item.category === 'master');
    return (
        <>
            <ul>
                <h2>Creatures</h2>
                {creaturesData.map((item, index) => (
                    <li key={index}>
                        <img src={item.image} alt={`Creature ${index}`} />
                    </li>
                ))}
            </ul>
            <ul>
                <h2>Creatures</h2>
                {masterData.map((item, index) => (
                    <li key={index}>
                        <img src={item.image} alt={`Creature ${index}`} />
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Alldata