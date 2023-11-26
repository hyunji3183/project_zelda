import '../App.css';
import Header from '../Header';
import Aside from '../Aside';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios'

function Equipment() {
    const bodys = document.querySelector('body')
    bodys.classList.remove('detail_body')

    const location = useLocation();
    const initialData = location.state ? location.state.data : null;

    const [data, setData] = useState(initialData);
    const [datas, setDatas] = useState(initialData);
    const navigate = useNavigate();

    console.log(datas);

    useEffect(() => {
        if (data) {
            const equipmentData = data.filter(item => item.category === 'equipment');
            setDatas([...equipmentData]);
        }
    }, [data]);

    // 정렬기능함수
    const dataSort = (isSorted) => {
        const sorted = isSorted
            ? [...datas].sort((a, b) => a.name.localeCompare(b.name))
            : [...datas].sort((b, a) => a.name.localeCompare(b.name));
        setDatas(sorted);
    };

    useEffect(() => {
        if (!initialData) {
            axios.get('/project_zelda/db/botw/data/compendium/equipment.json')
                .then(res => {
                    setData(res.data) ;
                })
        }
    }, [initialData]);
    return (<>
        <main>
            <Aside onSortRequest={dataSort} />
            <div className="list">
                <Header />
                <ul>
                    {data && data.map((item) => (
                        <li key={item.id}>
                            <figure onClick={() => { navigate(`/DetailWeapon/Equipment-${item.id}`) }}>
                                <a>
                                    <img src={item.image} alt={item.name} />
                                    <span>NO. {item.id}</span>
                                </a>
                                <figcaption>
                                    <b>{item.kname}</b>
                                    <p>{item.name}</p>
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    </>
    );
}

export default Equipment;
