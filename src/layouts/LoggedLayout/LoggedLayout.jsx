import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAuth } from '../../hooks/useAuth'
import { LeftMenu, TopBar } from '../../components/Layout' 
import { Footer } from '../../components/Layout/Footer/Footer'
import './LoggedLayout.scss'

export function LoggedLayout() {

  const { data, isLoading, isError } = useAuth()

  return (
    <div className='logged-layout'>
      <ToastContainer/>
      <div className='logged-layout__content'>
        <div className='logged-layout__left-menu'>
            <LeftMenu/>
        </div>
        <div className=' logged-layout__children-content'>
          <div className='logged-layout__top-bar'>
            {
              !isLoading && !isError ? (
                <TopBar dataUser={data}/>
              ) :
              (
                <p className=' text-sm text-red-500 '>No se pudo obtener los datos</p>
              )
            }
            
          </div>
          <div>
            <Outlet/> 
          </div>
        </div>

      </div>
      <div className='logged-layout__footer'>
        <Footer/>
      </div>

    </div>
  )
}
