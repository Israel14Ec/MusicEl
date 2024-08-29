import React from 'react'
import { Link } from 'react-router-dom'
import './Options.scss'

export default function OptionsPage() {
  return (
    <nav className='login-options'>
        <h1>Accede a millones de canciones</h1>
        
        <Link className='register' to={'/auth/register'}>
            Resgistrate gratis
        </Link>
        
        <Link className='login' to={'/auth/login'}>
            Inicia sesión
        </Link>
    </nav>
  )
}
