import React, { useState } from 'react'
import { Button } from '@chakra-ui/react'
import { useAuth } from '../../hooks/useAuth'
import { AvatarUpdate, DisplayNameUpdateForm, EmailUpdateForm, PasswordUpdateForm } from '../../components/Profile'
import { BasicModal } from '../../components/Shared'
import "./Profile.scss"

export default function ProfilePage() {
    const { data, isLoading, isError } = useAuth()
    const [showModal, setShowModal] = useState(false)
    const [contentModal, setContentModal] = useState(null)
    const [title, setTitle] = useState("")

    const closeModal = () => {
        setShowModal(false) 
        setTitle("")
        setContentModal(null)
    }

    const openModal = (type) => {
        if (type === "displayName") {
            setTitle('Actualizar nombre y apellido')
            setContentModal(<DisplayNameUpdateForm onClose={closeModal} displayName={data.displayName}/>)
        }
        if (type === "email") {
            setTitle('Actualizar email')
            setContentModal(<EmailUpdateForm onClose={closeModal} email={data.email}/>)
        }
        if (type === "password") {
            setTitle('Actualizar contraseña')
            setContentModal(<PasswordUpdateForm onClose={closeModal}/>)
        }

        setShowModal(true)
    }

    return (
        <div className='profile'>
            <h1>Configuración</h1>

            <div className='profile__block'>
                <div>
                    {!isLoading && !isError && (
                        <>
                            <AvatarUpdate userData={data}/>
                            <p>{data.displayName}</p>
                        </>
                    )}
                </div>
                <Button onClick={() => openModal("displayName")}>
                    Actualizar
                </Button>
            </div>

            <div className='profile__block'>
                <div>
                    <span>Email: {!isLoading && !isError && data.email}</span>
                </div>
                <Button onClick={() => openModal("email")}>
                    Actualizar
                </Button>
            </div>

            <div className='profile__block'>
                <div>
                    <span>Contraseña: *** *** ***</span>
                </div>
                <Button onClick={() => openModal("password")}>
                    Actualizar
                </Button>
            </div>
            <BasicModal title={title} children={contentModal} isOpen={showModal} onClose={closeModal}/>
        </div>
    )
}
