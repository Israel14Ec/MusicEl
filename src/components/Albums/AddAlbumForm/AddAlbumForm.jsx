import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useDropzone } from 'react-dropzone'
import { useArtist } from '../../../hooks/useArtist'
import { Album, Storage } from '../../../api'
import { InputGroup, Input, Select, Button, InputRightElement } from '@chakra-ui/react'
import { v4 as uuidv4 } from 'uuid'
import { ChevronDownIcon, MusicalNoteIcon } from '@heroicons/react/24/solid'
import ErrorMessage from '../../utils/ErrorMessage'
import { noImage } from '../../../assets'
import { toast } from 'react-toastify'
import './AddAlbumForm.scss'
import '../../../scss/buttonStyle.scss'

const albumController = new Album()
const storageController = new Storage()

export function AddAlbumForm({ closeModal }) {

    const { register, handleSubmit, formState: { errors }, setValue } = useForm()
    const queryClient = useQueryClient()

    const [image, setImage] = useState(noImage)
    const [errorImage, setErrorImage ] = useState('')
    const { isLoading, isError, data } = useArtist()

    const [artistOptions, setArtistOptions] = useState([])

    useEffect( () => {
        if(!isLoading && !isError) {
            setArtistOptions(
                data.map( artist => {
                    return {
                        key: artist.id,
                        value: artist.id,
                        text: artist.name
                    }
                })
            )
        }
    }, [isLoading])

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0]
        setImage(URL.createObjectURL(file))
        setErrorImage('')
        setValue('imageAlbum', file) // Actualiza el valor del input en react-hook-form
    }, [setValue])

    const { getRootProps, getInputProps } = useDropzone({ onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.svg'],
        }
    })

    //Mutacion
    const { mutate } = useMutation({
        mutationFn: async (dataForm) => {
            const response = await storageController.uploadFile(dataForm.imageAlbum, "album", uuidv4()) //Sube imagen
            const url = await storageController.getURLFile(response.metadata.fullPath) //Obtiene la URL
            albumController.create(dataForm.nameAlbum, url, dataForm.artist) //Crea el album
            
        },
        onError: () => {
            toast.error('No se pudo crear el albúm')
        },
        onSuccess: () => {
            toast.success('Se creo correctamente')
            closeModal()
            queryClient.invalidateQueries({queryKey: ['albums']}) //Invalida la query
            queryClient.invalidateQueries({queryKey: ['lastAlbum']})

        }

    })

    //llama a la mutacion
    const handleForm = (dataForm) => {
        if(image === noImage) {
            setErrorImage('No hay imagen de album')
            return 
        }
        
        mutate(dataForm)
        
    }

    return (
        <form onSubmit={handleSubmit(handleForm)} className='add-album-form' noValidate>
            <div className='add-album-form__content'>
                <div
                    {...getRootProps()}
                    className='add-album-form__content-image'
                >
                    <input
                        {...getInputProps()}
                        {...register('imageAlbum')}
                    />

                    <img src={image} alt="" />

                    {errorImage && (
                        <ErrorMessage message={errorImage} />
                    )}
                </div>

                <div className='add-album-form__content-inputs'>
                    <label htmlFor="nameAlbum">Nombre del álbum</label>
                    <InputGroup mt={'1'}>
                        <Input
                            id='nameAlbum'
                            type='text'
                            placeholder='Nombre del álbum'
                            {...register('nameAlbum', {
                                required: 'Ingrese el nombre'
                            })}
                        />

                        <InputRightElement>
                            <MusicalNoteIcon className='w-5' />
                        </InputRightElement>
                    </InputGroup>
                    {errors.nameAlbum && (
                        <ErrorMessage message={errors.nameAlbum.message} />
                    )}

                    <div className='mt-2'></div>
                    <label htmlFor="artist">Artista</label>
                    <Select
                        id='artist'
                        placeholder='El álbum pertenece a ...'
                        icon={<ChevronDownIcon />}
                        {...register('artist', {
                            required: 'Seleccione a un artista'
                        })}
                    >
                        {isLoading ? (
                            <option className='text-gray-700' disabled>Cargando...</option>
                        ) : (
                            artistOptions.map(artist => (
                                <option className='text-gray-700' key={artist.key} value={artist.value}>
                                    {artist.text}
                                </option>
                            ))
                        )}
                    </Select>

                    {errors.artist && (
                        <ErrorMessage message={errors.artist.message} />
                    )}
                </div>
            </div>
            <Button type='submit' className='button_green'>
                Crear álbum
            </Button>
        </form>
    )
}
