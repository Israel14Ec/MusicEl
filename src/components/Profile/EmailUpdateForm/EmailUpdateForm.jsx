import React, {useState } from 'react'
import { useForm } from 'react-hook-form'
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'
import { User } from '../../../api'
import { EnvelopeIcon } from '@heroicons/react/24/solid'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import ErrorMessage from '../../utils/ErrorMessage'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

const userController = new User()

export function EmailUpdateForm({ onClose, email }) {

    const queryClient = useQueryClient()
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email, contraseña: '' } })
    
    //Mutacion que llama a la actualizacion del email
    const { mutate } = useMutation({
        mutationFn: userController.updateUserEmail,
        onError: (error) => {
            console.error(error)
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Se envió un email de verificación al nuevo correo')
            queryClient.invalidateQueries({queryKey: ['user']})
            onClose()
        }
    })

    //Llama a la mutación
    const handleForm = ({ email, password }) => {
        mutate({ newEmail: email, password })
    }

    const [show, setShow] = useState(false)

    const handleShow = () => setShow(!show)

    return (
        <div>
            <form onSubmit={handleSubmit(handleForm)} noValidate>
                <label htmlFor="email">Email:</label>
                <InputGroup mt="1">
                    <Input
                        id='email'
                        type='email'
                        placeholder='Ingrese el nuevo email'
                        {...register('email', {
                            required: 'Ingrese un email',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Email no válido",
                            }
                        })}
                    />

                    <InputRightElement >
                        <EnvelopeIcon className='w-5' />
                    </InputRightElement>
                </InputGroup>
                {errors.email && <ErrorMessage message={errors.email.message} />}

                <div className=' mt-5'/>

                <label htmlFor="password">Ingrese la contraseña actual:</label>
                <InputGroup mt='1'>
                    <Input
                        id='password'
                        type={show ? 'text' : 'password'}
                        placeholder='Ingrese la contraseña'
                        autoComplete='on'
                        {...register('password', {
                            required: 'Se requiere ingresar la contraseña actual'
                        })}
                    />
                    <InputRightElement onClick={handleShow}>
                        {show ? <ViewIcon /> : <ViewOffIcon />}
                    </InputRightElement>
                </InputGroup>
                {errors.password && (
                    <ErrorMessage message={errors.password.message} />
                )}



                <Button type='submit' className='button_green'>
                    Guardar
                </Button>

            </form>
        </div>
    )
}
