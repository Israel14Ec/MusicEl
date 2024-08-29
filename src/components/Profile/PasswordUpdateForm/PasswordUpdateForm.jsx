import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { User } from '../../../api'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import ErrorMessage from '../../utils/ErrorMessage'
import { toast } from 'react-toastify'

const userController = new User()

export function PasswordUpdateForm({ onClose }) {

    const { handleSubmit, register, formState: { errors }, watch } = useForm()

    const { mutate } = useMutation({
        mutationFn: userController.updateUserPassword,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () =>  {
            toast.success('Se cambio la contraseña correctamente')
            onClose()
        }
    })

    const handleForm = ({currentPassword, newPassword}) => {
        mutate({currentPassword, newPassword})
    }

    const [showPass, setShowPass] = useState(false)

    const handleShow = () => setShowPass(!showPass)

    return (
        <form noValidate onSubmit={handleSubmit(handleForm)}>
            <label htmlFor="currentPassword ">Contraseña actual</label>
            <InputGroup>
                <Input
                    id='currentPassword'
                    type={showPass ? 'text' : 'password'}
                    placeholder='Ingrese contraseña actual'
                    {...register('currentPassword', {
                        required: 'Es obligatorio ingresar',
                    })}
                />
                <InputRightElement onClick={handleShow}>
                    {showPass ? <ViewIcon /> : <ViewOffIcon />}
                </InputRightElement>
            </InputGroup>
            {errors.currentPassword && (
                <ErrorMessage message={errors.currentPassword.message} />
            )}

            <div className=' mt-16 p-2 border-t-2 border-gray-400 shadow-md'></div>
            <label htmlFor="newPassword">Nueva contraseña</label>
            <InputGroup>
                <Input
                    id='newPassword'
                    type={showPass ? 'text' : 'password'}
                    placeholder='Ingrese nueva contraseña'
                    {...register('newPassword', {
                        required: 'Es obligatorio ingresar',
                        minLength: {
                            value: 8,
                            message: 'Ingrese al menos 8 caracteres'
                        },
                    })}
                />
                <InputRightElement onClick={handleShow}>
                    {showPass ? <ViewIcon /> : <ViewOffIcon />}
                </InputRightElement>
            </InputGroup>

            {errors.newPassword && (
                <ErrorMessage message={errors.newPassword.message} />
            )}
            
            <div className=' mt-2'></div>

            <label htmlFor="repetPassword">Repita la nueva contraseña</label>
            <InputGroup>
                <Input
                    id='repetPassword'
                    type={showPass ? 'text' : 'password'}
                    placeholder='Ingrese nueva contraseña'
                    {...register('repetPassword', {
                        required: 'Es obligatorio ingresar',
                        validate: (val) => {
                            if(watch('newPassword') != val) {
                                return 'Las contraseñas no son iguales'
                            }
                        }
                    })}
                />
                <InputRightElement onClick={handleShow}>
                    {showPass ? <ViewIcon /> : <ViewOffIcon />}
                </InputRightElement>
            </InputGroup>

            {errors.repetPassword && (
                <ErrorMessage message={errors.repetPassword.message} />
            )}


            <Button type='submit' className='button_green'>
                Guardar
            </Button>
        </form>
    )
}
