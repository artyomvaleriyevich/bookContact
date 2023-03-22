import './contact.scss'
import {Link, useParams} from "react-router-dom";
import {ID} from "../../type/id";
import {useEffect} from "react";
import axios from "../../axios";




const Contact = () => {
    const { id } = useParams() as ID

    useEffect(()=>{
        axios(`/users/${id}`)
            .then(({data}) => localStorage.setItem('user',JSON.stringify(data)))
    })
    const myUserString = localStorage.getItem('user')
    const myUser = JSON.parse(myUserString || '')


    return (
        <div className={'contact'}>
            <div className="container">
                <Link to={'/'} className={'contact__title'}>Обратно</Link>
                <div className="contact__row">
                    <h3 className={'contact__item'}>Имя: {myUser.username}</h3>
                    <h3 className={'contact__item'}>Почта: {myUser.email}</h3>
                    <h3 className={'contact__item'}>Номер телефона: {myUser.phone}</h3>
                    <h3 className={'contact__item'}>Cайт: {myUser.website}</h3>
                    <h3 className={'contact__item'}>Город: {myUser.address?.city}</h3>
                    <h3 className={'contact__item'}>Улица: {myUser.address?.street}</h3>
                </div>
            </div>
        </div>
    );
};

export default Contact;