import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import 'react-toastify/dist/ReactToastify.css';
import { PlayerProvider } from '../context'

export default function App() {
    const [ user, setUser] = useState(undefined)
    const auth = getAuth()

    onAuthStateChanged( auth, (user) => {
        setUser(user)
    })


    if(user === undefined ) return null //No sabemos si el usuario esta logueado

    return <>
        {user ? 
        <PlayerProvider>
            <Outlet/>
        </PlayerProvider> 
        : 
        <Navigate to={'/auth'}/>}
    </> 
  
}
