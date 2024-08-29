import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, PowerIcon } from '@heroicons/react/24/solid'
import { Auth } from '../../../api'
import { defaultUser } from '../../../assets/index'
import "./TopBar.scss"

const auth = new Auth()

export function TopBar({ dataUser }) {
    const navigate = useNavigate()

    const handleGoBack = () => navigate(-1)
    
    return (
        <div className='top-bar'>
            <button onClick={handleGoBack}>
                <ChevronLeftIcon className='w-5'/>
            </button>
            <div className='top-bar__right'>
                <Link to="/profile" className='top-bar__right__init'>
                    <img src={dataUser?.photoURL || defaultUser} alt="Avatar" />
                    <span>{dataUser?.displayName || 'Usuario'}</span>
                </Link>
                <button className='top-bar__right__button' onClick={auth.logout}>
                    <PowerIcon className='w-5'/>
                </button>
            </div>
        </div>
    )
}
