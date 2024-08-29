import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Artist, Storage } from '../../../api'
import { useDropzone } from 'react-dropzone'
import { InputGroup, InputRightElement, Input, Button } from '@chakra-ui/react'
import { MusicalNoteIcon } from '@heroicons/react/24/solid'
import { noImage } from '../../../assets'
import {v4 as uuidV4 } from 'uuid'
import ErrorMessage from '../../utils/ErrorMessage'
import './NewArtistForm.scss'
import '../../../scss/buttonStyle.scss'
import { toast } from 'react-toastify'

const storageController = new Storage()
const artistController = new Artist() 

export function NewArtistForm({ closeModal }) {

    const queryClient = useQueryClient()
    const [image, setImage] = useState(null)
    const [errorImage, setErrorImage ] = useState('')
    const { register, handleSubmit, formState: { errors }, setValue } = useForm()

    const handleForm = async (dataForm) => {
        
        if (!image) {  // Verifica si la imagen está cargada
            setErrorImage('Ingrese una imagen')
            return
        }

        mutate(dataForm) //Llama a la mutación
    }

    //Mutacion para crear artista
    const { mutate } = useMutation({
        mutationFn: async ({imageArtist, name}) => {
            const response = await storageController.uploadFile(imageArtist, "artist", uuidV4())
            const url = await storageController.getURLFile(response.metadata.fullPath)
            await artistController.create(url, name)
        },
        onError: (error) => {
            console.log(error)
            toast.error('No se pudo guardar los datos, inténtelo mas tarde')
        },
        onSuccess: () => {
            toast.success('Nuevo artista creado')
            closeModal()
            queryClient.invalidateQueries({queryKey: ['artists']})
            queryClient.invalidateQueries({queryKey: ['lastArtist']})
        }
    })

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]
        setImage(URL.createObjectURL(file))
        setErrorImage('')  // Resetea el error de imagen
        setValue('imageArtist', file)  // Actualiza el valor del campo de imagen en el formulario

    }, [setValue])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    return (
        <div>
            <form onSubmit={handleSubmit(handleForm)} noValidate>
                
                <div {...getRootProps()} className='new-artist-form__banner'>
                    <input {...getInputProps()} 
                        {...register('imageArtist')}  
                    />
                    <img src={image || noImage} alt="Banner del artista" className={image ? 'full' : null} />
                </div>
                <div className='mb-2'>
                    {errorImage && (
                        <ErrorMessage message={errorImage} />
                    )}
                </div>

                <label htmlFor="name">Nombre del artista</label>
                <InputGroup mt={'1'}>
                    <Input 
                        id='name'
                        type='text'
                        placeholder='Ingrese el nombre del artista'
                        {...register('name', {
                            required: 'Ingrese el nombre del artista'
                        })}
                    />
                    <InputRightElement>
                        <MusicalNoteIcon className='w-5' />
                    </InputRightElement>
                </InputGroup>
                {errors.name && (
                    <ErrorMessage message={errors.name.message} />
                )}

                <Button type='submit' className='button_green'>
                    Crear artista
                </Button>
            </form>
        </div>
    )
}
