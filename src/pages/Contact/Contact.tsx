import './contact.scss'
import {Link, useParams} from "react-router-dom";
import {ID} from "../../type/id";
import {useEffect, useState} from "react";
import axios from "../../axios";
import {IUser} from "../../type/userItem";

const Contact = () => {

    const [user,setUser] = useState<IUser>({})
    const { id } = useParams() as ID

    useEffect(()=>{
        axios(`/users/${id}`)
            .then(({data})=> setUser(data))
    },[])

    return (
        <div className={'contact'}>
            <div className="container">
                <Link to={'/'} className={'contact__title'}>Обратно</Link>
                <div className="contact__row">
                    <h3 className={'contact__item'}>Имя: {user.username}</h3>
                    <h3 className={'contact__item'}>Почта: {user.email}</h3>
                    <h3 className={'contact__item'}>Номер телефона: {user.phone}</h3>
                    <h3 className={'contact__item'}>Cайт: {user.website}</h3>
                    <h3 className={'contact__item'}>Город: {user.address?.city}</h3>
                    <h3 className={'contact__item'}>Улица: {user.address?.street}</h3>
                </div>
            </div>
        </div>
    );
};

export default Contact;