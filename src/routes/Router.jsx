import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom'

import App from '../pages/App'
import HomePage from '../pages/home/HomePage'
import AuthPage from '../pages/Auth/AuthPage'
import OptionsPage from '../pages/Auth/OptionsPage'
import { LoggedLayout } from '../layouts'
const Artists = lazy(() => import('../pages/Artits/ArtistsPage'))
const Artist = lazy(() => import('../pages/Artist/ArtistPage'))
const Albums = lazy(() => import('../pages/Albums/AlbumsPage'))
const Album = lazy(() => import('../pages/Album/AlbumPage'))
const Profile = lazy(() => import('../pages/Profile/ProfilePage'))
const LoginPage = lazy(() => import('../pages/Auth/LoginPage'))
const RegisterPage = lazy( ()=> import('../pages/Auth/RegisterPage'))

export default function AppRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<App />}>
          <Route element={<LoggedLayout/>}>
            <Route path="/" element={<HomePage />} index/>
            <Route path="/artists" element={<Suspense fallback="Cargando..."><Artists /></Suspense>} />
            <Route path="/artists/:id" element={<Suspense fallback="Cargando..."><Artist /></Suspense>} />
            <Route path="/albums" element={<Suspense fallback="Cargando..."><Albums /></Suspense>} />
            <Route path="/albums/:id" element={<Suspense fallback="Cargando..."><Album /></Suspense>} />
            <Route path="/profile" element={<Suspense fallback="Cargando..."><Profile /></Suspense>} />
          </Route>
        </Route>
        <Route element={<AuthPage/>}>
          <Route path='/auth' element={<OptionsPage/>}/>
          <Route path='/auth/register' element={<Suspense fallback="Cargando..."> <RegisterPage/> </Suspense>} />
          <Route path='/auth/login'element={<Suspense fallback="Cargando..."> <LoginPage/> </Suspense>}/>
        </Route>
      </Routes>
    </HashRouter>
  )
}
