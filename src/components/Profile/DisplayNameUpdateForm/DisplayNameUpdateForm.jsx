import React from 'react'
import { User } from '../../../api'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { useForm } from 'react-hook-form'
import ErrorMessage from '../../utils/ErrorMessage'
import { toast } from 'react-toastify'
import '../../../scss/buttonStyle.scss'

const userController = new User()

export function DisplayNameUpdateForm({ onClose, displayName }) {
    const queryClient = useQueryClient()
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {displayName}
    })

    const mutation = useMutation({
        mutationFn: userController.updateDisplayName,
        onError: (error) => {
            console.error(error)
            toast.error('No se pudo actualizar')
        },
        onSuccess: () => {
            toast.success('Se actualizó correctamente')
            onClose()
            queryClient.invalidateQueries({ queryKey: ['user'] })
        }
    })

    const handleForm = ({ displayName }) => {
        mutation.mutate(displayName)
    }

    return (
        <form onSubmit={handleSubmit(handleForm)} noValidate>
            <label htmlFor="displayName">Nombre del usuario</label>
            <InputGroup mt={'1'}>
                <Input
                    id='displayName'
                    type='text'
                    placeholder='Ingrese su nombre y apellido'
                    {...register('displayName', {
                        required: "Se debe ingresar un nombre"
                    })}
                />
                <InputRightElement>
                    <UserCircleIcon className='w-5' />
                </InputRightElement>
            </InputGroup>
            {errors.displayName && (
                <ErrorMessage message={errors.displayName.message} />
            )}
            <Button type='submit' className='button_green'>
                Guardar
            </Button>
        </form>
    )
}
