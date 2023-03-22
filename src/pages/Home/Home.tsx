import './home.scss'
import {useEffect, useState} from "react";
import axios from "../../axios";
import {IUser} from "../../type/userItem";
import {Link} from "react-router-dom";
import {HiOutlineMagnifyingGlass} from 'react-icons/hi2'

type IItem = {
    name:string
}


const Home = () => {



    const [contacts,setContacts] = useState([])
    const [search,setSearch] = useState('')
    useEffect(()=>{
        axios('http://localhost:3000/users')
            .then(({data}) => setContacts(data))
    },[])

    return (
        <main className={'home'}>

            <div className="container">

                <label className="home__label">
                    <HiOutlineMagnifyingGlass/>
                    <input value={search} onChange={(e)=> setSearch(e.target.value)} placeholder={`${contacts.length} Контактов`} type="search" className="home__search"/>
                </label>

                <h3 className={'home__title'}>Всё контакты</h3>
                <div className={'home__row'}>
                {
                    contacts.sort((a:{name:string},b:{name:string}) => a.name.localeCompare(b.name))
                        .filter((item:IItem) =>item.name.toUpperCase().includes(search.toUpperCase()))
                        .map((item:IUser)=>(
                            <div key={item.id} className={'home__contact'}>
                                <Link className={'home__item'} to={`/${item.id}`}>{item.name}</Link>
                            </div>
                    ))
                }
                </div>
            </div>
        </main>
    );
};

export default Home;