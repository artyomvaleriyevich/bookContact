import './contact.scss'
import {Link, useNavigate, useParams} from "react-router-dom";
import {ID} from "../../type/id";
import {useForm} from "react-hook-form";
import axios from "../../axios";
import {useState} from "react";

interface IData {
    username?: string,
    email?:string,
    phone?:string,
    website?:string,
    address?: {
        city?:string,
        street?:string,
    }
    city?:string,
    street?:string
}

const Contact = () => {
    const { id } = useParams() as ID

    const {
        handleSubmit,
        register
    } = useForm()

    const [active,setActive] = useState(false)
    const myUsersString = localStorage.getItem('users')
    const myUsers = JSON.parse(myUsersString || '')
    const navigate = useNavigate()
    const getUser = myUsers[(id ? id : 0)  - 1]

    const {username, email,phone,website,address} = getUser

    const updateContact = (data:IData) : void => {
        axios.patch(`/users/${id}`, {
            username: data.username ? data.username : username,
            email: data.email ? data.email : email,
            phone : data.phone ? data.phone : phone,
            website: data.website ? data.website : website,
            address: {
                ...address,
                city: data.city ? data.city : address.city,
                street: data.street ? data.street : address.street
            }
        })
            .then(()=> {
                navigate('/')
                alert('Успешно изменено')
            })
            .catch((err:Error)=> alert(err))
    }

    return (
        <div className={'contact'}>
            <div className="container">
                <Link to={'/'} className={'contact__title'}>Обратно</Link>
                <form  onSubmit={handleSubmit((data) => updateContact(data))} action={'#'} className="contact__row">

                    <label className={'contact__item'}>
                                Имя: <br/>
                        <input style={{background: active ? 'white' : '',color: active ? 'black': ''}} className={'contact__input'} {...register('username')} type="text" defaultValue={username} disabled={!active}/>
                    </label>
                    <label className={'contact__item'}>
                                Почта: <br/>
                        <input style={{background: active ? 'white' : '',color: active ? 'black': ''}} className={'contact__input'} {...register('email')} type="text" defaultValue={email} disabled={!active}/>
                    </label>
                    <label className={'contact__item'}>
                                Номер телефона: <br/>
                        <input style={{background: active ? 'white' : '',color: active ? 'black': ''}} className={'contact__input'} {...register('phone')} type="phone" defaultValue={phone} disabled={!active}/>
                    </label>
                    <label className={'contact__item'}>
                                Cайт: <br/>
                        <input style={{background: active ? 'white' : '',color: active ? 'black': ''}} className={'contact__input'} {...register('website')} type="text" defaultValue={website} disabled={!active}/>
                    </label>
                    <label className={'contact__item'}>
                                Город: <br/>
                        <input style={{background: active ? 'white' : '',color: active ? 'black': ''}} className={'contact__input'} {...register('city')} type="text" defaultValue={address.city} disabled={!active}/>

                    </label>
                    <label className={'contact__item'}>
                                Улица: <br/>
                        <input style={{background: active ? 'white' : '',color: active ? 'black': ''}} className={'contact__input'} {...register('street')} type="text" defaultValue={address.street} disabled={!active}/>
                    </label>

                    <button className="contact__form-btn" typeof={'submit'} style={{display: active ? 'block' : 'none'}}>Сохранить</button>
                </form>

                <button onClick={()=> setActive(!active)} className="contact__btn" typeof={'button'}>{active ? 'Отмена' : 'Изменить'}</button>
            </div>

        </div>
    );
};

export default Contact;