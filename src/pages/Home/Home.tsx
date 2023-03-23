import './home.scss'
import {Fragment, useEffect, useState} from "react";
import axios from "../../axios";
import {IUser} from "../../type/userItem";
import {Link} from "react-router-dom";
import {HiOutlineMagnifyingGlass} from 'react-icons/hi2'

type IItem = {
    name:string
}

const Home = () => {
    useEffect(()=>{
        axios('/users')
            .then(({data}) => localStorage.setItem('users',JSON.stringify(data)))
    },[])

    const [search,setSearch] = useState('')
    const myUsersString = localStorage.getItem('users')
    const myUsers = JSON.parse(myUsersString || '')

    const arr = myUsers.map((item:IUser)=> item.name?.at(0)).filter((el:string, idx:number, array:Array<string>)=> array.indexOf(el) === idx)

    return (
        <main className={'home'}>
            <div className="container">
                <label className="home__label">
                    <HiOutlineMagnifyingGlass/>
                    <input value={search}
                           onChange={(e)=> setSearch(e.target.value)}
                           placeholder={`Поиск контактов`}
                           type="search"
                           className="home__search"/>
                </label>

                <h3 className={'home__title'}>Всё контакты</h3>
                <div className={'home__row'}>
                    {
                        arr.sort().filter((item:string) =>item.toUpperCase().includes(search.toUpperCase()))
                            .map((item:string)=>(
                            <Fragment key={item}>
                                <p className={'home__titleBlock'}>{item}</p>
                                {
                                    myUsers.filter((item:IItem) =>item.name.toUpperCase().includes(search.toUpperCase()))
                                        .filter((el:IUser)=> el.name?.at(0) === item)
                                        .map((item:IUser) => (
                                    <div key={item.id} className={'home__contact'}>
                                         <Link className={'home__item'} to={`/${item.id}`}>{item.name}</Link>
                                    </div>
                                    ))
                                }
                            </Fragment>
                        ))
                    }
                </div>
            </div>
        </main>
    );
};

export default Home;