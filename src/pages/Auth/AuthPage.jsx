import React from 'react'
import { Outlet } from 'react-router-dom'
import { logoNameWhite } from '../../assets'
import { Image } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify';
import './Auth.scss'
import '../../assets'

export default function AuthPage() {

  return (
    <div className='auth'>
      <div className='auth__content'>
        <div className='auth__content-logo'>
          <Image src={logoNameWhite} alt='MusicEL'/> 
            <ToastContainer />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
   </div>
  )
}
